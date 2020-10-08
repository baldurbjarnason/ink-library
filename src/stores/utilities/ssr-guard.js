import { writable } from "svelte/store";

export function guard(storeFactory, constant = null) {
  return function(...args) {
    if (process.browser) {
      return storeFactory(...args);
    } else {
      return writable(constant);
    }
  };
}
