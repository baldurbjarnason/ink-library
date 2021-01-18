// This imports the page observable and updates the current state urls based on the current parameters

import { map } from "rxjs/operators"
import {page} from "./page"

function collectionURL (collection) {
  return page().pipe(
    map(({query, path}) => {
      let search = {}
      if ("".concat(path).includes(collection)) {
        search = Object.assign({}, query)
      }
      return `/api/${collection}?${new URLSearchParams(search).toString()}`;
    })
  )
}

function stateURL (state) {
  return page().pipe(
    map(({path, params}) => {
      if (path.startsWith(state) && params.id) {
        return `/api${state}/${params.id}`
      } else {
        return null
      }
    })
  )
}

export const notesURL$ = collectionURL("notes")

export const libraryURL$ = collectionURL("library")

export const notebooksURL$ = collectionURL("notebooks")

export const tagsURL$ = collectionURL("tags")

export const noteURL$ = page().pipe(
  map(({path, params}) => {
    if (path.startsWith('/notes') && params.id) {
      return `/api/note/${params.id}`
    } else {
      return null
    }
  })
)

export const notebookURL$ = stateURL("/notebooks")

export const readerURL$ = stateURL("/readers")

// New path for reading UI
export const sourceURL$ = stateURL("/sources")

export const chapterURL$ = page().pipe(
  map(({path, params}) => {
    if (path.startsWith('/sources') && params.id && params.storage) {
      return `/api/read/${params.id}/${params.storage}/${params.chapter ? params.chapter.join('/') : ''}`
    } else {
      return null
    }
  })
)

// ChapterURL can only be calculated after we fetch the source.

// Let's change the URL structure for sources: /source/publicationId -> serverside redirect -> /source/publicationId/storageID/ https://sapper.svelte.dev/docs#this_redirect