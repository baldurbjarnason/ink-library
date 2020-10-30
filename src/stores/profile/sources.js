import { page } from "../page";
import { derived } from "svelte/store";
import { error } from "../error.js";
import { fetch } from "../fetch.js";

export const profileSources = derived(
  [page], ([$page], set) => {
    if (!process.browser) return;
    if (!$page.path || !$page.path.startsWith("/readers/")) return;
    if ($page.query.returnTo) return;

    return fetch(`/api/library`)
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
