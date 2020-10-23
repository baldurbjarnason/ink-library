<script>
  // This needs a reference to the fg-modal element
  import { onMount } from "svelte";
  import FlagFurtherRead from "../../img/FlagFurtherRead.svelte";
  import FlagIdea from "../../img/FlagIdea.svelte";
  import FlagImportant from "../../img/FlagImportant.svelte";
  import FlagImpTerm from "../../img/FlagImpTerm.svelte";
  import FlagQuestion from "../../img/FlagQuestion.svelte";
  import FlagReference from "../../img/FlagReference.svelte";
  import FlagRevisit from "../../img/FlagRevisit.svelte";
  import FlagToDo from "../../img/FlagToDo.svelte";
  import FlagUrgent from "../../img/FlagUrgent.svelte";
  import NavSource from "../../img/NavSource.svelte";

  import IcoGoBack from "../../img/IcoGoBack.svelte";
  import { tags } from "../../../stores";
  import Comment from "../../notes/Comment.svelte";
  import Highlight from "../../notes/Highlight.svelte";
  import NoteEditor from "../../widgets/NoteEditor.svelte";
  import { getToken } from "../../../getToken";
  import Button from "../../widgets/Button.svelte";
  import { cachedWeb } from "../../../stores/utilities/web.js";
  import { refresh } from "../../../stores/utilities/refresh.js";
  import { guard } from "../../../stores/utilities/ssr-guard.js";
  import { noteStore } from "../../../stores/utilities/noteStore.js";
  export let note = { body: [], source: { name: "" } };
  export let stores = {};
  let title = "";
  $: if (stores.$publication) {
    title = stores.$publication.name;
  }
  let noteBody = [];
  let store;
  $: if (note && note.shortId && !store) {
    store = noteStore(note);
  }
  let selectedFlags;
  let comment, highlighted, flags, colours, annotation;
  $: if (store) {
    comment = store.noted;
    highlighted = store.highlighted;
    flags = store.flags;
    colours = store.colours;
    annotation = store.annotation;
  }
  $: if ($flags && !selectedFlags) {
    selectedFlags = $flags.map(flag => flag.name);
  }
  let highlight;
  let colour;
  $: if ($colours && !colour) {
    colour = $colours
      .find(tag => tag.name.startsWith("colour"))
      .name.replace(" ", "");
  }

  let availableColours;
  $: availableColours = $tags.items
    .filter(tag => tag.type == "flag" && tag.name.startsWith("colour"))
    .map(tag => tag.name.replace(" ", ""));

  let availableFlags = [];
  $: if ($tags && $tags.items.length !== 0) {
    availableFlags = $tags.items.filter(
      tag => tag.type === "flag" && !tag.name.startsWith("colour")
    );
  }
  let text = "";
  function clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }
  function updateHighlight(id, colour) {
    console.log(colour);
    document.querySelectorAll(`[data-annotation-id="${id}"]`).forEach(node => {
      node.classList.forEach(token => {
        if (token.startsWith("Colour")) {
          node.classList.remove(token);
        }
      });
      node.classList.add(colour);
    });
    document
      .querySelectorAll(`[data-annotation-highlight-box="${id}"]`)
      .forEach(node => {
        node.classList.forEach(token => {
          if (token.startsWith("Colour")) {
            node.classList.remove(token);
          }
        });
        node.classList.add(colour);
      });
  }
  async function save() {
    // Get all tags, filter through them to match name of adding tags, add ids as prop
    if (!$annotation.document) return;
    try {
      const payload = Object.assign({}, $annotation);
      payload.tags = $tags
        .getIds([colour.replace("colour", "colour ")].concat(selectedFlags))
        .map(id => {
          return { id: id };
        });
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
      await fetch(`/api/note/${$annotation.shortId}`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "csrf-token": getToken()
        }
      });
      refresh(`/api/note/${$annotation.shortId}`);
      updateHighlight(
        $annotation.id,
        colour.replace("colour", "Colour").replace(" ", "")
      );
    } catch (err) {
      console.error(err);
    }
  }

  function assignIco(icon) {
    switch (icon) {
      case "further reading":
        return FlagFurtherRead;
      case "idea":
        return FlagIdea;
      case "important":
        return FlagImportant;
      case "important term":
        return FlagImpTerm;
      case "question":
        return FlagQuestion;
      case "reference":
        return FlagReference;
      case "revisit":
        return FlagRevisit;
      case "to do":
        return FlagToDo;
      case "urgent":
        return FlagUrgent;
    }
  }
  /*

  function clickColour(c) {
    colour = c;
  }
  let newFlags = [],
    firstClick;
  function clickFlag(f) {
    if (selectedFlags && !firstClick) {
      newFlags = selectedFlags;
      firstClick = true;
    }
    if (newFlags.find(flag => flag === f))
      newFlags.splice(newFlags.indexOf(f), 1);
    else newFlags.push(f);
  }
  let newColour;*/
</script>

