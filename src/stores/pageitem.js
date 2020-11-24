import { page } from "./page";
import { derived, writable } from "svelte/store";
import { fetch } from "./fetch.js";

export const refreshPageItem = writable({ id: null, time: Date.now() });

const pageItemId = derived(page, ($page) => $page.params.id);

export const pageItem = derived(
  [page, pageItemId, refreshPageItem],
  ([$page, $pageItemId, $refreshPageItem], set) => {
    if (!$refreshPageItem.id || $refreshPageItem.id !== $pageItemId) {
      set({ type: "loading" });
    }

    if (
      !$pageItemId ||
      !$page.path.startsWith("/canvas/") ||
      $page.params.id !== $pageItemId
    )
      return;
    if (!process.browser || !$pageItemId) return;

    const url = `/api/canvas/${$pageItemId}`;
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
