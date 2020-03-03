
import {page} from './page'
import { derived, writable } from 'svelte/store';
import {collections} from './collections'

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

// All of the stack objects need to be sourced from $collections for the set object to work
export const publicationStacks = derived([publication, collections], ([$publication, $collections], set) => {
  const tags = $publication.tags.filter(tag => tag.type !== 'workspace').map(tag => $collections.find(item => item.id === tag.id))
  set(new Set(tags))
}, new Set())


export const addingStacks = writable(new Set())
export const removingStacks = writable(new Set())

export const workingStacks = derived([addingStacks, publicationStacks, removingStacks], ([$addingStacks,  $publicationStacks, $removingStacks], set) => {
  const union = new Set(Array.from($addingStacks).concat(Array.from($publicationStacks)).filter(tag => !$removingStacks.has(tag)))
  set(union)
}, new Set())

export const availableStacks = derived([workingStacks, collections], ([$workingStacks, $collections], set) => {
  const available = $collections.filter(tag => !$workingStacks.has(tag))
  set(new Set(available))
}, new Set())




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
          type: "processing",
          heading: "Processing...",
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