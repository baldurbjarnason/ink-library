
import {page} from './page'
import { derived, writable } from 'svelte/store';

export const refreshPublication = writable(Date.now())

const publicationId = derived(page, ($page) => $page.params.publicationId)

export const publication = derived([publicationId, refreshPublication], ([$publicationId, $refreshPublication], set) => {
  set({type: 'loading', items: [], 
  tags: []})
  if (!process.browser || !$publicationId) return
  const url = `/api/publication/${$publicationId}`
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