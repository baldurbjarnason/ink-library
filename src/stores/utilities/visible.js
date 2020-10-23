import { writable, derived } from "svelte/store";

const { subscribe, set } = writable(Date.now());

// online
if (!process.browser) {
  set(false);
} else {
  if (!isVisible()) {
    set(false);
  }
  window.addEventListener("visibilitychange", setVisibility, false);
  window.addEventListener("focus", setVisibility, false);
}
export const visible = {
  subscribe
};

export function throttledVisible(interval) {
  let lastEvent = Date.now();
  return derived(
    visible,
    ($visible, set) => {
      if ($visible - lastEvent >= interval) {
        lastEvent = $visible;
        set(lastEvent);
      }
    },
    Date.now()
  );
}

function setVisibility() {
  if (isVisible()) {
    set(Date.now());
  }
}

function isVisible() {
  if (
    typeof document !== "undefined" &&
    typeof document.visibilityState !== "undefined"
  ) {
    return document.visibilityState !== "hidden";
  } else {
    return true;
  }
}
