import { writable } from 'svelte/store';

const { subscribe, set } = writable(true);
const QUERY = '(prefers-reduced-motion: reduce)'


// online
if (!window) {
  set(false)
} else {
    if (!window.matchMedia) {
      set(false)
    } else {
      set(window.matchMedia(QUERY).matches)
    }
}


export const motion = {
  subscribe
};