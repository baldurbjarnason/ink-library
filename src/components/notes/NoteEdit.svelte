<script>
  import IcoGoBack from "../img/IcoGoBack.svelte";
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
    height: 100vh;
    padding: 20px 20px 20px 0;
    font-size: var(--item-font-size);
    display: grid;
    grid-template-rows: 50px 25px 1fr;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1),
      box-shadow 250ms cubic-bezier(0.075, 0.82, 0.165, 1),
      transform 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .title {
    font-size: var(--item-font-size);
    font-weight: 600;
    padding: calc(var(--base) * 0.5) 0;
    display: flex;
    flex-direction: column;
    display: none;
  }
  .Top,
  .CardBottom {
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  .Top {
    justify-content: space-between;
    background-color: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  .CardBottom {
    justify-content: start;
    background: #f6f6f6;
    border-top: 1px solid #eeeeee;
  }
  .CardMain {
    padding: 20px;
    display: grid;
    grid-gap: 10px;
    background: #fff;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    grid-template-rows: 25px 1fr;
  }
  .CardMain.Highlighted {
    grid-template-rows: 0.5fr 25px 1fr;
  }
  .CardMain :global(.Editor .ql-editor) {
    padding: 20px;
    background: var(--main-background-color);
    height: 100%;
    border-radius: 10px;
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
  .breadcrumbs h5 {
    float: left;
    margin: 0;
    color: #888888;
    font-size: 0.75rem;
    line-height: 14px;
    font-weight: 500;
  }
  @media (max-width: 720px) {
    .Item {
      height: calc(100vh - 60px);
      padding: 20px;
    }
  }
</style>

{#if note.type !== 'loading'}
  <div class="Item">
    <div class="Top">
      <a href="/notes/all/all" class="breadcrumbs">
        <IcoGoBack />
        <h5>Notes Library</h5>
      </a>
      <!--
      <span class="Icon" />
      <span class="title" id="note-edit-title">{title}</span>-->
      <Button click={save}>Save</Button>
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
    <div class="CardMain {highlight ? 'Highlighted' : ''}">
      {#if highlight}
        <Highlight body={highlight} edit={true} />
      {/if}
      {#if comment}
        <NoteEditor html={comment.content || ''} bind:richtext={text} />
      {/if}
    </div>
  </div>
{/if}
