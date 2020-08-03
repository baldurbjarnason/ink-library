import { writable } from "svelte/store";

export const selection = writable(null);
// should turn this into an object with methods for getting the current range and html for the selection.

if (process.browser) {
  document.addEventListener("selectionchange", () => {
    selection.set(getSelection());
  });
}

function getSelection() {
  const selection = window.document.getSelection();
  if (selection && !selection.isCollapsed) {
    return selection.getRangeAt(0);
  } else {
    return null;
  }
}
