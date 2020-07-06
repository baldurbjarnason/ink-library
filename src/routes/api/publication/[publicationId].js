
import got from "got";
import ISO6391 from 'iso-639-1'


// Make a list of fake notes: motivation, lang, id, body

// This needs to filter by workspace
export async function get(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401)
  const url = `${process.env.API_SERVER}sources/${req.params.publicationId}`
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
      }
    })
    response.keywords = response.keywords || []
    res.json(response);
  } catch (err) {
    res.status(err.response.statusCode)
    return res.json(JSON.parse(err.response.body))
  }
}
// This needs to filter by workspace
export async function put(req, res, next) {
  const url = `${process.env.API_SERVER}sources/${req.params.publicationId}`
  try {
    const response = await got.patch(url, {
      headers: {
        "content-type": "application/ld+json",
        Authorization: `Bearer ${req.user.token}`
      },
      json: req.body
    }).json();
    return res.json(response);
  } catch (err) {
    res.status(err.response.statusCode)
    return res.json(JSON.parse(err.response.body))
  }
}