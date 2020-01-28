
import got from "got";

export async function get(req, res, next) {
  const response = await got(`${process.env.API_SERVER}tags`, {
    headers: {
      Authorization: `Bearer ${req.user.token}`
    }
  }).json();
  res.json(response.filter(tag => tag.tagType !== 'mode'));
}