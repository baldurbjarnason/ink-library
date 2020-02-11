
import got from "got";

// This needs to filter by workspace
export async function get(req, res, next) {
  const url = `${process.env.API_SERVER}publications/${req.params.publicationId}`
  const response = await got(url, {
    headers: {
      Authorization: `Bearer ${req.user.token}`
    }
  }).json();
  res.json(response);
}