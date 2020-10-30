import { page } from "../page";
import { derived, writable } from "svelte/store";
import { error } from "../error.js";
import { fetch } from "../fetch.js";

export const refreshSearchSources = writable(Date.now());
export const searchAddSources = writable();

export const searchedSources = derived(
  [page, refreshSearchSources, searchAddSources],
  ([$page, $refreshSearchSources, $searchAddSources], set) => {
    if (!process.browser) return;
    if (!$page.path || !$page.path.startsWith("/notebooks/")) return;
    if ($page.query.returnTo) return;
    set({ type: "loading", items: [] });
    const query = Object.assign({}, $page.query);

    if ($searchAddSources) {
      query.search = $searchAddSources;
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
