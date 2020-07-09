import { writable } from 'svelte/store';

export const paths = writable(new Map())

export function refresh (path) {
  paths.update((map) => {
    map.set(path, Date.now())
    return map
  })
}