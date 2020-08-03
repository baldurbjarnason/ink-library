const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const sharp = require("sharp");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

const purifyConfig = {
  KEEP_CONTENT: false,
  IN_PLACE: true,
  ADD_ATTR: ["epub:type", "xmlns:epub"],
  ADD_TAGS: ["link"],
  WHOLE_DOCUMENT: true
};

const validTypes = [
  "application/pdf",
  "application/vnd.oasis.opendocument.presentation",
  "application/vnd.oasis.opendocument.spreadsheet",
  "application/vnd.oasis.opendocument.text",
  "application/json",
  "application/ld+json",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/epub+zip",
  "application/x-abiword",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.rar",
  "application/rtf",
  "application/x-tar",
  "text/plain",
  "application/vnd.visio",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/xml",
  "application/zip",
  "text/xml",
  "text/css",
  "text/csv",
  "application/x-font-ttf",
  "font/woff2",
  "font/woff",
  "font/ttf",
  "font/sfnt",
  "font/otf",
  "image/gif",
  "image/jpeg",
  "image/png",
  "application/font-sfnt",
  "application/font-woff",
  "audio/mpeg",
  "audio/mp4",
  "video/H264",
  "video/H265",
  "video/mp4"
];

// Need a separate 'download only' list of media types that are automatically given an attachment content-disposition.

export async function get(req, res, next) {
  res.set("Cache-Control", "max-age=31536000, immutable");
  if (req.user) {
    try {
      const userPrefix = new URL(req.user.profile.id).pathname.replace("/", "");
      const bucket = storage.bucket(process.env.PUBLICATION_BUCKET);
      const file = await bucket.file(
        `${userPrefix}/${req.params.storageId}/${req.params.path.join("/")}`
      );
      const [exists] = await file.exists();
      if (!exists) return res.sendStatus(404);
      const [metadata] = await file.getMetadata();
      if (metadata.contentType === "image/svg+xml") {
        const [mainresponse] = await file.download();
        const dom = new JSDOM(mainresponse, {
          contentType: metadata.contentType
        });
        const window = dom.window;
        const DOMPurify = createDOMPurify(window);
        const clean = DOMPurify.sanitize(
          window.document.documentElement,
          purifyConfig
        );
        const xml = new window.XMLSerializer();
        const result = xml.serializeToString(clean);
        res.type("svg");
        res.send(result);
      } else if (metadata.contentType.includes("image") && req.query.cover) {
        const resizer = sharp()
          .resize(300, 300, { fit: "inside" })
          .jpeg({ quality: 70 });
        resizer.on("error", err => {
          console.error(err);
          res.sendStatus(404);
        });
        file
          .createReadStream()
          .on("error", function(err) {
            console.error(err);
          })
          .pipe(resizer)
          .pipe(res);
      } else if (testMediaTypes(metadata.contentType)) {
        file
          .createReadStream()
          .on("error", function(err) {
            console.error(err);
          })
          .pipe(res);
      } else {
        return res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      return res.sendStatus(404);
    }
  }
}

function testMediaTypes(contentType) {
  if (contentType.startsWith("image")) return true;
  if (contentType.startsWith("font")) return true;
  if (contentType.startsWith("audio")) return true;
  if (contentType.startsWith("video")) return true;

  if (validTypes.includes(contentType)) {
    return true;
  }
}
