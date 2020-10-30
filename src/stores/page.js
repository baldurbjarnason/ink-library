import { writable, derived } from "svelte/store";

export const page = writable({});

export const params = derived(page, $page => {
  return $page.params;
});
