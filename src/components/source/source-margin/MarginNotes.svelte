<script>
  import NotesCard from "../source-highlight/HighlightMarginBox.svelte";
  import { intersections, topmost } from "../../../../state/nodes";
  import { chapter$, source$, chapterNotes$ } from "../../../../state/state";
  import HighlightToolbar from "../source-highlight/toolbar/Toolbar.svelte";
  import Bookmarks from "./Bookmarks.svelte";
  export let root;
  export let bookmarks;
  // import { publicationStores } from "../../../stores/utilities/publicationStores.js";
  const highlights$ = intersections("[data-annotation-id]");
  const topmost$ = topmost(highlights$, (entry) => {
    return entry.element.dataset.annotationId;
  });
  let annotations;
  $: if ($chapterNotes$) {
    const notes = {};
    for (const annotation of $chapterNotes$) {
      notes[annotation.id] = annotation;
    }
    annotations = notes;
  } else {
    annotations = {};
  }
</script>

<style>
  [data-sidenote-id] {
    position: absolute;
    top: -100%;
    right: -100%;
  }
  .Root {
    position: relative;
  }
</style>

<div class="Root">
  <Bookmarks {bookmarks} {root} />
  {#if root}
    <HighlightToolbar {root} />
    {#if $topmost$}
      {#each Array.from($topmost$) as entry, index}
        <div
          style="top: {entry.top - 113}px; left: 0;right: 0;"
          data-sidenote-id={entry.element.dataset.annotationId}>
          <NotesCard
            element={entry.element}
            note={annotations[entry.element.dataset.annotationId]}
            source={$source$}
            {annotations} />
        </div>
      {/each}
    {/if}
  {/if}
</div>
