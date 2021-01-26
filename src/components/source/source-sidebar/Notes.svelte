<script>
  import NotesItem from './NotesItem.svelte'
  export let sourceNotes
</script>

<style>
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }
  nav {
    padding: 0 1rem;
  }
  .Notes {
    padding: 0 1rem;
    position: sticky;
    top: 3rem;
    max-height: calc(100vh - 3rem);
    overflow-y: auto;
  }
</style>

<!-- markup (zero or more items) goes here -->
<nav aria-labelledby="bookmarks-heading" class="Notes">
  <h2 id="bookmarks-heading" data-ink-private>Bookmarks</h2>
<ol>
  {#each sourceNotes as item}
    <NotesItem {item} />
  {:else}
     <li>
       No bookmarks
     </li>
  {/each}
</ol>
</nav>