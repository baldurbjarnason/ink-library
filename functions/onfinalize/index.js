const path = require("path");
const fs = require("fs");
const engine = require("ink-engine");
const os = require("os");
const formats = require("ink-engine/src/formats");
const sharp = require("sharp");
const compressible = require('compressible')
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const uploadBucket = storage.bucket(process.env.PUBLICATION_BUCKET)

const THUMBSIZE = 400;

module.exports.triggerWrapper = triggerWrapper;

function triggerWrapper(object, context, done) {
  return onFinalize(object, context, done)
    .then(() => done())
    .catch(err => {
      console.error("Error: ", err)
      done(err)
    })
}

// Split into two buckets: upload bucket and publications bucket

async function onFinalize(object, context, done) {
  const fileBucket = object.bucket;
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const contentType = object.contentType;
  const [userType, userId, pubId] = filePath.split("/");
  if (!userId || !pubId)
    throw new Error('Both user id and publication id are required');
  if (!formats[contentType])
    return
  // The user id here has to be the sub/account id, not the profile id
  // The pubId should be the publication pathname, not its full URL
  const targetPath = [userType, userId, pubId].join("/");
  const thumbnailPath = [userType, userId, "thumbnails", pubId].join("/");
  const bucket = storage.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  await bucket.file(filePath).download({ destination: tempFilePath });
  const book = await engine(tempFilePath, extract, { type: contentType });
  fs.unlinkSync(tempFilePath);
  if (book) {
    book.resources = book.resources.concat({
      type: "LinkedResource",
      rel: ["alternate"],
      url: `https://storage.googleapis.com/${fileBucket}/${filePath}`,
      encodingFormat: contentType
    });
    extract({contents: JSON.stringify(book)}, Object.assign({ url: "index.json" }, book), {contentType: "application/json"})
  }
  async function extract(file, resource, metadata) {
    // Should also generate thumbnails of all images.
    let thumb;
    let gzip = resource.encodingFormat && compressible(resource.encodingFormat)
    if (
      resource.encodingFormat &&
      resource.encodingFormat.includes("image")
    ) {
      thumb = await sharp(file.contents)
        .resize(THUMBSIZE, THUMBSIZE, { fit: "inside" })
        .jpeg({ quality: 60 })
        .toBuffer();
      gzip = false
    }
    const filename = path.join(targetPath, resource.url);
    const storageFile = uploadBucket.file(filename);
    await storageFile.save(file.contents, {
      metadata,
      gzip,
      resumable: false
    });
    if (thumb) {
      const thumbname = path.join(thumbnailPath, resource.url);
      const storageThumb = uploadBucket.file(thumbname);
      await storageThumb.save(thumb, {
        metadata,
        resumable: false
      });
    }
    // This is not actually public. The `storage.googleapis.com` domain should tell the front end to load the asset via the storage API
    // Maybe by generating a signed URL and redirecting to it? Only if it's an image? Use redis to cache everything?
    // This is basically `https://storage.googleapis.com/:bucket/user/:user_id/publication/:pub_id/:path+`
    return filename;
  }
};