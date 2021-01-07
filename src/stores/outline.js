import { page } from "./page";
import { derived, writable } from "svelte/store";
import { fetch } from "./fetch.js";

export const refreshOutline = writable({ id: null, time: Date.now() });

const outlineId = derived(page, ($page) => $page.params.outlineId);

export const outline = derived(
  [page, outlineId, refreshOutline],
  ([$page, $outlineId, $refreshOutline], set) => {
    if (!$refreshOutline.id || $refreshOutline.id !== $outlineId) {
      set({ type: "loading" });
    }

    if (
      !$outlineId ||
      !$page.path.includes("/outlines/") ||
      $page.params.outlineId !== $outlineId
    )
      return;
    if (!process.browser || !$outlineId) return;

    const url = `/api/pages/${$page.params.pageId}/outlines/${$page.params.outlineId}`;

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
