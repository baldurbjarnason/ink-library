const { Storage } = require("@google-cloud/storage");
const path = require("path");
const storage = new Storage();

export async function get(req, res, next) {
  const bucket = storage.bucket(process.env.PUBLICATION_BUCKET);
  const userPrefix = new URL(req.user.profile.id).pathname.replace("/", "");
  const fileName = path.join(userPrefix, req.params.storageId, "contents.json");
  const file = bucket.file(fileName);
  const [exists] = await file.exists();
  if (exists) {
    const [data] = await file.download();
    const result = JSON.parse(data.toString("utf8"));
    result.storageId = req.params.storageId;
    return res.json(result);
  } else {
    return res.sendStatus(404);
  }
}
