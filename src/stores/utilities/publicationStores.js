import { web } from "./web.js";
import { nodes, annotations, intersecting, positions } from "./nodes.js";
import { derived, writable } from "svelte/store";

const placedNotes = function(placed, notes) {
  return derived(
    [placed, notes],
    ([$placed, $notes]) => {
      function getNote(id) {
        console.log(id)
        if ($notes) {
          const note = $notes.find(note => note.id === id);
          if (note) return note;
        }
        return { tags: [] };
      }

      console.log("placing notes: ",$placed, $notes)
      if ($placed.length !== 0 && $notes.length !== 0) {
        const result = $placed.map(place => {
          place.note = getNote(place.id);
          return place;
        });
        return result;
      } else {
        return [];
      }
    },
    []
  );
};

// Use cachedWeb for all requests.
// If contents/chapter isn't initial data but 404s, then it's processing
// Turn on polling for chapter endpoint and publication
// Make sure all end points support if-modified-since.
// Make sure updating refreshes publication
// Add error derived
let stores;
export function publicationStores(page) {
  if (!process.browser) {
    return {
      publication: writable({
        type: "loading",
        items: [],
        tags: [],
        keywords: [],
        replies: []
      }),
      chapter: writable({ type: "Loading", contents: "", stylesheets: [] }),
      contents: writable({ type: "loading", children: [] }),
      notes: writable([]),
      visible: writable(),
      positionedNotes: writable([]),
      chapterId: writable(),
      errors: writable()
    };
  }
  const url = derived(page, $page => {
    console.log($page.params);
    if ($page.params.publicationId) {
      return `/api/publication/${$page.params.publicationId}/`;
    } else {
      return `/api/publication/placeholder/`;
    }
  });
  const publicationData = web(url, {
    refreshInterval: 25000,
    initialData: {
      type: "loading",
      items: [],
      tags: [],
      keywords: [],
      replies: []
    }
  });

  const publication = derived(publicationData, $publicationData => {
    return $publicationData.data;
  });
  const chapterId = derived(
    [page, publication],
    ([$page, $publication = {}]) => {
      if (
        !$page.params.path &&
        $page.params.publicationId &&
        $publication.readingOrder &&
        $publication.readingOrder[0]
      ) {
        return $publication.readingOrder[0].url;
      } else if ($page.params.path && $page.params.publicationId) {
        return $page.params.path.join("/");
      } else {
        return "";
      }
    },
    null
  );

  const chapterURL = derived(
    [chapterId, publication],
    ([$chapterId, $publication]) => {
      if (!$publication || !$publication.json || !$publication.json.storageId)
        return null;
      const storageId = $publication.json.storageId;
      return `/api/read/${$publication.shortId}/${storageId}/${$chapterId}`;
    },
    null
  );

  const chapterData = web(chapterURL, {
    initialData: { type: "Loading", contents: "", stylesheets: [] }
  });
  const chapter = derived(
    chapterData,
    ($chapterData = {}) => {
      return (
        $chapterData.data || { type: "Loading", contents: "", stylesheets: [] }
      );
    },
    { type: "Loading", contents: "", stylesheets: [] }
  );

  const contents = derived(
    chapter,
    ($chapter, set) => {
      console.log("contents: ", $chapter.toc)
      if ($chapter) {
        return $chapter.toc;
      } else {
        return { type: "loading", children: [] };
      }
    },
    { type: "loading", children: [] }
  );

  const notes = derived(
    chapter,
    ($chapter, set) => {
      console.log("annotations: ", $chapter.annotations)
      if ($chapter && $chapter.annotations) {
        return $chapter.annotations;
      } else {
        return [];
      }
    },
    []
  );

  const errors = derived(
    [publicationData, chapterData],
    ([$publicationData, $chapterData]) => {
      if ($publicationData.error) {
        console.error($publicationData.error);
        return $publicationData.error;
      } else if ($chapterData.error) {
        console.error($chapterData.error);
        return $chapterData.error;
      } else {
        return null;
      }
    },
    null
  );
  const watched = nodes("[data-annotation-id]");
  const visible = intersecting(watched, {
    rootMargin: "40px 0px 0px 0px",
    threshold: 0.1
  });
  const positioned = positions(watched, {
    rootMargin: "0px 0px 1500px 0px",
    threshold: 0.1
  });
  const placed = annotations(positioned);
  const positionedNotes = placedNotes(placed, notes);
  console.log(notes, contents)
  stores = {
    publication,
    chapter,
    contents,
    notes,
    visible,
    positionedNotes,
    chapterId,
    errors
  };
  return stores;
}
