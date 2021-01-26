<script>
  import NotesCard from "./MarginNotesCard.svelte";
  import {intersections, topmost} from "../../../../state/nodes.ts"
  import {chapter$, source$} from "../../../../state/state.ts"
  import SidebarNoteModal from "./MarginNotesModal.svelte";
  import NoteEdit from "./MarginNoteEdit.svelte";
  import HighlightButton from './HighlightButton.svelte'
  import Bookmarks from "./Bookmarks.svelte"
  export let root
  export let bookmarks
  // import { publicationStores } from "../../../stores/utilities/publicationStores.js";
  const highlights$ = intersections("[data-annotation-id]")
  const topmost$ = topmost(highlights$, (entry) => {
    return entry.element.dataset.annotationId
  })
  let annotations
  $: if ($chapter$) {
    const notes = {}
    for (const annotation of $chapter$.annotations) {
      notes[annotation.id] = annotation
    }
    annotations = notes
  } else {
    annotations = {}
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
    <HighlightButton {root} />
    {#if $topmost$}
      {#each Array.from($topmost$) as entry}
        <div
          style="top: {entry.top - 113}px; left: 0;right: 0;"
          data-sidenote-id={entry.element.dataset.annotationId}>
          <NotesCard note={annotations[entry.element.dataset.annotationId]} source={$source$} />
        </div>
      {/each}
    {/if}
    <div class="Modals">
      {#if $chapter$ && $chapter$.annotations}
        {#each $chapter$.annotations as note}
          <SidebarNoteModal id={note.shortId} let:modal={modal}>
            <NoteEdit {note}  {modal} />
          </SidebarNoteModal>
        {/each}
      {/if}
    </div>
{/if}
</div>
