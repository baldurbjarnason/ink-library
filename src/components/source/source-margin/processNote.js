export function getNoted(note) {
  return [].concat(note.body).find((item) => {
    return item.motivation === "commenting" || item.purpose === "commenting";
  });
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
