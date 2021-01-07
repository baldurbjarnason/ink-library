import { page } from "./page";
import { derived, writable } from "svelte/store";
import { fetch } from "./fetch.js";

export const refreshNotebook = writable({ id: null, time: Date.now() });

const notebookId = derived(page, ($page) => $page.params.id);

export const notebook = derived(
  [page, notebookId, refreshNotebook],
  ([$page, $notebookId, $refreshNotebook], set) => {
    if (!$refreshNotebook.id || $refreshNotebook.id !== $notebookId) {
      set({ type: "loading" });
    }

    if (
      !$notebookId ||
      !$page.path.startsWith("/notebooks/") ||
      $page.params.id !== $notebookId
    )
      return;
    if (!process.browser || !$notebookId) return;

    const url = `/api/notebooks/${$notebookId}`;
    return fetch(url)
      .then((lib) => {
        set(lib);
      })
      .catch((err) => {
        set({ type: "failed" });
        console.error(err);
      });
  },
  {}
);
