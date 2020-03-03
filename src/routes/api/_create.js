import got from "got";

export function create (endpoint) {
  return async function post(req, res, next) {
    console.log(req.body)
    if (req.user && req.user.profile) {
      try {
        const response = await got.post(`${process.env.API_SERVER}${endpoint}`, {
          headers: {
            "content-type": "application/ld+json",
            Authorization: `Bearer ${req.user.token}`
          },
          json: req.body
        }).json();
        return res.json(response);
      } catch (err) {
        res.status(err.response.statusCode)
        return res.json(JSON.parse(err.response.body))
      }
    }
  }
}
