<script>
  import NotesCard from "./MarginNotesCard.svelte";
  import {intersections, topmost} from "../../../../state/nodes.ts"
  import {chapter$, source$} from "../../../../state/state.ts"
  // import SidebarNoteModal from "./MarginNotesModal.svelte";
  // import NoteEdit from "./MarginNoteEdit.svelte";
  // import { publicationStores } from "../../../stores/utilities/publicationStores.js";
  const highlights$ = intersections("[data-annotation-id]")
  const topmost$ = topmost(highlights$, (entry) => {
    return entry.element.dataset.annotationId
  })
  function getAnnotation (id) {
    return $chapter$.annotations.find((annotation) => annotation.id === id)
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

{#if $topmost$}
  <div class="Root">
    {#if $topmost$}
      {#each Array.from($topmost$) as entry}
        <div
          style="top: {entry.top - 113}px; left: 0;right: 0;"
          data-sidenote-id={entry.element.dataset.annotationId}>
          <NotesCard note={$chapter$ ? getAnnotation(entry.element.dataset.annotationId) : {}} source={$source$} />
        </div>
      {/each}
    {/if}
    <!-- <div class="Modals">
      {#if pubStores.$notes}
        {#each pubStores.$notes as note}
          <SidebarNoteModal id={note.shortId}>
            <NoteEdit {note} dialog={true} stores={pubStores} />
          </SidebarNoteModal>
        {/each}
      {/if}
    </div> -->
  </div>
{/if}
