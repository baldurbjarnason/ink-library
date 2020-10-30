import { page } from "../page";
import { derived } from "svelte/store";
import { error } from "../error.js";
import { fetch } from "../fetch.js";

export const profileNotes = derived(
  [page], ([$page], set) => {
    if (!process.browser) return;
    if (!$page.path || !$page.path.startsWith("/readers/")) return;
    if ($page.query.returnTo) return;

    return fetch(`/api/notes`)
      .then(lib => {
        set(lib.totalItems);
      })
      .catch(err => {
        set({ type: "failed", items: [] });
        error.set(err);
        console.error(err);
      });
  },
  { type: "loading", items: [] }
);
