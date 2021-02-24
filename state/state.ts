// This imports the libraryURL observable and always updates the library when necessary
// Also guards against non-browser use or maybe we just set these up in the _layout component and everybody else fetches it from context
// Exports notes, sources, notebooks,

// tags, flags, colours endpoints

import { web } from "./web";
import {
  libraryURL$,
  notebooksURL$,
  notesURL$,
  tagsURL$,
  readerURL$,
  chapterURL$,
  sourceURL$,
  sourceNotesURL$,
} from "./state-urls";
import { distinctUntilChanged, map } from "rxjs/operators";
import { combineLatest, BehaviorSubject } from "rxjs";
import { Annotation$, createdNotes$ } from "./models/Annotation";

// Figure how to do search with these.
// export const library$ = web(libraryURL$.pipe(distinctUntilChanged()));

// export const notes$ = web(notesURL$.pipe(distinctUntilChanged()));

export const notebooks$ = web(notebooksURL$.pipe(distinctUntilChanged()));

export const reader$ = web(readerURL$.pipe(distinctUntilChanged()));

export const source$ = new BehaviorSubject({});

export const chapter$ = new BehaviorSubject({ annotations: [] });

export const chapterNotes$ = combineLatest([chapter$, createdNotes$]).pipe(
  map(([chapter, createdNotes = []]) => {
    const annotations = chapter.annotations
      .filter((note) => {
        if (
          note &&
          note.body &&
          note.body[0] &&
          note.body[0].purpose === "bookmarking"
        ) {
          return false;
        } else {
          return true;
        }
      })
      .map((annotation) => {
        return new Annotation$(annotation);
      });
    return annotations.concat(Array.from(createdNotes));
  })
);

export const sourceNotes$ = web(sourceNotesURL$.pipe(distinctUntilChanged()));
