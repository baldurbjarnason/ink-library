<script lang="ts">
    export let source;
    import NotesCard from "../../notes/NotesCard.svelte"
    import EmptySourceNewNote from "./EmptySourceNewNote.svelte"
  </script>
  
  <style>
    .EmptySourceNotes {
      position: relative;
      display: grid;
      padding: calc(var(--base) * 2);
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: var(--base);
      z-index: 0;
      grid-auto-rows: max-content;
    }
  </style>
  
<div class="EmptySourceNotes">
  <EmptySourceNewNote ntbkClose={true} {source} />
  {#each source.replies as note }
     <NotesCard {note} selecting={false} selectAll={false} />
  {/each}
</div>
  