
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

// Prefix with user id and with random id.
export async function get(req, res, next) {
  if (req.user.profile && req.user.profile.id) {
    const config = {
      version: 'v4',
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 * 24
    }
    const userPrefix = new URL(req.user.profile.id).pathname.replace("/", "")
    const bucket = storage
      .bucket(process.env.PUBLICATION_BUCKET)
    const [url] = await bucket
      .file(`${userPrefix}/${req.params.storageId}/${req.params.path.join('/')}`)
      .getSignedUrl(config);
    res.redirect(url)
  }
}