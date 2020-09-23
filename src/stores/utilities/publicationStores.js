import {cachedWeb} from './web.js'
import {nodes, annotations, intersecting, positions} from './nodes.js'
import { derived, writable } from "svelte/store";


const placedNotes = function (placed, notes) {
  return derived([placed, notes], ([$placed, $notes]) => {
    function getNote (id) {
      if ($notes) {
        const note = $notes.find(note => note.id === id)
        if (note) return note
      }
      return {tags: []}
    }

    if ($placed.length !== 0 && $notes.length !== 0) {
      const result = $placed.map(place => {
        place.note = getNote(place.id)
        return place
      })
      return result
    } else {
      return []
    }
  }, [])
}

const publicationId = writable(null)
const chapterId = writable(null)

export function publicationStores (pubId, chapId) {
  publicationId.set(pubId)
  chapterId.set(chapId)
  const url = derived(publicationId, $publicationId => `/api/publication/${$publicationId}`)
  const publicationData = cachedWeb(url, {initialData: { type: "loading", items: [], tags: [], keywords: [], replies: [] }})

  const publication = derived(publicationData, $publicationData => {
    if ($publicationData.error) console.error($publicationData.error)
    return $publicationData.data
  })

  const contents = derived(
    publication,
    ($publication, set) => {
      if ($publication.json && $publication.json.contents) {
        set($publication.json.contents);
        return;
      }
      if (!$publication.links) {
        set({
          type: 404,
          heading: "",
          children: []
        });
        return;
      }
      const contentsLink = $publication.links.find(
        link => link.rel === "contents"
      );
      if (!contentsLink) return;
      const url = contentsLink.url;
      return window
        .fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return {
              type: "processing",
              heading: "Processing...",
              children: []
            };
          }
        })
        .then(contents => {
          set(contents);
        })
        .catch(err => {
          set({ type: "failed" });
          console.error(err);
        });
    },
    { type: "loading", children: [] }
  );
  const chapter = derived(
    [chapterId, publication],
    ([$chapterId, $publication], set) => {
      if (!process.browser) return;
      if (!$chapterId) {
        set({ type: "Loading", contents: "", stylesheets: [] });
        return;
      }
      if (!$publication.json) return;
      const storageId = $publication.json.storageId;
      if (!storageId) return;
      return window
        .fetch(`/api/read/${$publication.shortId}/${storageId}/${$chapterId}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return {
              type: "processing",
              heading: "Processing...",
              contents: "",
              stylesheets: []
            };
          }
        })
        .then(contents => {
          set(contents);
        })
        .catch(err => {
          set({ type: "failed", stylesheets: [], contents: "" });
          console.error(err);
        });
    },
    { type: "Loading", contents: "", stylesheets: [] }
  );

  const notes = derived(chapter, ($chapter, set) => {
    if ($chapter.annotations) {
      set($chapter.annotations)
    } else {
      set([])
    }
  }, [])
  const watched = nodes("[data-annotation-id]")
  const visible = intersecting(watched, {rootMargin: "40px 0px 0px 0px", threshold: 0.1})
  const positioned = positions(watched, {rootMargin: "0px 0px 1500px 0px", threshold: 0.1})
  const placed = annotations(positioned)
  const positionedNotes = placedNotes(placed, notes)

  return {publication, chapter, contents, notes, visible, positionedNotes, chapterId, publicationId}
}