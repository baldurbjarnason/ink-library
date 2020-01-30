
import got from "got";

// This needs to filter by workspace
export async function get(req, res, next) {
  let url = `${process.env.API_SERVER}library`
  if (req.query.stack) {
    url = `${url}?stack=${req.query.stack}`
  } else if (req.query.workspace) {
    url = `${url}?stack=${req.query.workspace}`
  }

  const response = await got(url, {
    headers: {
      Authorization: `Bearer ${req.user.token}`
    }
  }).json();
  res.json(response);
}