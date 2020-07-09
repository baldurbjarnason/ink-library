<script>
  import {publication, workspaces, page, chapter} from '../../../stores'
  import ToC from '../ToC.svelte'
  export let readerBody = null
</script>

<style>
.Reader {
  background-color: var(--reader-main-background);
  display: grid;
  grid-template-columns: 0.4fr 1fr 0.2fr;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
:global(ink-html) {
  height: 100%;
  background-color: white;
  border: 1px solid #DDDDDD;
  display: block;
}
:global(ink-body) {
  padding: 2rem;
  display: block;
}
</style>
<svelte:head>
{#if $chapter.stylesheets.length !== 0}
  {#each $chapter.stylesheets as stylesheet}
     <link rel="stylesheet" href="{stylesheet}">
  {/each}
{/if}
</svelte:head>

<div class="Reader">
  <div class="LeftSidebar"><ToC /></div>
  <div class="Body" bind:this={readerBody}>{@html $chapter.contents}</div>
  <div class="RightSidebar"></div>
</div>