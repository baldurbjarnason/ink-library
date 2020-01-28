
import got from "got";

export async function get(req, res, next) {
  const response = await got(`${process.env.API_SERVER}library`, {
    headers: {
      Authorization: `Bearer ${req.user.token}`
    }
  }).json();
  res.json(response);
}