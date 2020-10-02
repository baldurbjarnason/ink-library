const path = require("path");
const fs = require("fs");
const os = require("os");
const formats = require("ink-engine/src/formats");
const compressible = require('compressible')
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const uploadBucket = storage.bucket(process.env.PUBLICATION_BUCKET)
const downloadPrefix = `/api/download`

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
// Save a preliminary, in-progress index.json at start
// Save a download only index.json if file is unsupported or if there is an error (requires a content-disposition endpoint in ink-library) -> /api/download/[bucket]/[...path]
async function onFinalize(object, context, done) {
  const fileBucket = object.bucket;
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const contentType = object.contentType;
  const [userType, userId, pubId] = filePath.split("/");
  if (!userId || !pubId)
    throw new Error('Both user id and publication id are required');
  // The user id here has to be the sub/account id, not the profile id
  // The pubId should be the publication pathname, not its full URL
  const targetPath = [userType, userId, pubId].join("/");
  const preview = {
    name: fileName,
    _processing: true,
    resources: [
      {
        type: "LinkedResource",
        rel: ["alternate"],
        url: `${downloadPrefix}/${fileBucket}/${filePath}`,
        encodingFormat: contentType
      }
    ],
    readingOrder: []
  };
  
  const storageFile = uploadBucket.file(path.join(targetPath, "index.json"));
  await storageFile.save(JSON.stringify(preview), {
    metadata: {
      contentType:  "application/json"
    },
    gzip: true,
    resumable: false
  });
  const thumbnailPath = [userType, userId, "thumbnails", pubId].join("/");
  const bucket = storage.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  await bucket.file(filePath).download({ destination: tempFilePath });
  let book
  try {
    for await (const vfile of formats({
      mediaType: contentType,
      filename: tempFilePath,
      thumbnails: true,
      thumbSize: THUMBSIZE,
      thumbPath: thumbnailPath
    })) {
      if (!vfile.data && !vfile.data.resource) {
        book = vfile
      } else {
        const metadata = {
          contentType:  vfile.contentType
        }
        const gzip = vfile.contentType && compressible(vfile.contentType)
        const filename = path.join(targetPath, vfile.path);
        const storageFile = uploadBucket.file(filename);
        await storageFile.save(vfile.contents, {
          metadata,
          gzip,
          resumable: false
        });
      }
    }
    if (book) {
      const storageFile = uploadBucket.file(path.join(targetPath, "index.json"));
      await storageFile.save(JSON.stringify(book), {
        metadata: {
          contentType:  "application/json"
        },
        gzip: true,
        resumable: false
      });
    }
  } catch (err) {
    console.error(err)
    const unsupported = {
      name: fileName,
      _unsupported: true,
      _error: err.message,
      resources: [
        {
          type: "LinkedResource",
          rel: ["alternate"],
          url: `${downloadPrefix}/${fileBucket}/${filePath}`,
          encodingFormat: contentType
        }
      ],
      readingOrder: []
    };
    
    const storageFile = uploadBucket.file(path.join(targetPath, "index.json"));
    await storageFile.save(JSON.stringify(unsupported), {
      metadata: {
        contentType:  "application/json"
      },
      gzip: true,
      resumable: false
    });
  }
  fs.unlinkSync(tempFilePath);
};