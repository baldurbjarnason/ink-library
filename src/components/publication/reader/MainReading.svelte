<script>
  import { publication, workspaces, page, chapter } from "../../../stores";
  import ToC from "../ToC.svelte";
  import SidebarNotes from "./SidebarNotes.svelte"
  export let readerBody = null;
  export let hidden = false;
</script>

<style>
  .Reader {
    background-color: var(--reader-main-background);
    display: grid;
    grid-template-columns: 0.4fr 1fr 0.4fr;
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
  .Chapter :global(.Colour) {
    background-color: var(--highlight-color1);
  }
  .Chapter :global(.Colour2) {
    background-color: var(--highlight-color2);
  }
  .Chapter :global(.Colour3) {
    background-color: var(--highlight-color3);
  }
  .Chapter :global(.Colour4) {
    background-color: var(--highlight-color4);
  }
</style>

<svelte:head>
  {#if $chapter.stylesheets.length !== 0}
    {#each $chapter.stylesheets as stylesheet}
      <link rel="stylesheet" href={stylesheet} />
    {/each}
  {/if}
</svelte:head>

<div class="Reader" hidden={hidden}>
  <div class="LeftSidebar">
    <ToC />
  </div>
  <div class="Body Chapter" id="reader-body" bind:this={readerBody}>
    {@html $chapter.contents}
  </div>
  <SidebarNotes />
</div>
