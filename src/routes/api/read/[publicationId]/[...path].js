
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const got = require('got');
const path = require('path')
const preRender = require('ink-engine/src/prerender')

// This needs to filter by workspace
export async function get(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401)
  const bucket = storage.bucket(process.env.PUBLICATION_BUCKET);
  try {
    const notes = await getNotes(req)
    const userPrefix = new URL(req.user.profile.id).pathname.replace("/", "")
    const basePath = path.join(userPrefix, req.params.storageId, req.params.path.join("/"))
    const file = bucket.file(basePath)
    const [data] = await file.download()
    const chapter = JSON.parse(data)
    const documentURL = path.join('/api/read/', req.params.publicationId, req.params.storageId, req.params.path.join("/"))
    const chapterBase = '/'
    const linkBase = path.join('/library/all/all/', req.params.publicationId, req.params.storageId, req.params.path.join("/"))
    const mediaBase = path.join('/api/stored/', req.params.storageId, req.params.path.join("/"))
    const response = await preRender(chapter, {annotations: notes.items, documentURL, mediaBase, linkBase, chapterBase})
    res.json(response);
  } catch (err) {
    if (err.response && err.response.statusCode) {
      res.status(err.response.statusCode)
      return res.json(JSON.parse(err.response.body))
    } else {
      res.status(500)
      return res.json(JSON.parse(err))
    }
  }
}

async function getNotes (req) {
  let url = `${process.env.API_SERVER}notes`
  const query = new URLSearchParams()
  query.append('publication', `${process.env.API_SERVER}${req.params.publicationId}`)
  query.delete('dir')
  url = `${url}?${query.toString()}`
  const response = await got(url, {
    headers: {
      Authorization: `Bearer ${req.user.token}`
    }
  }).json();
  return response
}