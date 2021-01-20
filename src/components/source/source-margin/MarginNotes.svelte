<script>
  import NotesCard from "./SidebarNotesCard.svelte";
  import SidebarNoteModal from "./SidebarNoteModal.svelte";
  import NoteEdit from "./ReaderNoteEdit.svelte";
  import { publicationStores } from "../../../stores/utilities/publicationStores.js";
  import { stores } from "@sapper/app";
  const { page } = stores();
  const pubStores = publicationStores(page);
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

{#if stores}
  <div class="Root">
    {#if pubStores.$positionedNotes}
      {#each pubStores.$positionedNotes as position}
        <div
          style="top: {position.top - 113}px; left: 0;right: 0;"
          data-sidenote-id={position.id}>
          <NotesCard note={position.note} stores={pubStores} />
        </div>
      {/each}
    {/if}
    <div class="Modals">
      {#if pubStores.$notes}
        {#each pubStores.$notes as note}
          <SidebarNoteModal id={note.shortId}>
            <NoteEdit {note} dialog={true} stores={pubStores} />
          </SidebarNoteModal>
        {/each}
      {/if}
    </div>
  </div>
{/if}
