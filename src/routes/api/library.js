
import got from "got";

// This needs to filter by workspace
export async function get(req, res, next) {
  let url = `${process.env.API_SERVER}library`
  const query = new URLSearchParams()
  if (req.query.stack) {
    query.append('stack', req.query.stack)
  } else if (req.query.workspace) {
    query.append('stack', req.query.workspace)
  }
  if (req.query.search) {
    query.append('search', req.query.search)
  }
  url = `${url}?${query.toString()}`
  const response = await got(url, {
    headers: {
      Authorization: `Bearer ${req.user.token}`
    }
  }).json();
  res.json(response);
}