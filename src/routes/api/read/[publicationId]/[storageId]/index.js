
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const path = require('path')

// This needs to filter by workspace
export async function get(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401)
  const bucket = storage.bucket(process.env.PUBLICATION_BUCKET);
  try {
    const userPrefix = new URL(req.user.profile.id).pathname.replace("/", "")
    const basePath = path.join(userPrefix, req.params.storageId, "index.json")
    const file = bucket.file(basePath)
    const [data] = await file.download()
    res.json(JSON.parse(data));
  } catch (err) {
    if (err.response && err.response.statusCode) {
      res.status(err.response.statusCode)
      return res.json(JSON.parse(err.response.body))
    } else {
      res.status(500)
      return res.json(JSON.parse(err))
    }
  }
}
