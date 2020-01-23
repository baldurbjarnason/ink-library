import { writable } from 'svelte/store';

export const library = writable({})

export const selectedItems = writable(new Set())

export function addSelected (item) {
  selectedItems.update(set => {
    return set.add(item)
  })
}
export function removeSelected (item) {
  selectedItems.update(set => {
    set.delete(item)
    return set
  })
}