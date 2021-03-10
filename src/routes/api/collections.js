import got from "got";

export async function get(req, res, next) {
  if (!req.user || !req.user.profile) return res.sendStatus(401);
  try {
    const response = await got(`${process.env.API_SERVER}tags`, {
      headers: {
        Authorization: `Bearer ${req.user.token}`,
      },
    }).json();
    res.json(
      response.map((item) => {
        // all flags must have names, even when somebody accidentally/intentionally creates one without a name
        item.name = item.name || "";
        return item;
      })
    );
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
    return res.json(payload);
  }
}
