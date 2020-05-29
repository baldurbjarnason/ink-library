<script>
  import {publication, workspaces, page, chapter} from '../../../stores'
  import ToC from '../ToC.svelte'
  $: console.dir($chapter)
</script>

<style>
.Reader {
  background-color: var(--reader-main-background);
  display: grid;
  grid-template-columns: 0.3fr 1fr 0.3fr;
  padding-top: 2rem;
  padding-bottom: 2rem;
}
:global(ink-html) {
  height: 100%;
  background-color: white;
  border: 1px solid #DDDDDD;
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
  <div class="Body">{@html $chapter.contents}</div>
  <div class="RightSidebar"></div>
</div>