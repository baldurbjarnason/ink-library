// This imports the libraryURL observable and always updates the library when necessary
// Also guards against non-browser use or maybe we just set these up in the _layout component and everybody else fetches it from context
// Exports notes, sources, notebooks, 

// tags, flags, colours endpoints

import {web} from './web'
import {libraryURL$, notebookURL$, notesURL$, tagsURL$, readerURL$, chapterURL$, sourceURL$, sourceNotesURL$} from './state-urls'
import { distinctUntilChanged } from 'rxjs/operators'

// Figure how to do search with these.
export const library$ = web(libraryURL$.pipe(distinctUntilChanged()))

export const notes$ = web(notesURL$.pipe(distinctUntilChanged()))

export const notebooks$ = web(notebookURL$.pipe(distinctUntilChanged()))

export const tags$ = web(tagsURL$.pipe(distinctUntilChanged()))

export const reader$ = web(readerURL$.pipe(distinctUntilChanged()))

export const source$ = web(sourceURL$.pipe(distinctUntilChanged()))

export const chapter$ = web(chapterURL$.pipe(distinctUntilChanged()))

export const sourceNotes$ = web(sourceNotesURL$.pipe(distinctUntilChanged()))

let tags = []
tags$.subscribe({next (tagResult) {
  tags = tagResult
}})

interface Tag {
  name: string;
  id: string;
}

export function getIdsFromNames (names: Array<string>, tags: Array<Tag>) {
  return tags.filter(item => names.includes(item.name)).map(item => item.id);
}
