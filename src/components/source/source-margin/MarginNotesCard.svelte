<script>
  // This needs a store for the hover over highlight event.
  import {assignIco} from "./assignIco.js"
  import NavSource from "../../img/NavSource.svelte";
  import {getNoted, getHighlighted, getFlags, getColours} from './processNote.js'
  export let note = {};
  export let source
  let title;
  $: if (source) {
    title = source.name;
  }
  $: console.log(note)
  let noted, highlighted, flags, colours, annotation;
  $: if (note && note.shortId) {
    noted = getNoted(note)
    highlighted = getHighlighted(note)
    flags = getFlags(note)
    colours = getColours(note)
    annotation = note
  }

</script>

<style>
  .NoteItem * {
    margin: 0;
    font-weight: 500;
  }
  .Top {
    background: #ffffff;
    border-radius: 20px 20px 0 0;
    padding: 16px;
    display: grid;
    grid-gap: 0.5rem;
    /*grid-template-rows: auto 1fr auto;*/
    grid-template-rows: 1fr;
  }
  .Top.two {
    grid-template-rows: auto 1fr;
  }
  /* -------------- Highlight -------------- */
  header {
    display: grid;
    grid-template-columns: 4px 1fr;
    grid-gap: 8px;
  }
  header .info {
    display: grid;
    grid-gap: 4px;
  }
  a {
    outline: none;
  }
  .Page {
    font-size: 0.6rem;
    float: left;
    width: max-content;
    padding: 0 8px;
    border-radius: 5px;
    align-items: center;
    display: flex;
    color: #ffffff;
  }
  .Highlight {
    font-size: 0.75rem;
    line-height: 0.9rem;
    color: #333333;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .Source {
    display: grid;
    align-items: center;
    grid-template-columns: 10px 1fr;
    grid-gap: 5px;
  }
  .Source :global(svg) {
    width: 10px;
    height: auto;
    color: var(--workspace-color);
  }
  .Source[href],
  .Highlight[href],
  .Note[href] {
    text-decoration: none;
  }
  .Source[href]:hover,
  .Highlight[href]:hover,
  .Note[href]:hover,
  .Page:hover {
    text-decoration: underline;
  }
  .Source p {
    font-size: 0.7rem;
    font-weight: 400;
    color: #333333;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  /* -------------- Note -------------- */
  .Note {
    overflow: hidden; /*
    text-overflow: ellipsis;
    white-space: nowrap;*/
  }
  .Note :global(*),
  .Highlight :global(*) {
    font-size: 0.75rem !important;
    line-height: 0.9rem;
    margin: 0;
    color: #333333;
  }
  .empty {
    color: #888888;
    font-weight: 400;
  }
  /* -------------- Tags -------------- */
  .Tags {
    list-style: none;
    padding: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .Tags li {
    border-radius: 10px;
    display: inline-table;
    margin-right: 5px;
    padding: 2px 10px;
  }
  .Tags p {
    font-size: 0.7em;
  }
  /* -------------- Botom -------------- */
  .Bottom {
    border-radius: 0 0 20px 20px;
    padding: 6px 16px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 7px;
  }
  .Flags,
  .Bottom section {
    padding: 0;
    list-style: none;
  }
  .Flags {
    line-height: 0.8rem;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .Flags li {
    display: inline-table;
    margin-right: 7px;
  }
  .Bottom section {
    display: flex;
    justify-content: flex-end;
  }
  .Bottom p {
    font-size: 0.7rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .Flags :global(svg) {
    float: left;
    margin-right: 3px;
    height: 16px;
  }

  /* ------------ No colour ------------ */
  .NoteItem .Top {
    border: 1px solid #cccccc;
    border-bottom: none;
  }
  .NoteItem header .column {
    background: #999999;
  }
  .NoteItem .Tags li {
    background: #f6f6f6;
  }
  .NoteItem .Bottom {
    border: 1px solid #cccccc;
    border-top: 1px solid #dddddd;
    background: #f6f6f6;
  }
  .NoteItem .Tags p,
  .NoteItem .Bottom * {
    color: #999999;
  }
  /* ------------ Colour 1 ------------ */
  .colour1 .Top {
    border: 1px solid #ffe4cb;
    border-bottom: none;
  }
  .colour1 header .column {
    background: #fea95b;
  }
  .colour1 .Tags li {
    background: #ffebda;
  }
  .colour1 .Bottom {
    border: 1px solid #ffe4cb;
    border-top: 1px solid #fcf3ed;
    background: #fffcfa;
  }
  .colour1 .Tags p,
  .colour1 .Bottom * {
    color: #d86801;
  }
  /* ------------ Colour 2 ------------ */
  .colour2 .Top {
    border: 1px solid #fcd5e5;
    border-bottom: none;
  }
  .colour2 header .column {
    background: #ff8ebe;
  }
  .colour2 .Tags li {
    background: #ffe4f0;
  }
  .colour2 .Bottom {
    border: 1px solid #fcd5e5;
    border-top: 1px solid #f9eaf0;
    background: #fffafd;
  }
  .colour2 .Tags p,
  .colour2 .Bottom * {
    color: #c0004e;
  }
  /* ------------ Colour 3 ------------ */
  .colour3 .Top {
    border: 1px solid #7de8f8;
    border-bottom: none;
  }
  .colour3 header .column {
    background: #57cfea;
  }
  .colour3 .Tags li {
    background: #def8fe;
  }
  .colour3 .Bottom {
    border: 1px solid #7de8f8;
    border-top: 1px solid #dff2f5;
    background: #fafeff;
  }
  .colour3 .Tags p,
  .colour3 .Bottom * {
    color: #0693b2;
  }
  /* ------------ Colour 4 ------------ */
  .colour4 .Top {
    border: 1px solid #d3eacc;
    border-bottom: none;
  }
  .colour4 header .column {
    background: #81d173;
  }
  .colour4 .Tags li {
    background: #e6f8e4;
  }
  .colour4 .Bottom {
    border: 1px solid #d3eacc;
    border-top: 1px solid #eaf5e6;
    background: #f8fcf8;
  }
  .colour4 .Tags p,
  .colour4 .Bottom * {
    color: #589b4c;
  }
</style>

{#if annotation}

  <div
    class="NoteItem {colours ? colours[0].name.replace(' ', '') : ''}"
    class:Selected={annotation.selected}>
    <div
      class="Top {annotation.document || highlighted || annotation.sourceId ? 'two' : ''}">
      {#if annotation.document || highlighted || annotation.source}
        <header>
          <div class="column" />
          <div class="info">
            <!-- {#if note.target.source}
            <a
              href="{window.location.pathname.replace('notes', 'library')}{note.target.source}">
              <p class="Page">Page</p>
            </a>
          {/if} -->
            {#if highlighted}
              <a
                class="Highlight modal_link"
                href="#id-{annotation.shortId}"
                rel="external">
                {@html highlighted.content || highlighted.value}
              </a>
            {/if}
            {#if title}
              <a
                href="#id-{annotation.shortId}"
                class="Source modal_link"
                rel="external">
                <NavSource />
                <p>{title}</p>
              </a>
            {/if}
          </div>
        </header>
      {/if}
      <a
        class="Note modal_link"
        href="#id-{annotation.shortId}"
        rel="external">
        {#if noted}
          {@html noted.content || noted.value}
        {/if}
      </a>
      <!-- Adjust "Top" div when tags will be implemented
    <ul class="Tags">
      <li>
        <p>#tag</p>
      </li>
    </ul>-->
    </div>
    <div class="Bottom">
      <ul class="Flags">
        {#each flags as flag}
          <li>
            <svelte:component this={assignIco(flag.name)} />
            <p>{flag.name}</p>
          </li>
        {/each}
      </ul>
      <section>
        <p>
          <strong>Modified:</strong>
          {new Date(annotation.updated).toLocaleString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          })}
        </p>
      </section>
    </div>
  </div>
{/if}
