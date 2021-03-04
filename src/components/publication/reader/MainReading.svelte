<script>
  import { publicationStores } from "../../../stores/utilities/publicationStores.js";
  import ToC from "../ToC.svelte";
  import SidebarNotes from "./SidebarNotes.svelte";
  import { stores } from "@sapper/app";
  const { page } = stores();
  export let readerBody = null;
  export let hidden = false;
  const { chapter } = publicationStores(page);
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
    display: block;
  }
  .Chapter :global(#ink-engine ink-body) {
    display: block;
    padding: 2rem;
    background-color: white;
    border: 1px solid #dddddd;
  }
  .Chapter :global(ink-body#pdf-body) {
    background-color: var(--light);
    border-color: var(--light);
    padding: 0;
  }
  /* .Chapter :global(ink-body#pdf-body ink-page) {
    box-shadow: 2px 2px 8px black;
  } */
  .Chapter :global(ink-body#pdf-body ink-page svg) {
    background-color: white;
    border: 1px solid #dddddd;
    display: block;
    max-height: inherit;
  }
  .Chapter :global(ink-body#pdf-body h1),
  .Chapter :global(ink-body#pdf-body ink-page h2) {
    border: 0;
    clip: rect(0 0 0 0);
    height: auto;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    white-space: nowrap;
  }
  .Chapter :global(mark.Colour),
  .Chapter :global(rect.Colour) {
    background-color: var(--highlight-color1);
    fill: #ffff9866;
  }
  .Chapter :global(mark.Colour1),
  .Chapter :global(rect.Colour1) {
    background-color: var(--highlight-color1);
    fill: #fea95b66;
  }
  .Chapter :global(mark.Colour2),
  .Chapter :global(rect.Colour2) {
    background-color: var(--highlight-color2);
    fill: #ff8ebe66;
  }
  .Chapter :global(mark.Colour3),
  .Chapter :global(rect.Colour3) {
    background-color: var(--highlight-color3);
    fill: #ff8ebe66;
  }
  .Chapter :global(mark.Colour4),
  .Chapter :global(rect.Colour4) {
    background-color: var(--highlight-color4);
    fill: #6fe1fa66;
  }
</style>

<svelte:head>
  {#if $chapter.stylesheets && $chapter.stylesheets.length !== 0}
    {#each $chapter.stylesheets as stylesheet}
      <link rel="stylesheet" href={stylesheet} />
    {/each}
  {/if}
</svelte:head>

<div class="Reader" {hidden}>
  <div class="LeftSidebar">
    <ToC />
  </div>
  <div class="Body Chapter" id="reader-body" bind:this={readerBody}>
    {#if $chapter}
      {@html $chapter.contents}
    {/if}
  </div>
  <SidebarNotes />
</div>
