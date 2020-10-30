import got from "got";
import ISO6391 from "iso-639-1";

// Make a list of fake notes: motivation, lang, id, body

// This needs to filter by workspace
// This needs to filter by workspace
export async function put(req, res, next) {
  const url = `${process.env.API_SERVER}notebooks/${req.params.notebookId}/notes/${req.params.noteId}`;
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
    return res.sendStatus(response.statusCode);
  } catch (err) {
    console.log(err);
    res.status(err.response.statusCode);
    return res.json(JSON.parse(err.response.body));
  }
}