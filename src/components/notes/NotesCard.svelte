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
</script>

<style>
  /* your styles go here */
  .Item {
    min-height: calc(var(--base) * 4);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2rem 1fr 2rem;
    margin: 2px;
    border-radius: 15px;
    font-size: var(--item-font-size);
    position: relative;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1),
      box-shadow 250ms cubic-bezier(0.075, 0.82, 0.165, 1),
      transform 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.05);
    background-color: #fafafa;
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
  .source-title {
    font-size: 1rem;
    font-weight: 600;
    padding: calc(var(--base) * 0.5) 0;
    display: flex;
    flex-direction: column;
    text-decoration: none;
  }
  .Top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 0.5px solid var(--light);
    padding: calc(var(--base) * 0.5);
    align-items: center;
    height: calc(var(--base) * 2);
    background-color: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .CardBottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: calc(var(--base) * 0.5);
    align-items: center;
    height: calc(var(--base) * 2);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
  .CardMain {
    padding: 0;
    margin: 0;
  }
  .Modified {
    text-align: right;
    color: #888;
    font-size: 0.75rem;
  }
  .Circle {
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    background-color: #fea95b;
  }
  .Item :global(p) {
    font-size: calc(var(--reader-font-size) * 0.85);
  }
  .Selected {
    box-shadow: 0px 0px 0px 2px rgba(200, 200, 200, 0.7),
      5px 5px 10px rgba(0, 0, 0, 0.05);
  }
</style>

<div class="Item" class:Selected={note.selected}>
  <a
    class="title"
    href="/notes/{$page.params.workspace}/{$page.params.collection}/{note.shortId}" />
  <div class="Top">
    <span class="Icon" />
    <a
      class="source-title"
      href="/notes/{$page.params.workspace}/{$page.params.collection}/{note.shortId}">
      {title}
    </a>
    <span>&nbsp;</span>
  </div>
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
