import got from "got";

export async function del(req, res, next) {
  if (!req.user || !req.user.profile) return res.sendStatus(401);
  if (!req.body.items) return;

  const ids = req.body.items.map((item) => item.id);
  let responses = [];
  for (const id of ids) {
    try {
      const response = await got
        .delete(id, {
          headers: {
            Authorization: `Bearer ${req.user.token}`,
          },
        })
        .json();
      responses = responses.concat(response);
    } catch (err) {
      responses = responses.concat(err.response);
    }
  }
  // console.log(res.json(responses));
  return res.json(responses);
}

export async function put(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401);
  if (!req.body.items) return;

  const items = req.body.items;
  const tags = req.body.tags;
  const colour = req.body.colour;
  const notebooks = req.body.notebooks;

  let responses = [];
  for (const item of items) {
    const url = `${process.env.API_SERVER}notes/${item.shortId}`;
    const currentTags = item.tags
      .filter((tag) => !colour || (colour && !tag.name.startsWith("colour")))
      .map((item) => {
        return item.shortId;
      });
    const mergeArr = currentTags.length
      ? Array.from(new Set(tags.concat(currentTags)))
      : tags;
    item.tags = [];
    item.notebooks = notebooks;
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

      if (mergeArr && mergeArr.length !== 0) {
        for (const tag of mergeArr) {
          await got.put(`${url}/tags/${tag}`, {
            headers: {
              "content-type": "application/ld+json",
              Authorization: `Bearer ${req.user.token}`,
            },
          });
        }
      }
      responses = responses.concat(response);
    } catch (err) {
      console.log(err);
      responses = responses.concat(err.response.body);
    }
  }
  return res.json(responses);
}
