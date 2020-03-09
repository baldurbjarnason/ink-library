
import got from "got";

export async function get(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401)
  try {
    const response = await got(`${process.env.API_SERVER}tags`, {
      headers: {
        Authorization: `Bearer ${req.user.token}`
      }
    }).json();
    res.json(response);
  } catch (err) {
    res.status(err.response.statusCode)
    let payload
    try {
      payload = JSON.parse(err.response.body)
    } catch (err2) {
      payload = err
    }
    return res.json(payload)
  }
}