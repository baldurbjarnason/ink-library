import got from "got";

export async function get(req, res, next) {
  if (!req.user || !req.user.profile) return res.sendStatus(401);
  try {
    const url = `${process.env.API_SERVER}${req.params.path.join("/")}`;
    const response = await got(url, {
      headers: {
        Authorization: `Bearer ${req.user.token}`,
      },
    }).json();
    res.json(response);
  } catch (err) {
    if (err.response && err.response.statusCode) {
      res.status(err.response.statusCode);
      return res.json(JSON.parse(err.response.body));
    } else {
      res.status(500);
      return res.json(JSON.parse(err));
    }
  }
}
