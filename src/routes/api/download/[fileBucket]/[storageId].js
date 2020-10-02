
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const mime = require('mime-types')

export async function get(req, res, next) {
  res.set("Cache-Control", "max-age=31536000, immutable");
  if (req.user) {
    try {
      const bucket = storage.bucket(process.env.GOOGLE_STORAGE_BUCKET);
      const userPrefix = new URL(req.user.profile.id).pathname.replace("/", "");
      const file = await bucket.file(`/${userPrefix}/${req.params.storageId}`);
      const [exists] = await file.exists();
      if (!exists) return res.sendStatus(404);
      // Need to get the file suffix for the media type.
      const [metadata] = await file
        .getMetadata();
      res.append('Last-Modified', (new Date(metadata.updated)).toUTCString());
      res.attachment(`${req.params.storageId}.${mime.extension(metadata.contentType)}`)
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
