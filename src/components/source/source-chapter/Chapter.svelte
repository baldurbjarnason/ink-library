<script lang="ts">
  interface Chapter {
    resource: any;
    stylesheets?: Array<string>;
    toc?: any;
    book?: any;
    contents?: string;
  }
  import Sidebar from "../source-sidebar/Sidebar.svelte";
  import MarginNotes from "../source-margin/MarginNotes.svelte";
  import { intersections } from "../../../../state/nodes";
  import { stores } from "@sapper/app";
  const { preloading } = stores();
  let loading;
  $: loading = $preloading;
  export let chapter: Chapter = { resource: {} };
  export let path = "";
  export let media = "";
  export let sidebar;
  export let sourceNotes = { items: [] };
  export let readerBody = null;
  export let hidden = false;
  const tspans$ = intersections("tspan[data-annotation-id]");
  $: if ($tspans$) {
    for (const span of Array.from($tspans$)) {
      highlightTspan(span.element);
    }
  }
  const spans = new Map();
  function highlightTspan(span) {
    if (spans.has(span)) {
      return;
    } else {
      spans.set(span, true);
    }
    if (
      span.dataset.annotationId &&
      span.dataset.annotationId.startsWith("temporary-selection-highlight")
    )
      return;
    const parent = span.parentElement;
    const box = parent.getBBox();
    const spanBox = span.getBBox();
    const svgDocument = parent.ownerDocument;
    const rect = svgDocument.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect"
    );
    rect.dataset.annotationRenderBox = span.dataset.annotationId;
    rect.setAttributeNS(null, "x", spanBox.x);
    rect.setAttributeNS(null, "y", box.y);
    rect.setAttributeNS(null, "width", span.getComputedTextLength());
    rect.setAttributeNS(null, "height", box.height);
    rect.classList.add("Highlight");
    rect.setAttributeNS(
      null,
      "class",
      span.getAttributeNS(null, "class") || "Highlight"
    );
    parent.insertAdjacentElement("beforebegin", rect);
  }
</script>

<style>
  .Reader {
    background-color: var(--reader-main-background);
    display: grid;
    grid-template-columns: 0.4fr 1fr 0.4fr;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  .Reader.noSidebar {
    grid-template-columns: 1fr 0.4fr;
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
    width: 100%;
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
    fill: var(--highlight-color1);
  }
  .Chapter :global(mark.Colour1),
  .Chapter :global(rect.Colour1) {
    background-color: var(--highlight-color1);
    fill: var(--highlight-color1);
  }
  .Chapter :global(mark.Colour2),
  .Chapter :global(rect.Colour2) {
    background-color: var(--highlight-color2);
    fill: var(--highlight-color2);
  }
  .Chapter :global(mark.Colour3),
  .Chapter :global(rect.Colour3) {
    background-color: var(--highlight-color3);
    fill: var(--highlight-color3);
  }
  .Chapter :global(mark.Colour4),
  .Chapter :global(rect.Colour4) {
    background-color: var(--highlight-color4);
    fill: var(--highlight-color4);
  }
  .Chapter :global(rect[data-annotation-render-box]) {
    opacity: 0.4;
  }
  .Chapter :global(rect[data-annotation-highlight-box]) {
    display: none;
  }
  .Chapter {
    transition: opacity 250ms ease-in-out;
  }
  .loading {
    opacity: 0.5;
  }
  .Chapter :global(ink-body#pdf-body tspan) {
    color: transparent;
    fill: transparent;
    background-color: transparent;
  }
</style>

<svelte:head>
  {#if chapter.stylesheets && chapter.stylesheets.length !== 0}
    {#each chapter.stylesheets as stylesheet}
      <link rel="stylesheet" href={stylesheet} />
    {/each}
  {/if}
</svelte:head>

<div class="Reader" {hidden} class:noSidebar={$sidebar.hidden} class:loading>
  <div class="LeftSidebar" hidden={$sidebar.hidden}>
    <Sidebar contents={chapter.toc} {path} {sidebar} {media} {sourceNotes} />
  </div>
  <div class="Body Chapter" id="reader-body" bind:this={readerBody}>
    {#if chapter}
      {@html chapter.contents}
    {/if}
  </div>
  <MarginNotes root={readerBody} bookmarks={sourceNotes} />
</div>
