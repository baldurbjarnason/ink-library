import got from "got";

export async function get(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401);
  try {
    const response = await got(`${process.env.API_SERVER}metadata?loc=true&doaj=true&crossref=true&title=${req.query.title}`, {
      headers: {
        Authorization: `Bearer ${req.user.token}`
      }
    }).json();
    res.json(response);
  } catch (err) {
    if (err.response && err.response.statusCode) {
      res.status(err.response.statusCode);
    } else {
      res.status(500);
    }
    let payload;
    try {
      payload = JSON.parse(err.response.body);
    } catch (err2) {
      payload = err;
    }
    console.log('payload?', payload)
    return res.json(payload);
  }
}
