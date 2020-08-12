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
    publicationNotes
  } from "../../../stores";
  import NotesCard from '../../notes/NotesCard.svelte'
  import {guard} from "../../../stores/utilities/ssr-guard.js"
  const watched = guard(nodes)("[data-annotation-id]")
  const visible = guard(intersecting)(watched, {rootMargin: "40px 0px 0px 0px", threshold: 0.1})
  const positioned = guard(positions)(watched, {rootMargin: "0px 0px 1500px 0px", threshold: 0.1})
  const placed = guard(annotations)(positioned)
  function getNote (id) {
    if ($publicationNotes) {
      return $publicationNotes.find(note => note.id === id)
    } else {
      return {}
    }
  }
</script>

<style>
  div {
    position: absolute;
    top: -100%;
    right: -100%;
  }
</style>
{#if $positioned}
  {#each $placed as position}
    <div style="top: {position.top - 113}px; left: 0;right: 0;">
    <NotesCard note={getNote(position.id)} />
    </div>
  {/each}
{/if}