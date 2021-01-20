import { generateURL } from "./_generate-url.js";
const path = require("path");
// const fs = require("fs");
// const os = require("os");
const formats = require("ink-engine/src/formats");
const compressible = require("compressible");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

export async function post(req, res, next) {
  const uploadBucket = storage.bucket(process.env.PUBLICATION_BUCKET);
  const fileName = path.basename(req.query.filePath || "index");
  let mediaType;
  let suffix;
  let body;
  if (req.is("html")) {
    mediaType = "text/html";
    suffix = "html";
    body = req.body.toString();
  } else if (req.is("application/epub+zip")) {
    mediaType = "application/epub+zip";
    suffix = "epub";
    body = req.body;
  } else if (
    req.is(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
  ) {
    mediaType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    suffix = "docx";
    body = req.body;
  } else if (req.is("text/*")) {
    mediaType = "text/markdown";
    suffix = "md";
    const text = req.body.toString();
    body = wrap(md.render(text), fileName);
  } else if (req.is("application/pdf")) {
    mediaType = "application/pdf";
    suffix = "pdf";
    body = req.body;
  }
  const { storageId, url, userPrefix } = await generateURL(
    `${fileName}.${suffix}`,
    req.user.profile.id
  );
  const filePrefix = storageId;
  const targetPath = path.join(userPrefix, filePrefix);
  let book;
  console.log(mediaType);
  try {
    for await (const vfile of formats({
      mediaType,
      data: body,
      thumbnails: false
    })) {
      if (!vfile.data) {
        book = vfile;
      } else {
        const metadata = {
          contentType: vfile.contentType
        };
        const gzip = vfile.contentType && compressible(vfile.contentType);
        const filename = path.join(targetPath, vfile.path);
        const storageFile = uploadBucket.file(filename);
        await storageFile.save(vfile.contents, {
          metadata,
          gzip,
          resumable: false
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.json(err.body);
  }
  // Return upload url for the front end to upload the original to.
  res.json({ storageId: filePrefix, book, url, type: mediaType });
}

function wrap(body, title) {
  return `<!doctype html>
  <html>
  <head>
    <meta charset='utf-8'>
    <meta name='viewport' content='width=device-width,initial-scale=1.0'>
    <title>${title}</title>
  </head>
  <body id="body">
  ${body}
  </body>
  </html>
  `;
}
