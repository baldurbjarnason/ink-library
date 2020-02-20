
import got from "got";

// This needs to filter by workspace
export async function get(req, res, next) {
  let url = `${process.env.API_SERVER}library`
  const query = new URLSearchParams(req.query)
  if (req.query.stack) {
    query.append('stack', req.query.stack)
  } else if (req.query.workspace) {
    query.append('workspace', req.query.workspace)
  }
  if (req.query.search) {
    query.append('search', req.query.search)
  }
  if (req.query.dir === "desc") {
    query.append('reverse', "true")
  }
  if (req.query.orderBy === "modified") {
    query.delete('orderBy')
  }
  url = `${url}?${query.toString()}`
  const response = await got(url, {
    headers: {
      Authorization: `Bearer ${req.user.token}`
    }
  }).json();
  res.json(response);
}