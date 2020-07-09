
import position from "dom-anchor-text-position";

export function positionToAnnotation (selector, root, source, chapter) {
  const range = position.toRange(root, selector);
  const content = serializeRange(range);
  return {
    sourceId: source.id,
    target: selector,
    body: [{
      motivation: "highlighting",
      content
    }],
    document: chapter.url, // Make sure this is right
  };
}


function serializeRange(range) {
  const placeholder = document.createElement("div");
  const fragment = range.cloneContents();
  fragment.querySelectorAll("[data-reader]").forEach(element => {
    element.remove();
  });
  fragment.querySelectorAll("mark[data-note-id]").forEach(element => {
    element.replaceWith(element.textContent);
  });
  fragment.querySelectorAll("a.Highlight-return-link").forEach(element => {
    element.remove();
  });
  fragment
    .querySelectorAll("[style]")
    .forEach(element => element.removeAttribute("style"));
  placeholder.appendChild(fragment);
  return placeholder.innerHTML;
}