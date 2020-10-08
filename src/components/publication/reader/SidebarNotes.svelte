<script>
  import NotesCard from "./SidebarNotesCard.svelte";
  import { guard } from "../../../stores/utilities/ssr-guard.js";
  import SidebarNoteModal from "./SidebarNoteModal.svelte";
  import NoteEdit from "./ReaderNoteEdit.svelte";
  import { publicationStores } from "../../../stores/utilities/publicationStores.js";
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  // $: if ($positionedNotes) {
  //   console.log($positionedNotes.length)
  // }
  const pubStores = publicationStores(page);
  const notes = pubStores.notes;
  const positionedNotes = pubStores.positionedNotes;
  const chapter = pubStores.chapter;
  const publication = pubStores.publication;
  const publicationId = pubStores.publicationId;
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
    {#if $positionedNotes}
      {#each $positionedNotes as position}
        <div
          style="top: {position.top - 113}px; left: 0;right: 0;"
          data-sidenote-id={position.id}>
          <NotesCard note={position.note} stores={pubStores} />
        </div>
      {/each}
    {/if}
    <div class="Modals">
      {#if pubStores}
        {#each $notes as note}
          <SidebarNoteModal id={note.shortId}>
            <NoteEdit {note} dialog={true} stores={pubStores} />
          </SidebarNoteModal>
        {/each}
      {/if}
    </div>
  </div>
{/if}
