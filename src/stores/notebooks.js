import { page } from "./page";
import { derived, writable } from "svelte/store";
import { error } from "./error.js";
import { fetch } from "./fetch.js";

export const refreshNotebooks = writable(Date.now());
export const searchNotebooks = writable();

export const notebooks = derived(
  [page, refreshNotebooks, searchNotebooks],
  ([$page, $refreshNotebooks, $searchNotebooks], set) => {
    if (!process.browser) return;
    if (!$page.path || !$page.path.startsWith("/notebooks")) return;
    if ($page.query.returnTo) return;
    set({ type: "loading", items: [] });
    const query = Object.assign({}, $page.query);

    if ($searchNotebooks) {
      query.search = $searchNotebooks;
    } else if ($page.query.search) {
      query.search = $page.query.search;
    }

    let url;
    if (query) {
      url = `/api/notebooks?${new URLSearchParams(query).toString()}`;
    } else {
      url = `/api/notebooks`;
    }
    return fetch(url)
      .then(lib => {
        if ($page.params.id) {
          const listNotebook = lib.items.find(
            item => item.shortId === $page.params.id
          );
          listNotebook.selected = true;
        }
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
