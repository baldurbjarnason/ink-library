<script>
  import NotesCard from "../source-highlight/HighlightMarginBox.svelte";
  import { intersections, topmost } from "../../../../state/nodes";
  import { chapter$, source$, positionedNotes$ } from "../../../../state/state";
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
  $: if ($positionedNotes$) {
    const notes = {};
    for (const entry of $positionedNotes$) {
      notes[entry.annotation.id] = entry.annotation;
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
  .Note[aria-hidden] {
    display: block;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
  }
</style>

<div class="Root">
  <Bookmarks {bookmarks} {root} />
  {#if root}
    <HighlightToolbar {root} />
    {#if $positionedNotes$}
      {#each $positionedNotes$ as entry, index (entry.id)}
        <div
          style="top: {entry.note.top ? entry.note.top - 113 : 0}px; left:
          0;right: 0;"
          data-sidenote-id={entry.annotation.id}
          aria-hidden={entry.note.top ? null : true}
          class="Note">
          <NotesCard
            element={entry.entry.element}
            note={entry.annotation}
            source={$source$}
            {annotations} />
        </div>
      {/each}
    {/if}
  {/if}
</div>
