import got from "got";

export function create (endpoint) {
  return async function post(req, res, next) {
    if (typeof req.body !== "string") {
      req.body = JSON.stringify(req.body);
    }
    if (req.user && req.user.profile) {
      try {
        const response = await got.post(`${process.env.API_SERVER}${endpoint}`, {
          headers: {
            "content-type": "application/ld+json",
            Authorization: `Bearer ${req.user.token}`
          },
          body: req.body
        }).json();
        return res.json(response);
      } catch (err) {
        console.log(err);
        res.status(500);
        return res.json(err.body);
      }
    }
  }
}
