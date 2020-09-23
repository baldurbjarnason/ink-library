import { writable } from "svelte/store";

const { subscribe, set } = writable(true);

// online
if (!process.browser) {
  set(false);
} else {
  if (!window.navigator.onLine) {
    set(false);
  }
  window.addEventListener(
    "online",
    function() {
      set(true);
    },
    false
  );
  window.addEventListener(
    "offline",
    function() {
      set(false);
    },
    false
  );
}

export const online = {
  subscribe
};
