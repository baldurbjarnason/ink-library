
import got from "got";

// This needs to filter by workspace
export async function get(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401)
  try {
    let url = `${process.env.API_SERVER}library`
    const query = new URLSearchParams(req.query)
    if (req.query.dir === "desc") {
      query.append('reverse', "true")
    }
    if (req.query.orderBy === "modified") {
      query.delete('orderBy')
    }
    query.delete('list-style')
    query.delete('dir')
    url = `${url}?${query.toString()}`
    const response = await got(url, {
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