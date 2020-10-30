import { page } from "../page";
import { derived, writable } from "svelte/store";
import { fetch } from "../fetch.js";

export const refreshReader = writable({ id: null, time: Date.now() });

const readerId = derived(page, $page => $page.params.id);

export const reader = derived(
  [page, readerId, refreshReader],
  ([$page, $readerId, $refreshReader], set) => {
    if (!$refreshReader.id || $refreshReader.id !== $readerId) {
      set({ type: "loading" });
    }
    if (!process.browser || !$readerId || !$page.path.startsWith('/readers/') || $readerId.length !== 22) return;

    const url = `/api/readers/${$readerId}`;
    return fetch(url)
      .then(lib => {
        set(lib);
      })
      .catch(err => {
        set({ type: "failed" });
        console.error(err);
      });
  },
  {}
);