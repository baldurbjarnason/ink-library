import DOMPurify from "dompurify";

export function getNoted(note) {
  let body = [].concat(note.body).find((item) => {
    return item.motivation === "commenting" || item.purpose === "commenting";
  });
  let content;
  if (body) {
    body = Object.assign({}, body);
    content = body.content || body.value;
  }
  if (body && content && content.length >= 300) {
    const fragment = DOMPurify.sanitize(content, {
      RETURN_DOM: true,
      RETURN_DOM_FRAGMENT: true,
    });
    body.content = body.value =
      fragment.textContent
        .split(/\b/)
        .slice(0, 30)
        .join("") + "...";
  }
  return body;
}

export function getHighlighted(note) {
  // console.log(note)
  return [].concat(note.body).find((item) => {
    return (
      item.motivation === "highlighting" || item.purpose === "highlighting"
    );
  });
}

export function getFlags(note) {
  return []
    .concat(note.tags)
    .filter((flag) => flag.type === "flag" && !flag.name.startsWith("colour"));
}

export function getColours(note) {
  const colourTags = []
    .concat(note.tags)
    .filter((flag) => flag.name.startsWith("colour"));
  if (colourTags.length === 0) {
    return [{ name: "colour 1" }];
  } else {
    return colourTags;
  }
}
