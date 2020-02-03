const short = require('short-uuid');
const translator = short()
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

// Prefix with user id and with random id.
export async function post(req, res, next) {
  if (req.user.profile && req.user.profile.id) {
    const config = {
      version: 'v4',
      action: "write",
      expires: Date.now() + 1000 * 60 * 60 * 24
    }
    const userPrefix = new URL(req.user.profile.id).pathname.replace("/", "")
    const filePrefix = translator.new()
    const bucket = storage
      .bucket(process.env.GOOGLE_STORAGE_BUCKET)
    const [url] = await bucket
      .file(`${userPrefix}/${filePrefix}`)
      .getSignedUrl(config);
    res.json({url});
  }
}