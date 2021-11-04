<script>
  import {searchResults} from "../../stores"
  import NotesCard from "../notes/NotesCard.svelte"
  import Card from "../workspace/Card.svelte"
  import NotebookCard from "../notebooks/NotebookCard.svelte"
</script>
  
  <style>
  .Cards {
    position: relative;
    display: grid;
    padding: calc(var(--base) * 2);
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: var(--base);
    z-index: 0;
    align-items: center;
    grid-auto-rows: max-content;
  }
  h2 {
      padding-left: 20px;
  }
  </style>
  
<div>

    {#if $searchResults && $searchResults.sources}
    <h2 id="sources">Sources</h2>
        <div class="Cards">
            {#each $searchResults.sources.items as source}
                <Card item={source} selecting={false} selectAll={false} />
            {/each}
        </div>
    {/if}

    {#if $searchResults && $searchResults.notes}
    <h2 id="notes">Notes</h2>
        <div class="Cards">
            {#each $searchResults.notes.items as note}
                <NotesCard {note} selecting={false} selectAll={false} />
            {/each}
        </div>
    {/if}


    {#if $searchResults && $searchResults.notebooks}
    <h2 id="notebooks">Notebooks</h2>
        <div class="Cards">
            {#each $searchResults.notebooks.items as notebook}
                <NotebookCard {notebook} selecting={false} selectAll={false} />
            {/each}
        </div>
    {/if}
</div>
  