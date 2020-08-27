import {generateURL} from './_generate-url.js'
const path = require("path");
const fs = require("fs");
const os = require("os");
const formats = require("ink-engine/src/formats");
const compressible = require('compressible')
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

export async function post(req, res, next) {
  const uploadBucket = storage.bucket(process.env.PUBLICATION_BUCKET)
  const fileName = path.basename(req.query.filePath || 'index');
  let contentType
  let suffix
  if (req.is("html")) {
    contentType = "text/html"
    suffix = "html"
  } else if (req.is('application/epub+zip')) {
    contentType = "application/epub+zip"
    suffix = "epub"
  } else if (req.is("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
    contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    suffix = "docx"
  } else if (req.is("text/*")) {
    contentType = "text/markdown"
    suffix = "md"
  }
  const {storageId, url, userPrefix} = await generateURL(`${fileName}.${suffix}`, req.user.profile.id)
  const filePrefix = storageId;
  const Format = formats[contentType]
  const tempFilePath = path.join(os.tmpdir(), userPrefix, filePrefix, fileName);
  const targetPath = path.join(userPrefix, filePrefix);
  await fs.promises.mkdir(path.join(os.tmpdir(), userPrefix, filePrefix), {recursive: true})
  await fs.promises.writeFile(tempFilePath, req.body)
  const processor = new Format(tempFilePath, { extract, type: contentType })
  const book = await processor.process();
  fs.unlinkSync(tempFilePath);
  if (book) {
    extract({contents: JSON.stringify(book)}, Object.assign({ url: "index.json" }, book), {contentType: "application/json"})
  }
  // Return upload url for the front end to upload the original to.
  res.json({ storageId: filePrefix, book, url });
  async function extract(file, resource) {
    const metadata = {
      contentType:  resource.encodingFormat
    }
    const gzip = resource.encodingFormat && compressible(resource.encodingFormat)
    const filename = path.join(targetPath, resource.url);
    const storageFile = uploadBucket.file(filename);
    await storageFile.save(file.contents, {
      metadata,
      gzip,
      resumable: false
    });
    return filename;
  }
}
