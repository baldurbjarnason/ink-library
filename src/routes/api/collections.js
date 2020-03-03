
import got from "got";

export async function get(req, res, next) {
  try {
    const response = await got(`${process.env.API_SERVER}tags`, {
      headers: {
        Authorization: `Bearer ${req.user.token}`
      }
    }).json();
    res.json(response);
  } catch (err) {
    res.status(err.response.statusCode)
    return res.json(JSON.parse(err.response.body))
  }
}