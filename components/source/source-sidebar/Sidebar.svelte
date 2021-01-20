<script>
  import ToC from './ToC.svelte'
  import Notes from './Notes.svelte'
  export let sidebar
  export let contents
  export let path
  export let media
  export let sourceNotes
</script>

<style>
  /* your styles go here */
</style>

{#if !$sidebar.hidden}
{#if $sidebar.tab === "toc"}
  <ToC {contents} {path} {media} />
{:else if $sidebar.tab === "bookmarks"}
  <Notes {sourceNotes} />
{:else}
  <div></div>
{/if}
{/if}