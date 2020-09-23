<script>
  import {
    publication,
    workspaces,
    page,
    chapterId,
    storedPub,
    chapter,
    nodes,
    intersecting,
    positions,
    annotations,
    placedNotes,
    chapterNotes
  } from "../../../stores";
  import NotesCard from './SidebarNotesCard.svelte'
  import {guard} from "../../../stores/utilities/ssr-guard.js"
  import SidebarNoteModal from "./SidebarNoteModal.svelte";
  import NoteEdit from "./ReaderNoteEdit.svelte";
  let watched
  let visible
  let positioned
  let placed
  let positionedNotes
  $: if ($chapterNotes.length !== 0) {
    watched = guard(nodes)("[data-annotation-id]")
    visible = guard(intersecting)(watched, {rootMargin: "40px 0px 0px 0px", threshold: 0.1})
    positioned = guard(positions)(watched, {rootMargin: "0px 0px 1500px 0px", threshold: 0.1})
    placed = guard(annotations)(positioned)
    positionedNotes = guard(placedNotes)(placed, chapterNotes)
  }
  // $: if ($positionedNotes) {
  //   console.log($positionedNotes.length)
  // }
</script>

<style>
  [data-sidenote-id] {
    position: absolute;
    top: -100%;
    right: -100%;
  }
  .Root {
    position: relative
  }
</style>
<div class="Root">
  {#if $positioned}
    {#each $positionedNotes as position}
      <div style="top: {position.top - 113}px; left: 0;right: 0;" data-sidenote-id="{position.id}">
      <NotesCard note={position.note} />
      </div>
    {/each}
  {/if}
  <div class="Modals">
  {#each $chapterNotes as note}
     <SidebarNoteModal id={note.shortId}>
      <NoteEdit {note} dialog={true} />
     </SidebarNoteModal>
  {/each}
  </div>
</div>