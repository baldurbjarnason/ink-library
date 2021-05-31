import { page } from "./page";
import { derived, writable } from "svelte/store";
import { fetch } from "./fetch.js";
import set from "date-fns/set";

export const refreshOutline = writable({ id: null, time: Date.now() });

const outlineId = derived(page, ($page) => $page.params.outlineId);

export const outlineNotesList = writable([])


// export const addMultipleNotesToEndOfOutline = function (notes) {
//   let list = $outlineNotesList;
//   let lastId

//   list = list.map(item => {
//     if (!item.next) {
//       item.next = firstNew.shortId;
//       lastId = item.shortId;
//     }
//     return item
//   })

//   notes = notes.map((item, i) => {
//     item.previous = lastId
//     item.next = notes[i+1].shortId
//     lastId = item.shortId;
//     return item;
//   })

//   list.concat(notes);
  
//   $outlineNotesList = list;
// }


export const orderedOutlineNotes = derived([outlineNotesList, refreshOutline, outlineId], ([$outlineNotesList, $refreshOutline, $outlineId], set) => {
  if (!$refreshOutline.id || $refreshOutline.id !== $outlineId) {
    set([]);
  }
  const orderedList = []
   let list = $outlineNotesList;
   if (list.length === 0) return [];
  
   list = list.map(note => {
     // needs a note.previous, note.next...
     if (note.outlineData) {
       note.next = note.outlineData.next;
       note.previous = note.outlineData.previous;
       note.parentId = note.outlineData.parentId; // not really needed until we have nested outlines
       note.outlineData = null;
     }
     return note;
   })
  const firstOfLists = list.filter(item => !item.previous)
  if (firstOfLists.length === 0) {
    throw new Error('Linked list does not have a first item')
  }
  firstOfLists.forEach(first => {
    orderedList.push(first)
    let current = first
    while (current.next) {
      let next = list.find(note => note.shortId === current.next )
      if (!next) {
        throw new Error(`cannot find 'next' item with id: ${current.next}`)
      }
      orderedList.push(next)
      if (orderedList.length > list.length) {
        throw new Error('circular')
      }
      current = next
    }
  })
  set(orderedList)
  return orderedList
})


export const outline = derived(
  [page, outlineId, refreshOutline],
  ([$page, $outlineId, $refreshOutline], set) => {
    if (!$refreshOutline.id || $refreshOutline.id !== $outlineId) {
      set({ type: "loading" });
    }

    if (
      !$outlineId ||
      !$page.path.includes("/outlines/") ||
      $page.params.outlineId !== $outlineId
    )
      return;
    if (!process.browser || !$outlineId) return;

    const url = `/api/pages/${$page.params.pageId}/outlines/${$page.params.outlineId}`;

    return fetch(url)
      .then((lib) => {
        console.log(lib)
        outlineNotesList.set(lib.notes);
        set(lib);
      })
      .catch((err) => {
        set({ type: "failed" });
        console.error(err);
      });
  },
  {}
);
