import { writable } from 'svelte/store';
export {page} from './page'

export {library, refreshDate} from './library'

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