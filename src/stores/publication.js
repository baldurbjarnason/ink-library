
import {page} from './page'
import { derived, writable } from 'svelte/store';

export const refreshPublication = writable(Date.now())

export const publication = derived([page, refreshPublication], ([$page, $refreshPublication], set) => {
  set({type: 'loading', items: []})
  if (!process.browser || !$page.params.publicationId) return
  const url = `/api/publication/${$page.params.publicationId}`
  return window.fetch(url)
    .then(res => {
      return res.json()
    })
    .then(lib => {
      set(lib)
    })
    .catch(err => {
      set({type: 'failed'})
      console.error(err)
    })
})