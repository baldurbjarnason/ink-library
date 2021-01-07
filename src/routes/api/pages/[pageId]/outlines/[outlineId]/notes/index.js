import got from "got";

export async function patch(req, res, next) {
  const url = `${process.env.API_SERVER}outlines/${req.params.outlineId}/notes/${req.body.shortId}`;
  delete req.body.shortId;

  try {
    const response = await got.patch(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${req.user.token}`,
      },
      json: req.body,
    });

    console.log("response: ", response.body, req.body);
    return res.sendStatus(response.statusCode);
  } catch (err) {
    console.log(err);
    res.status(err.response.statusCode);
    return res.json(JSON.parse(err.response.body));
  }
}

export async function post(req, res, next) {
  const hasId = req.body.fresh ? "" : `?source=${req.body.shortId}`;
  const url = `${process.env.API_SERVER}outlines/${req.params.outlineId}/notes${hasId}`;
  delete req.body.shortId;
  delete req.body.id;
  delete req.body.fresh;

  try {
    const response = await got.post(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${req.user.token}`,
      },
      json: req.body,
    });

    // console.log("response: ", response.body, req.body);
    return res.sendStatus(response.statusCode);
  } catch (err) {
    console.log(err);
    res.status(err.response.statusCode);
    return res.json(JSON.parse(err.response.body));
  }
}

export async function del(req, res, next) {
  try {
    const response = await got
      .delete(
        `${process.env.API_SERVER}outlines/${req.params.outlineId}/notes/${req.body.shortId}`,
        {
          headers: {
            Authorization: `Bearer ${req.user.token}`,
          },
        }
      )
      .json();
    return res.json(response);
  } catch (err) {
    res.status(err.response.statusCode);
    return res.json(JSON.parse(err.response.body));
  }
}
