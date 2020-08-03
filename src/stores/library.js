import { page } from "./page";
import { derived, writable } from "svelte/store";
import { error } from "./error.js";
import { fetch } from "./fetch.js";

export const refreshDate = writable(Date.now());
export const searchStore = writable();

export const library = derived(
  [page, refreshDate, searchStore],
  ([$page, $refreshDate, $searchStore], set) => {
    if (!process.browser) return;
    if (!$page.path || !$page.path.startsWith("/library")) return;
    if ($page.query.returnTo) return;
    set({ type: "loading", items: [] });
    const query = Object.assign({}, $page.query);
    if ($page.params.collection && $page.params.collection !== "all") {
      query.stack = $page.params.collection;
    } else if ($page.params.workspace && $page.params.workspace !== "all") {
      query.workspace = $page.params.workspace.replace("_", " ");
    }

    if ($searchStore) {
      query.search = $searchStore;
    } else if ($page.query.search) {
      query.search = $page.query.search;
    }

    let url;
    if (query) {
      url = `/api/library?${new URLSearchParams(query).toString()}`;
    } else {
      url = `/api/library`;
    }
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
