
import { derived, writable } from 'svelte/store';

export const refreshCollections = writable(Date.now())

export const tags = derived(refreshCollections, ($refreshCollections, set) => {
  set([])
  if (!process.browser) return
  return window.fetch("/api/collections")
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
export const workspaces = derived(tags, ($tags, set) => {
  set($tags.filter(tag => tag.type === 'workspace'))
})
export const collections = derived(tags, ($tags, set) => {
  set($tags.filter(tag => tag.type !== 'workspace'))
})

export const addingWorkspace = writable("all")

export const addedCollections = writable([])

export const addedWorkspaces = writable([])