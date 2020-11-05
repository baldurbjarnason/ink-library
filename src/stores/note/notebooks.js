import { page } from "../page";
import { derived, writable } from "svelte/store";
import { error } from "../error.js";
import { fetch } from "../fetch.js";

export const notebookSearched = writable();

export const noteAddNotebooks = derived(
  [page, notebookSearched],
  ([$page, $notebookSearched], set) => {
    if (!process.browser) return;
    // if (!$page.path || !$page.path.startsWith("/notes/all/all")) return;
    if (!$page.path) return;
    if ($page.query.returnTo) return;
    set({ type: "loading", items: [] });

    const state = $notebookSearched ? `?search=${$notebookSearched}` : '';
    const url = `/api/notebooks${state}`;

    return fetch(url)
      .then(lib => {
        set(lib);
      })
      .catch(err => {
        set({ type: "failed", items: [] });
        error.set(err);
        console.error(err);
      });
  },
  { type: "loading", items: [] }
);
