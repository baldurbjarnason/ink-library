import { page } from "./page";
import { derived, writable } from "svelte/store";
import { fetch } from "./fetch.js";

export const refreshNote = writable({ id: null, time: Date.now() });

const noteId = derived(page, ($page) =>
  $page.params.noteId ? $page.params.noteId : $page.params.id
);

export const note = derived(
  [page, noteId, refreshNote],
  ([$page, $noteId, $refreshNote], set) => {
    if (!$refreshNote.id || $refreshNote.id !== $noteId) {
      set({ body: [], source: { name: "" } });
    }

    const paramNoteId = $page.params.noteId
      ? $page.params.noteId
      : $page.params.id;

    let pagePath = false;
    if ($page.path.startsWith("/notes/all/all/")) pagePath = true;
    if ($page.path.startsWith("/notebooks/"))
      if ($page.params.noteId === $noteId) pagePath = true;
      else pagePath = false;

    if (!$noteId || paramNoteId !== $noteId || !pagePath) return;
    if (!process.browser || !$noteId || $noteId.length === 22) return;

    return fetch(`/api/note/${$noteId}`)
      .then((lib) => {
        set(lib);
      })
      .catch((err) => {
        set({ type: "failed" });
        console.error(err);
      });
  },
  { body: [], source: { name: "" } }
);
