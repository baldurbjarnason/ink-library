import { page } from "./page";
import { derived, writable } from "svelte/store";
import { fetch } from "./fetch.js";

export const refreshNote = writable({ id: null, time: Date.now() });

const noteId = derived(page, $page => $page.params.id);

export const note = derived(
  [page, noteId, refreshNote],
  ([$page, $noteId, $refreshNote], set) => {
    if (!$refreshNote.id || $refreshNote.id !== $noteId) {
      set({ body: [], source: { name: "" } });
    }

    if (!$noteId || !$page.path.startsWith("/notes/all/all/") || $page.params.id !== $noteId) return
    if (!process.browser || !$noteId || $noteId.length === 22) return;

    const url = `/api/note/${$noteId}`;
    return fetch(url)
      .then(lib => {
        set(lib);
      })
      .catch(err => {
        set({ type: "failed" });
        console.error(err);
      });
  },
  { body: [], source: { name: "" } }
);
