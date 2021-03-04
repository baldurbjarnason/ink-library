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
import { intersections, topmost } from "./nodes";

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

// combineLatest -> chapterNotes, topmost, heights, should result in a dictionary of entry objects with annotation property, note heights/position, and entry bounding box mapped to annotation id? Maybe an array? Render all notes, non-positioned are placed at bottom, with opacity 0 and aria-hidden.

let noteHeights = {};
const noteHeights$ = new BehaviorSubject(noteHeights);
let tempNoteHeights = [];
let animationFrame;
export function updateNoteHeight(noteHeight: { id: string; height: number }) {
  tempNoteHeights = tempNoteHeights.concat(noteHeight);
  if (!animationFrame) {
    animationFrame = window.requestAnimationFrame(() => {
      for (const height of tempNoteHeights) {
        noteHeights[height.id] = height.height;
      }
      tempNoteHeights = [];
      noteHeights$.next(noteHeights);
      animationFrame = null;
    });
  }
}
const highlights$ = intersections("[data-annotation-id]", {
  root: document.documentElement,
  rootMargin: "1000px 0px 0px 1000px",
});
const topmost$ = topmost(highlights$, (entry) => {
  return entry.element.dataset.annotationId;
});

type Note = {
  bottom?: number;
  top?: number;
  id: string;
  height: number;
};

export const positionedNotes$ = combineLatest([
  chapterNotes$,
  noteHeights$,
  topmost$,
]).pipe(
  map(([chapterNotes, heights, topmost]) => {
    const top = Array.from(topmost).sort((a, b) => {
      return a.top - b.top;
    });
    const entries = chapterNotes.map((annotation) => {
      const entry = top.find(
        (entry) => entry.element.dataset.annotationId === annotation.id
      );
      let note: Note = { id: annotation.id, height: heights[annotation.id] };
      if (!note) {
        note = {
          id: annotation.id,
          height: 90,
        };
      }
      let id = annotation.id;
      if (annotation.id === "temporary-selection-highlight") {
        id = "temp-" + Math.floor(Math.random() * 10000000000000);
      }
      return {
        id,
        annotation,
        entry,
        note,
      };
    });
    const adjustedEntries = top.map((entry, index) => {
      const item = entries.find((item) => {
        return item.annotation.id === entry.element.dataset.annotationId;
      });
      if (!item) {
        return null;
      }
      if (index !== 0) {
        // Check preceding item height and position, adjust your top to match
        const previousEntry = top[index - 1];
        const previous = entries.find((item) => {
          return (
            item.annotation.id === previousEntry.element.dataset.annotationId
          );
        });
        if (previous && previous.note.bottom >= item.entry.top) {
          item.note.top = previous.note.bottom + 10;
          item.note.bottom = item.note.top + item.note.height;
        } else {
          item.note.top = item.entry.top;
          item.note.bottom = item.note.top + item.note.height;
        }
        return item;
      } else {
        item.note.top = item.entry.top;
        item.note.bottom = item.entry.top + item.note.height;
        return item;
      }
    });
    return adjustedEntries.filter((item) => item);
  })
);

export const sourceNotes$ = web(sourceNotesURL$.pipe(distinctUntilChanged()));
