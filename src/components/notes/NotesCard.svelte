<script>
  import Comment from "./Comment.svelte";
  import Highlight from "./Highlight.svelte";
  import { page } from "../../stores";
  export let note = {};
  let title;
  $: if (note.source) {
    title = note.source.name;
  } else {
    title = `Workspace: ${$page.params.workspace}`;
  }
  let noteBody = [];
  $: if (note && note.body && note.body[0]) {
    if (note.body.find(item => item.motivation === "commenting")) {
      noteBody = [].concat(note.body);
    } else {
      noteBody = note.body.concat({ motivation: "commenting", content: "" });
    }
  }
  $: console.log(note)
</script>

<style>
  /* your styles go here */
  .Item {
    background: #fff;
    border: 1px solid #d3eacc;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .title {
    /*
    font-size: var(--item-font-size);
    font-weight: 600;
    padding: calc(var(--base) * 0.5) 0;
    display: flex;
    flex-direction: column;*/
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: none;
  }
  .Top,
  .CardBottom {
    float: left;
    width: 100%;
  }
  .Top {
    padding: 15px 15px 25px;
  }
  .CardMain {
    float: left;
    width: 100%;
  }
  .CardBottom {
    background: #f8fcf8;
    border-top: 1px solid #eaf5e6;
    color: #589b4c;
    padding: 10px 15px;
  }
  .Modified {
    float: right;
    font-size: 0.7rem;
    line-height: 0.7rem;
  }
  .Circle {
  }
  .Item :global(p) {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    white-space: inherit;
    font-weight: 600;
    font-size: 0.65rem;
    margin: 0;
    max-height: 72px;
    display: -webkit-box;
  }
  .Selected {
  }
  .Icon,
  .title {
  }
  .Icon {
  }
  .Icon svg {
    float: left;
    height: 12px;
  }

  @media (min-width: 940px) and (max-width: 1419px) {
    .indexNotes .Item:nth-child(-n + 4) {
      opacity: 0.1;
    }
  }
</style>

<div class="Item" class:Selected={note.selected}>
  <a class="title" href="/notes/all/all/{note.shortId}" />
  <!--
  <div class="Top">
    <span class="Icon" />
    <a
      class="source-title"
      href="/notes/{$page.params.workspace}/{$page.params.collection}/{note.shortId}">
      {title}
    </a>
    <span>&nbsp;</span>
  </div>-->
  <div class="CardMain">
    {#each noteBody as body}
      {#if body.motivation === 'highlighting'}
        <Highlight {body} />
      {:else}
        <Comment {body} />
      {/if}
    {/each}
  </div>
  <div class="CardBottom">
    <span />
    <span class="Modified">
      <strong>Modified:</strong>
      {new Date(note.updated).toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })}
    </span>
  </div>
</div>