<style>
  /* your styles go here */
  .Item {
    background: #ffffff;
    border-radius: 30px;
    padding: 30px;
    width: 100%;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  section {
    display: table;
    margin: 0;
  }
  .Top,
  .CardBottom {
    display: flex;
    align-items: center;
  }
  .Top {
    justify-content: space-between;
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

  .Item :global(p) {
    font-size: calc(var(--reader-font-size) * 0.85);
  }

  :global(#sapper .Item .ql-toolbar.ql-snow),
  :global(#sapper .Item .ql-container.ql-snow) {
    border: none;
  }
  /* .breadcrumbs h5 {
    float: left;
    margin: 0;
    color: #888888;
    font-size: 0.75rem;
    line-height: 14px;
    font-weight: 500;
  } */
  @media (max-width: 720px) {
    .Item {
      padding: 20px;
      width: calc(100% - 40px);
      margin-left: 20px;
    }
  }

  /* -------------- Highlight -------------- */
  header {
    display: grid;
    grid-template-columns: 8px 1fr;
    grid-gap: 16px;
  }
  header p,
  header :global(p),
  header :global(span) {
    margin: 0;
    padding: 0;
  }
  header .info {
    display: grid;
    grid-gap: 8px;
  }
  a {
    outline: none;
  }
  .Page {
    font-size: 0.7rem !important;
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
  .Highlight[href] {
    text-decoration: none;
  }
  .Source[href]:hover,
  .Highlight[href]:hover,
  .Page:hover {
    text-decoration: underline;
  }
  .Source p {
    font-size: 0.7rem;
    font-weight: 400;
    color: #333333;
  }

  header .column,
  header .Page {
    background: #999999;
  }
  .colour1 .column,
  .colour1 .Page {
    background: #fea95b;
  }
  .colour2 .column,
  .colour2 .Page {
    background: #ff8ebe;
  }
  .colour3 .column,
  .colour3 .Page {
    background: #57cfea;
  }
  .colour4 .column,
  .colour4 .Page {
    background: #81d173;
  }
  /* ------ Colours ------ */
  .colours {
    float: left;
    margin: 6px 40px 0 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 15px);
    grid-column-gap: 20px;
  }
  .colours input {
    width: 15px;
    height: 15px;
    -webkit-appearance: none;
    border-radius: 50%;
    position: relative;
    padding: 0;
    cursor: pointer;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  .colours input:checked::after {
    content: "";
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
  input.colour1 {
    background: #fea95b;
  }
  input.colour1::after {
    background: #d86801;
  }
  input.colour2 {
    background: #ff8ebe;
  }
  input.colour2::after {
    background: #c0004e;
  }
  input.colour3 {
    background: #6fe1fa;
  }
  input.colour3::after {
    background: #0693b2;
  }
  input.colour4 {
    background: #9fe793;
  }
  input.colour4::after {
    background: #589b4c;
  }
  /* ------ Editor ------ */
  .Editor {
    display: block;
    grid-column: 1/-1;
    color: #333;
  }
  :global(.ql-toolbar) {
    padding: 0 !important;
  }
  :global(.ql-toolbar *),
  :global(.ql-toolbar.ql-snow .ql-formats),
  :global(.ql-toolbar) {
    border: none !important;
    margin: 0;
  }
  .Item .Editor :global(#sapper button.ql-active) {
    background: var(--workspace-color);
  }
  .Editor :global(.ql-snow.ql-toolbar button.ql-active .ql-stroke) {
    stroke: var(--main-background-color);
  }
  .Editor :global(.ql-snow.ql-toolbar button.ql-active .ql-fill),
  .Editor :global(.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill) {
    fill: var(--main-background-color);
  }
  .Editor
    :global(.ql-snow.ql-toolbar
      button:not(.ql-active):hover
      .ql-stroke.ql-fill),
  .Editor :global(.ql-snow .ql-fill),
  .Editor :global(.ql-snow .ql-stroke.ql-fill),
  .Editor :global(.ql-snow.ql-toolbar button:not(.ql-active):hover .ql-fill) {
    fill: var(--workspace-color);
  }
  .Editor :global(.ql-snow.ql-toolbar button:not(.ql-active):hover .ql-stroke),
  .Editor :global(.ql-snow .ql-stroke) {
    stroke: var(--workspace-color);
  }
  .Editor :global(.Editor.hasFocus.svelte-27mrhh .ql-editor) {
    background-color: transparent;
  }
  .Editor :global(#sapper .ql-snow.ql-toolbar button) {
    margin-right: 10px !important;
  }
  .Editor :global(.Editor) {
    background: var(--main-background-color);
    display: grid;
    min-height: 30vh;
    border-radius: 10px 10px 0 0;
    margin-top: 20px;
  }
  .Editor.bigEditor :global(.Editor) {
    min-height: 50vh;
  }
  .Editor :global(.Editor) {
    border: 2px solid #999999 !important;
    border-bottom: 0;
  }
  .Editor.colour1 :global(.Editor) {
    border: 2px solid #fea95b !important;
    border-bottom: 0;
  }
  .Editor.colour2 :global(.Editor) {
    border: 2px solid #ff8ebe !important;
    border-bottom: 0;
  }
  .Editor.colour3 :global(.Editor) {
    border: 2px solid #6fe1fa !important;
    border-bottom: 0;
  }
  .Editor.colour4 :global(.Editor) {
    border: 2px solid #9fe793 !important;
    border-bottom: 0;
  }
  .Editor :global(.Editor p),
  .Editor :global(.Editor span) {
    background: transparent !important;
  }
  /* ------ Flags ------ */
  .flags {
    float: left;
    margin: 0;
    position: relative;
    list-style: none;
    width: 100%;
    margin-bottom: 20px;
    border-radius: 0 0 10px 10px;
    padding: 5px 0 0 5px;
  }
  .flags::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    display: block;
    top: -2px;
    left: 0;
  }
  .flags li {
    float: left;
    position: relative;
    margin: 0 5px 5px 0;
  }
  .flags p {
    margin: 0;
    font-size: 0.65rem;
    color: #888888;
    background: #ffffff;
    border-radius: 20px;
    padding: 5px 10px;
    line-height: 10px;
    text-transform: capitalize;
  }
  .flags.colour1 p,
  .flags.colour2 p,
  .flags.colour3 p,
  .flags.colour4 p {
    background: #eeeeee;
  }
  .flags :global(svg) {
    height: 10px;
    float: left;
    margin-right: 3px;
  }
  .flags input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
    opacity: 0;
  }
  .flags {
    border: 2px solid #999999;
    border-top: none;
    background: #f3f3f3;
  }
  .flags::after {
    background: #cccccc;
  }
  .flags.colour1 {
    border: 2px solid #fea95b;
    border-top: none;
    background: #fffcfa;
  }
  .flags.colour1::after {
    background: #fcf3ed;
  }
  .flags.colour2 {
    border: 2px solid #ff8ebe;
    border-top: none;
    background: #fffafd;
  }
  .flags.colour2::after {
    background: #f9eaf0;
  }
  .flags.colour3 {
    border: 2px solid #6fe1fa;
    border-top: none;
    background: #fafeff;
  }
  .flags.colour3::after {
    background: #dff2f5;
  }
  .flags.colour4 {
    border: 2px solid #9fe793;
    border-top: none;
    background: #f8fcf8;
  }
  .flags.colour4::after {
    background: #eaf5e6;
  }
  .flags input:checked ~ p {
    color: #f6f6f6;
    border: none;
    background: #999999;
  }
  .flags.colour1 input:checked ~ p {
    color: #d86801;
    border: none;
    background: #ffebda;
  }
  .flags.colour2 input:checked ~ p {
    color: #c0004e;
    border: none;
    background: #ffe4f0;
  }
  .flags.colour3 input:checked ~ p {
    color: #0693b2;
    border: none;
    background: #e2f7fa;
  }
  .flags.colour4 input:checked ~ p {
    color: #589b4c;
    border: none;
    background: #e6f8e4;
  }
</style>

{#if $annotation}
  <div class="Item">
    <div class="Top">

      <div class="CardBottom">
        <span />
        <span class="Modified">
          {#if $annotation && $annotation.updated}
            <strong>Modified:</strong>
            {new Date($annotation.updated).toLocaleString(undefined, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            })}
          {/if}
        </span>
      </div>
    </div>

    <header class={colour}>
      <div class="column" />
      <div class="info">
        {#if $annotation.document}
          <a href="library/all/all{$annotation.document}">
            <p class="Page">Page</p>
          </a>
        {/if}
        {#if $highlighted}
          <a class="Highlight" href="library/all/all{$annotation.document}">
            <Highlight body={$highlighted} edit={true} {colour} />
          </a>
        {/if}
        {#if stores.$publication}
          <a
            href="library/all/all/{stores.$publication.shortId}"
            class="Source">
            <NavSource />
            <p>{stores.$publication.name}</p>
          </a>
        {/if}
      </div>
    </header>
    <section>
      <ul class="colours">
        {#each availableColours as theColour}
          <li>
            <input
              name="noteColour"
              type="radio"
              class={theColour}
              bind:group={colour}
              value={theColour} />
          </li>
        {/each}
      </ul>
      {#if $comment.content || $comment.value}
        <div class="Editor {colour} {!highlight ? 'bigEditor' : ''}">
          <NoteEditor
            html={$comment.content || $comment.value}
            bind:richtext={text} />
        </div>
      {:else}
        <div class="Editor {colour} {!highlight ? 'bigEditor' : ''}">
          <NoteEditor html="" bind:richtext={text} />
        </div>
      {/if}
      <div class="flags {colour}">
        {#if $annotation.tags && selectedFlags}
          {#each availableFlags as flag}
            <li>
              <input
                bind:group={selectedFlags}
                type="checkbox"
                value={flag.name} />
              <p class={flag.name}>
                <svelte:component this={assignIco(flag.name)} />
                {flag.name}
              </p>
            </li>
          {/each}
        {/if}
      </div>
      <span>
        <Button click={save}>Save</Button>
      </span>
    </section>
  </div>
{/if}
