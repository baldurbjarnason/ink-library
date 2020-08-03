<script>
  import { publication, workspaces, page, chapter } from "../../../stores";
  import ToC from "../ToC.svelte";
  export let readerBody = null;
</script>

<style>
  .Reader {
    background-color: var(--reader-main-background);
    display: grid;
    grid-template-columns: 0.4fr 1fr 0.2fr;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  .Chapter {
    all: initial;
    position: relative;
    line-height: var(--reader-line-height);
    font-size: var(--reader-font-size);
    color: var(--reader-text-color);
    font-family: var(--reader-font-family);
    background-color: var(--main-background-color);
    line-height: var(--reader-line-height);
    display: block;
    contain: content;
    min-height: 100vh;
  }
  :global(ink-html) {
    height: 100%;
    background-color: white;
    border: 1px solid #dddddd;
    display: block;
  }
  .Chapter :global(#ink-engine ink-body) {
    display: block;
    padding: 2rem;
  }
</style>

<svelte:head>
  {#if $chapter.stylesheets.length !== 0}
    {#each $chapter.stylesheets as stylesheet}
      <link rel="stylesheet" href={stylesheet} />
    {/each}
  {/if}
</svelte:head>

<div class="Reader">
  <div class="LeftSidebar">
    <ToC />
  </div>
  <div class="Body Chapter" bind:this={readerBody}>
    {@html $chapter.contents}
  </div>
  <div class="RightSidebar" />
</div>
