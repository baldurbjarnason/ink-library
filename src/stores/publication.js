
import {page} from './page'
import { derived, writable } from 'svelte/store';

export const refreshPublication = writable({id: null, time: Date.now()})

const publicationId = derived(page, ($page) => $page.params.publicationId)

export const publication = derived([publicationId, refreshPublication], ([$publicationId, $refreshPublication], set) => {
  if (!$refreshPublication.id || $refreshPublication.id !== $publicationId) {
    set({type: 'loading', items: [], 
    tags: [], keywords: [], replies: []})
  }
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

export const contents = derived(publication, ($publication, set) => {
  if ($publication.json && $publication.json.contents) {
    set($publication.json.contents)
    return
  }
  if (!process.browser || !$publication.links) {
    set({
      type: 404,
      heading: "",
      children: []
    })
    return
  }
  const contentsLink = $publication.links.find(link => link.rel === "contents")
  if (!contentsLink) return
  const url = contentsLink.url
  return window.fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return {
          type: 404,
          heading: "",
          children: []
        }
      }
    })
    .then(contents => {
      set(contents)
    })
    .catch(err => {
      set({type: 'failed'})
      console.error(err)
    })
}, {type: 'loading', children: []})