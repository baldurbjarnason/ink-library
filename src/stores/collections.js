
import { derived, writable } from 'svelte/store';
import {error} from './error.js'
import {fetch} from './fetch.js'

export const refreshCollections = writable(Date.now())

export const tags = derived(refreshCollections, ($refreshCollections, set) => {
  set([])
  if (!process.browser) return
  return fetch("/api/collections")
    .then(lib => {
      set(lib)
    })
    .catch(err => {
      set({type: 'failed'})
      error.set(err)
      console.error(err)
    })
})
export const workspaces = derived(tags, ($tags, set) => {
  set($tags.filter(tag => tag.type === 'workspace'))
})
export const collections = derived(tags, ($tags, set) => {
  const stacks = $tags.filter(tag => tag.type === 'stack').sort((a, b) => getName(a.name).localeCompare(getName(b.name)))
  set(stacks)
})

export const addingWorkspace = writable("all")

export const addedCollections = writable([])

export const addedWorkspaces = writable([])

const spaces = ['Research', 'Public_Scholarships', 'Teaching', 'Personal']
function getName (name) {
  const space = name.split('/')[0].replace(' ', '_')
  if (spaces.includes(space)) {
    return name.replace(space + '/', '')
  } else {
    return name
  }
}