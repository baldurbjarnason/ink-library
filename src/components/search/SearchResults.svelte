<script>
  import {searchResults} from "../../stores"
  import NotesCard from "../notes/NotesCard.svelte"
</script>
  
  <style>

  </style>
  
<div>
    {#if $searchResults.notes}
        {#each $searchResults.notes.items as note}
            <NotesCard {note} />
            <br/>
        {/each}
    {/if}
</div>
  