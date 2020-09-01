import got from "got";

export async function post(req, res, next) {
  const url = `${process.env.API_SERVER}sources/${req.params.publicationId}`;
  if (!req.body.storageId) return res.sendStatus(400)
  const links = [
    {
      rel: "alternate",
      encodingFormat: "application/json",
      url: `/api/stored/${req.body.storageId}`
    },
    {
      rel: "contents",
      encodingFormat: "application/json",
      url: `/api/toc/${req.body.storageId}`
    }
  ];
  const body = {
    links,
    json: { storageId: req.body.storageId }
  };
  try {
    const response = await got
      .patch(url, {
        headers: {
          "content-type": "application/ld+json",
          Authorization: `Bearer ${req.user.token}`
        },
        json: body
      })
      .json();
    // console.log(response)
    return res.json(response);
  } catch (err) {
    res.status(err.response.statusCode);
    return res.json(JSON.parse(err.response.body));
  }
}
