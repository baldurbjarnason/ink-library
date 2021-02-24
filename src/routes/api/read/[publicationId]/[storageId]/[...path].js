const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const got = require("got");
const path = require("path");
const preRender = require("ink-engine/src/prerender");
const URL = require("url").URL;

export async function get(req, res, next) {
  // This is caching too aggressively
  if (!req.user.profile) return res.sendStatus(401);
  const bucket = storage.bucket(process.env.PUBLICATION_BUCKET);
  let notes;
  try {
    const userPrefix = new URL(req.user.profile.id).pathname.replace("/", "");
    const basePath = path.join(
      userPrefix,
      req.params.storageId,
      req.params.path.join("/") + ".json"
    );
    const [notes, storageResults] = await Promise.all([
      getNotes(req),
      getStorage(basePath, bucket),
    ]);
    const [chapter, metadata, status404] = storageResults;
    if (status404) {
      return res.sendStatus(404);
    }
    const documentURL = `/${req.params.publicationId}/${req.params.path.join(
      "/"
    )}`;
    const linkBase = path.join(
      "/sources/",
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
      linkBase,
    });
    res.append("Last-Modified", new Date(metadata.updated).toUTCString());
    res.json(response);
  } catch (err) {
    console.error("Error: ", err);
    if (err.response && err.response.statusCode) {
      res.status(err.response.statusCode);
      return res.json({ message: err.response.body, notes });
    } else {
      res.status(500);
      return res.json({
        message: err.message,
        err: JSON.stringify(err),
        notes,
      });
    }
  }
}

async function getStorage(basePath, bucket) {
  const file = bucket.file(basePath);
  const [exists] = await file.exists();
  if (!exists) return [null, null, !exists];
  const [metadata] = await file.getMetadata();
  const [data] = await file.download();
  const chapter = JSON.parse(data);
  return [chapter, metadata, null];
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
  try {
    const response = await got(url, {
      headers: {
        Authorization: `Bearer ${req.user.token}`,
      },
    });
    return JSON.parse(response.body);
  } catch (err) {
    console.error(err);
    console.error(err.response.body);
    return { items: [] };
  }
}

function fixItems(items) {
  const fixed = items.map(fixItem).filter((item) => item);
  return fixed.filter((item) => {
    if (
      item.target.selector.type === "TextQuoteSelector" &&
      !item.target.selector.exact
    ) {
      return false;
    } else {
      return true;
    }
  });
}

function fixItem(item) {
  item.body = [].concat(item.body).map((body) => {
    return {
      type: "TextualBody",
      value: body.content,
      format: "text/html",
      purpose: body.motivation,
    };
  });
  if (item.tags && item.tags.find((tag) => tag.name.startsWith("colour"))) {
    item.target.styleClass = item.tags
      .find((tag) => tag.name.startsWith("colour"))
      .name.replace(" ", "")
      .replace("c", "C");
  }
  item.type = "Annotation";
  if (!item.target.selector) return null;
  if (item.target.selector.type === "CSSSelector") {
    item.target.selector.type = "CssSelector";
    item.target.selector.value = item.target.selector.value.toLowerCase();
  }
  const colour = []
    .concat(item.tags)
    .find((tag) => tag.name.startsWith("colour"));
  if (colour) {
    item.styleClass = "Colour" + colour.name.split(" ")[1];
  }
  return item;
}
