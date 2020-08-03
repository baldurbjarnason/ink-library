<script>
  import { notes, refreshNotes, page } from "../../stores";
  import Comment from "./Comment.svelte";
  import Highlight from "./Highlight.svelte";
  import NoteEditor from "../widgets/NoteEditor.svelte";
  import { getToken } from "../../getToken";
  import Button from "../widgets/Button.svelte";
  export let note = { body: [], source: { name: "" } };
  let highlight;
  let comment;
  $: if (note && note.body && note.body.find) {
    highlight = note.body.find(item => item.motivation === "highlighting");
    comment = note.body.find(item => item.motivation === "commenting") || {
      motivation: "commenting",
      content: ""
    };
  }
  let title;
  $: if (note && note.source && note.source.name) {
    title = note.source.name;
  } else {
    title = "";
  }
  let text = "";
  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }
  async function save() {
    try {
      const payload = Object.assign({}, note);
      if (payload.body.find(body => body.motivation === "commenting")) {
        const body = payload.body.find(
          body => body.motivation === "commenting"
        );
        body.content = text;
        clean(body);
      } else {
        payload.body = payload.body.concat({
          motivation: "commenting",
          content: text
        });
      }
      await fetch(`/api/note/${note.shortId}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "csrf-token": getToken()
        }
      });
      $refreshNotes = Date.now();
    } catch (err) {
      console.error(err);
    }
  }
</script>

<style>
  /* your styles go here */
  .Item {
    min-height: calc(var(--base) * 4);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    font-size: var(--item-font-size);
    font-weight: 600;
    padding: calc(var(--base) * 0.5) 0;
    display: flex;
    flex-direction: column;
  }
  .Top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 0.5px solid var(--light);
    padding: calc(var(--base) * 0.5);
    align-items: center;
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
    grid-gap: calc(var(--base) * 0.5);
    flex: 1 1 auto;
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

  :global(#sapper .Item .ql-toolbar.ql-snow),
  :global(#sapper .Item .ql-container.ql-snow) {
    border: none;
  }
</style>

{#if note.type !== 'loading'}
  <div class="Item">
    <div class="Top">
      <span class="Icon" />
      <span class="title" id="note-edit-title">{title}</span>
      <Button click={save}>Save</Button>
    </div>
    <div class="CardMain">
      {#if highlight}
        <Highlight body={highlight} edit={true} />
      {/if}
      {#if comment}
        <NoteEditor html={comment.content || ''} bind:richtext={text} />
      {/if}
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
{/if}
