export function serializeRange(range) {
  const placeholder = document.createElement("div");
  const fragment = range.cloneContents();
  fragment.querySelectorAll("[data-reader]").forEach(element => {
    element.parentElement.removeChild(element);
  });
  fragment.querySelectorAll("a.Highlight").forEach(element => {
    element.replaceWith(element.textContent);
  });
  fragment
    .querySelectorAll("[style]")
    .forEach(element => element.removeAttribute("style"));
  placeholder.appendChild(fragment);
  return placeholder.innerHTML;
}
