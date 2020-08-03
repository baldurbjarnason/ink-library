import { page } from "./page";
import { derived, writable } from "svelte/store";
import { error } from "./error.js";
import { fetch } from "./fetch.js";

export const refreshNotes = writable(Date.now());
export const searchNotes = writable();

export const notes = derived(
  [page, refreshNotes, searchNotes],
  ([$page, $refreshNotes, $searchNotes], set) => {
    if (!process.browser) return;
    if (!$page.path || !$page.path.startsWith("/notes")) return;
    if ($page.query.returnTo) return;
    set({ type: "loading", items: [] });
    const query = Object.assign({}, $page.query);
    if ($page.params.collection && $page.params.collection !== "all") {
      query.stack = $page.params.collection;
    } else if ($page.params.workspace && $page.params.workspace !== "all") {
      query.workspace = $page.params.workspace.replace("_", " ");
    }

    if ($searchNotes) {
      query.search = $searchNotes;
    } else if ($page.query.search) {
      query.search = $page.query.search;
    }

    let url;
    if (query) {
      url = `/api/notes?${new URLSearchParams(query).toString()}`;
    } else {
      url = `/api/notes`;
    }
    return fetch(url)
      .then(lib => {
        if ($page.params.id) {
          const listNote = lib.items.find(
            item => item.shortId === $page.params.id
          );
          listNote.selected = true;
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
