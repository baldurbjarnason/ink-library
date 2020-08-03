<script>
  import IcoGoBack from "../img/IcoGoBack.svelte";
  import { notes, refreshNotes, page, tags } from "../../stores";
  import Comment from "./Comment.svelte";
  import Highlight from "./Highlight.svelte";
  import NoteEditor from "../widgets/NoteEditor.svelte";
  import { getToken } from "../../getToken";
  import Button from "../widgets/Button.svelte";
  export let note = { body: [], source: { name: "" } };
  export let dialog = false
  let colour = "Colour1"
  let highlight;
  let comment;
  $: if (note && note.tags && note.tags.find(tag => tag.name.startsWith('colour'))) {
    colour = note.tags.find(tag => tag.name.startsWith('colour')).name.replace(' ', '').replace('c', 'C')
  }
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
    // Get all tags, filter through them to match name of adding tags, add ids as prop
    try {
      const payload = Object.assign({}, note);
      payload._tags = $tags.getIds([colour.replace('Colour', 'colour ')])
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
    grid-template-rows: 50px 50px 1fr 25px;
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
    background: transparent;
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
  .CardColors {
    background: #fff;
  }
  .CardColors div {
    max-width: 300px;
    margin: 0 auto;
  }
  @supports(--webkit-appearance: none) {
    .CardColors input[type="radio"] {
      -webkit-appearance: none;
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
      border: none;
      padding: 0;
      margin-right: .5rem;
    }
    .CardColors input[type="radio"]:checked {
      position: relative;
      /* Do a bug fix to keep iOS from adding dark background. */
      background: none;
    }
    .CardColors input[type="radio"]:checked::after {
      position: absolute;

      top: .4rem;
      left: .4rem;
      width: .6rem;
      height: .6rem;

      background: #0c4364;
      border-radius: 50%;
      content: "";
    }
    .CardColors input[type="radio"].Colour1, .CardColors input[type="radio"].Colour1:checked {
      background-color: var(--highlight-color1);
    }
    .CardColors input[type="radio"].Colour2, .CardColors input[type="radio"].Colour2:checked {
      background-color: var(--highlight-color2);
    }
    .CardColors input[type="radio"].Colour3, .CardColors input[type="radio"].Colour3:checked {
      background-color: var(--highlight-color3);
    }
    .CardColors input[type="radio"].Colour4, .CardColors input[type="radio"].Colour4:checked {
      background-color: var(--highlight-color4);
    }
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
  .dialog {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
</style>

{#if note.type !== 'loading'}
  <div class="Item">
    <div class="Top">
    {#if !dialog}
      <a href="/notes/all/all" class="breadcrumbs">
        <IcoGoBack />
        <h5>Notes Library</h5>
      </a>
    {/if}
      <!--
      <span class="Icon" />
      <span class="title" id="note-edit-title">{title}</span>-->
      <span class:dialog>
      <Button click={save}>Save</Button>
      </span>
    </div>
    <div class="CardColors">
      <div>
        <label><input type="radio" name="colour" bind:group={colour} class="Colour1" value="Colour1"><div class="visually-hidden">
          Colour1
        </div></label>
        <label><input type="radio" name="colour" bind:group={colour} class="Colour2" value="Colour2"><div class="visually-hidden">
          Colour2
        </div></label>
        <label><input type="radio" name="colour" bind:group={colour} class="Colour3" value="Colour3"><div class="visually-hidden">
          Colour3
        </div></label>
        <label><input type="radio" name="colour" bind:group={colour} class="Colour4" value="Colour4"><div class="visually-hidden">
          Colour4
        </div></label>
      </div>
    </div>
    <div class="CardMain {highlight ? 'Highlighted' : ''}">
      {#if highlight}
        <Highlight body={highlight} edit={true} {colour} />
      {/if}
      {#if comment}
        <NoteEditor html={comment.content || ''} bind:richtext={text} />
      {/if}
    </div>
    {#if !dialog}
      <div class="CardBottom">
        <span />
        <span class="Modified">
        {#if note && note.updated}
          <strong>Modified:</strong>
          {new Date(note.updated).toLocaleString(undefined, {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
          })}
        {/if}
        </span>
      </div>
    {/if}
  </div>
{/if}
