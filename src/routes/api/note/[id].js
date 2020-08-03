import got from "got";
import ISO6391 from "iso-639-1";

// Make a list of fake notes: motivation, lang, id, body

// This needs to filter by workspace
export async function get(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401);
  const url = `${process.env.API_SERVER}notes/${req.params.id}`;
  try {
    const response = await got(url, {
      headers: {
        Authorization: `Bearer ${req.user.token}`
      }
    }).json();
    response._inLanguage = [].concat(response.inLanguage).map(code => {
      return {
        code,
        english: ISO6391.getName(code),
        native: ISO6391.getNativeName(code)
      };
    });
    response.keywords = response.keywords || [];
    res.json(response);
  } catch (err) {
    res.status(err.response.statusCode);
    return res.json(JSON.parse(err.response.body));
  }
}
// This needs to filter by workspace
export async function put(req, res, next) {
  const url = `${process.env.API_SERVER}notes/${req.params.id}`;
  const tags = req.body._tags;
  delete req.body._tags;
  try {
    const response = await got.put(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${req.user.token}`
      },
      json: req.body
    });
    // In theory this should let us add tags on updates
    if (tags && tags.length !== 0) {
      for (const tag of tags) {
        await got.put(`${url}/tags/${tag}`, {
          headers: {
            "content-type": "application/ld+json",
            Authorization: `Bearer ${req.user.token}`
          }
        });
      }
    }
    console.log(response);
    return res.sendStatus(response.statusCode);
  } catch (err) {
    console.log(err);
    res.status(err.response.statusCode);
    return res.json(JSON.parse(err.response.body));
  }
}
