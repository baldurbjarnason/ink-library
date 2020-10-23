const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const path = require("path");
const mime = require("mime-types");

export async function get(req, res, next) {
  res.set("Cache-Control", "max-age=31536000, immutable");
  if (req.user) {
    try {
      const userPrefix = new URL(req.user.profile.id).pathname.replace("/", "");
      if (req.params.path[0] !== userPrefix) return res.sendStatus(404);
      const bucket = storage.bucket(req.params.fileBucket);
      const file = await bucket.file(req.params.path.join("/"));
      const [exists] = await file.exists();
      if (!exists) return res.sendStatus(404);
      const [metadata] = await file.getMetadata();
      res.append("Last-Modified", new Date(metadata.updated).toUTCString());
      res.attachment(
        `${path.basename(req.params.path.join("/"))}.${mime.extension(
          metadata.contentType
        )}`
      );
      return file
        .createReadStream()
        .on("error", function(err) {
          console.error(err);
        })
        .pipe(res);
    } catch (err) {
      console.error(err);
      return res.sendStatus(404);
    }
  }
}
