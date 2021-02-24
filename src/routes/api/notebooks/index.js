import got from "got";

export const post = async function post(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401);

  if (req.user && req.user.profile) {
    try {
      const response = await got
        .post(`${process.env.API_SERVER}notebooks`, {
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

export async function get(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401);
  try {
    let url = `${process.env.API_SERVER}notebooks`;
    const query = new URLSearchParams(req.query);
    if (req.query.dir === "desc") {
      query.append("reverse", "true");
    }
    if (req.query.orderBy === "modified") {
      query.delete("orderBy");
    }
    query.delete("dir");
    url = `${url}?${query.toString()}`;
    const response = await got(url, {
      headers: {
        Authorization: `Bearer ${req.user.token}`,
      },
    }).json();
    response.items = response.items.map((item) => {
      if (!item.settings) {
        item.settings = {};
      }
      return item;
    });
    res.json(response);
  } catch (err) {
    res.status(err.response.statusCode);
    return res.json(JSON.parse(err.response.body));
  }
}
