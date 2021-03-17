import got from "got";

export async function del(req, res, next) {
  if (!req.user || !req.user.profile) return res.sendStatus(401);
  if (!req.body.items) return;

  const items = req.body.items;
  let responses = [];
  for (const item of items) {
    try {
      const response = await got
        .delete(item.id, {
          headers: {
            Authorization: `Bearer ${req.user.token}`,
          },
        })
        .json();
      responses = responses.concat(response);
    } catch (err) {
      console.error(err.response.body);
      let body;
      try {
        body = JSON.parse(err.response.body);
      } catch (err) {
        body = err.response.body;
      }
      responses = responses.concat(body);
    }
  }
  // console.log(res.json(responses));
  return res.json(responses);
}

export async function put(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401);
  if (!req.body.items) return;

  const items = req.body.items;
  const colour = req.body.newColour;

  let responses = [];
  for (const item of items) {
    const url = `${process.env.API_SERVER}notebooks/${item.shortId}`;
    item.settings.colour = colour;

    try {
      const response = await got
        .put(url, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${req.user.token}`,
          },
          json: item,
        })
        .json();

      responses = responses.concat(response);
    } catch (err) {
      console.log(err);
      responses = responses.concat(err.response.body);
    }
  }
  return res.json(responses);
}
