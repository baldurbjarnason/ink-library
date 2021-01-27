import got from "got";

export async function del(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401);
  if (!req.body.items) return;

  const items = req.body.items;
  let responses = [];
  let type = "";
  const url = req.body.notebook ? `notebooks/${req.body.notebook}/` : `canvas/`;

  for (const item of items) {
    if (req.body.notebook) type = item.body ? "notes/" : "sources/";
    try {
      const response = await got
        .delete(`${process.env.API_SERVER}${url}${type}${item.shortId}`, {
          headers: {
            Authorization: `Bearer ${req.user.token}`,
          },
        })
        .json();
      responses = responses.concat(res.json(response));
    } catch (err) {
      responses = responses.concat(err.response);
    }
  }
  console.log(responses);
  return res.json(responses);
}
