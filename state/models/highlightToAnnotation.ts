import position from "dom-anchor-text-position";
import textQuote from "dom-anchor-text-quote";

// Add support for purposes. And root motivation

export function highlightToAnnotation(selector, root, source, chapter) {
  const range = position.toRange(root, selector);
  const content = serializeRange(range);
  const quote = {
    type: "TextQuoteSelector",
    ...textQuote.fromTextPosition(root, selector),
  };
  return {
    id: null,
    shortId: null,
    sourceId: source,
    target: {
      source: chapter,
      selector: quote,
    },
    body: [
      {
        motivation: "highlighting",
        content,
      },
    ],
    document: chapter, // Make sure this is right
  };
}

function serializeRange(range) {
  const placeholder = document.createElement("div");
  const fragment = range.cloneContents();
  fragment.querySelectorAll("[data-reader]").forEach((element) => {
    element.remove();
  });
  fragment.querySelectorAll("mark[data-annotation-id]").forEach((element) => {
    element.replaceWith(element.textContent);
  });
  fragment.querySelectorAll("a.Highlight-return-link").forEach((element) => {
    element.remove();
  });
  fragment
    .querySelectorAll("[style]")
    .forEach((element) => element.removeAttribute("style"));
  placeholder.appendChild(fragment);
  return placeholder.innerHTML;
}
