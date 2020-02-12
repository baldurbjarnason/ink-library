
import {page} from './page'
import { derived, writable } from 'svelte/store';

export const refreshDate = writable(Date.now())
export const searchStore = writable()

export const library = derived([page, refreshDate, searchStore], ([$page, $refreshDate, $searchStore], set) => {
  set({type: 'loading', items: []})
  if (!process.browser || !$page.path || !$page.path.startsWith('/library')) return
  const query = Object.assign({}, $page.query)
  if ($page.params.collection && $page.params.collection !== "all") {
    query.stack = $page.params.collection
  } else if ($page.params.workspace && $page.params.workspace !== 'all') {
    query.workspace = $page.params.workspace.replace('_', ' ')
  }
  
  if ($searchStore) {
    query.search = $searchStore
  } else if ($page.query.search) {
    query.search = $page.query.search
  } else {
    query.search = ''
  }

  let url
  if (query) {
    url = `/api/library?${new URLSearchParams(query).toString()}`
  } else {
    url = `/api/library`
  }
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