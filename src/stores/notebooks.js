import { page } from "./page";
import { derived, writable } from "svelte/store";
import { error } from "./error.js";
import { fetch } from "./fetch.js";
import { goto } from "@sapper/app";

export const refreshNotebooks = writable(Date.now());
export const searchNotebooks = writable();
export const addedNotebooks = writable([]);
export const defaultNotebook = writable();

export const notebooks = derived(
  [page, refreshNotebooks, searchNotebooks],
  ([$page, $refreshNotebooks, $searchNotebooks], set) => {
    if (!process.browser) return;

    if (!$page.path || !($page.path.startsWith("/notebooks") || $page.path.startsWith("/sources")|| $page.path.startsWith("/library")|| $page.path.startsWith("/notes"))) return;
    if ($page.params.id && !$page.path.startsWith("/sources")) return;
    if ($page.query.returnTo) return;
    set({ type: "loading", items: [] });
    const query = Object.assign({}, $page.query);

    if ($searchNotebooks) {
      query.search = $searchNotebooks;
      if (parseInt(query.page) > 1) {
        goto($page.path)
      }
      query.page = "1";
    } else if ($page.query.search) {
      query.search = $page.query.search;
      if (parseInt(query.page) > 1) {
        goto($page.path)
      }
      query.page = "1";
    }
    let url;
    if (query) {
      url = `/api/notebooks?${new URLSearchParams(query).toString()}`;
    } else {
      url = `/api/notebooks`;
    }

    return fetch(url)
      .then((lib) => {
        set(lib);
      })
      .catch((err) => {
        set({ type: "failed", items: [] });
        error.set(err);
        console.error(err);
      });
  },
  { type: "loading", items: [] }
);
