import got from "got";

export const post = async function post(req, res, next) {
  if (!req.user || !req.user.profile) return res.sendStatus(401);

  if (req.user && req.user.profile) {
    try {
      const response = await got
        .post(`${process.env.API_SERVER}search`, {
          headers: {
            "content-type": "application/ld+json",
            Authorization: `Bearer ${req.user.token}`,
          },
          json: req.body,
        })
        .json();

      return res.json(response);
    } catch (err) {
      console.error(err);
      res.status(err.response.statusCode);
      return res.json(JSON.parse(err.response.body));
    }
  }
};
