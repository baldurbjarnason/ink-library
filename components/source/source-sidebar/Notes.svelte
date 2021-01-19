<script>
  import NotesItem from './NotesItem.svelte'
  export let sourceNotes
  export let contents
</script>

<style>
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<!-- markup (zero or more items) goes here -->
<nav aria-labelledby="bookmarks-heading">
  <h2 id="bookmarks-heading">{contents.heading || 'Bookmarks'}</h2>
<ol>
  {#each sourceNotes.items as item}
    <NotesItem {item} />
  {:else}
     <li>
       No bookmarks
     </li>
  {/each}
</ol>
</nav>