
import {page} from './page'
import { derived, writable } from 'svelte/store';
import {fetch} from './fetch.js'

export const refreshNote = writable({id: null, time: Date.now()})

const noteId = derived(page, ($page) => $page.params.id)


export const note = derived([noteId, refreshNote], ([$noteId, $refreshNote], set) => {
  if (!$refreshNote.id || $refreshNote.id !== $noteId) {
    set({type: 'loading', items: [], 
    tags: [], keywords: [], replies: []})
  }
  if (!process.browser || !$noteId) return
  const url = `/api/note/${$noteId}`
  return fetch(url)
    .then(lib => {
      set(lib)
    })
    .catch(err => {
      set({type: 'failed'})
      console.error(err)
    })
})