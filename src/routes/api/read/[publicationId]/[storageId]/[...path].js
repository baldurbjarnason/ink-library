const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const got = require("got");
const path = require("path");
const preRender = require("ink-engine/src/prerender");
const URL = require("url").URL;

export async function get(req, res, next) {
  if (!req.user.profile) return res.sendStatus(401);
  const bucket = storage.bucket(process.env.PUBLICATION_BUCKET);
  try {
    const notes = await getNotes(req);
    const userPrefix = new URL(req.user.profile.id).pathname.replace("/", "");
    const basePath = path.join(
      userPrefix,
      req.params.storageId,
      req.params.path.join("/") + ".json"
    );
    const file = bucket.file(basePath);
    const [exists] = await file.exists();
    if (!exists) return res.sendStatus(404);
    const [data] = await file.download();
    const chapter = JSON.parse(data);
    const documentURL = `/${req.params.publicationId}/${req.params.path.join(
      "/"
    )}`;
    const linkBase = path.join(
      "/library/all/all/",
      req.params.publicationId,
      req.params.storageId,
      req.params.path.join("/")
    );
    const mediaBase = path.join(
      "/api/stored/",
      req.params.storageId,
      req.params.path.join("/")
    );
    const response = await preRender(chapter, {
      annotations: fixItems(notes.items),
      documentURL,
      mediaBase,
      linkBase
    });
    res.json(response);
  } catch (err) {
    console.error(err);
    if (err.response && err.response.statusCode) {
      res.status(err.response.statusCode);
      return res.json(JSON.parse(err.response.body));
    } else {
      res.status(500);
      return res.json(JSON.parse(err));
    }
  }
}

async function getNotes(req) {
  let url = `${process.env.API_SERVER}notes`;
  const query = new URLSearchParams();
  // Change this to document
  query.append(
    "document",
    `/${req.params.publicationId}/${req.params.path.join("/")}`
  );
  query.delete("dir");
  url = `${url}?${query.toString()}`;
  const response = await got(url, {
    headers: {
      Authorization: `Bearer ${req.user.token}`
    }
  }).json();
  return response;
}

function fixItems(items) {
  return items.map(fixItem).filter(item => item);
}

function fixItem(item) {
  item.body = [].concat(item.body).map(body => {
    return {
      type: "TextualBody",
      value: body.content,
      format: "text/html",
      purpose: body.motivation
    };
  });
  if (item.tags && item.tags.find(tag => tag.name.startsWith('colour'))) {
    item.target.styleClass = item.tags.find(tag => tag.name.startsWith('colour')).name.replace(' ', '').replace('c', 'C')
  }
  item.type = "Annotation";
  if (!item.target.selector) return null;
  return item;
}
