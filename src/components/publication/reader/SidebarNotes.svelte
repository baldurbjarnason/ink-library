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
    publicationNotes,
    placedNotes
  } from "../../../stores";
  import NotesCard from '../../notes/NotesCard.svelte'
  import {guard} from "../../../stores/utilities/ssr-guard.js"
  import { dialog } from "../../notes/NoteEditDialog.svelte";
  function handleClick(event) {
    if (event.target.closest("[data-sidenote-id]")) {
      const target = event.target.closest("[data-sidenote-id]")
      const refabEvent = Object.assign({},event, {
        currentTarget: target,
        annotationId: target.dataset.sidenoteId
      });
      event.preventDefault();
      dialog.show(refabEvent);
    }
  }
  const watched = guard(nodes)("[data-annotation-id]")
  const visible = guard(intersecting)(watched, {rootMargin: "40px 0px 0px 0px", threshold: 0.1})
  const positioned = guard(positions)(watched, {rootMargin: "0px 0px 1500px 0px", threshold: 0.1})
  const placed = guard(annotations)(positioned)
  const positionedNotes = guard(placedNotes)(placed, publicationNotes)
  // console.log($positionedNotes)
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
<div class="Root" on:click={handleClick}>
  {#if $positioned}
    {#each $positionedNotes as position}
      <div style="top: {position.top - 113}px; left: 0;right: 0;" data-sidenote-id="{position.id}">
      <NotesCard note={position.note} />
      </div>
    {/each}
  {/if}
</div>