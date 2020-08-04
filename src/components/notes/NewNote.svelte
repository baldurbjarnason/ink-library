<script>
  import FlagFurtherRead from "../img/FlagFurtherRead.svelte";
  import FlagIdea from "../img/FlagIdea.svelte";
  import FlagImportant from "../img/FlagImportant.svelte";
  import FlagImpTerm from "../img/FlagImpTerm.svelte";
  import FlagQuestion from "../img/FlagQuestion.svelte";
  import FlagReference from "../img/FlagReference.svelte";
  import FlagRevisit from "../img/FlagRevisit.svelte";
  import FlagToDo from "../img/FlagToDo.svelte";
  import FlagUrgent from "../img/FlagUrgent.svelte";
  import IcoNewNote from "../img/IcoNewNote.svelte";

  import Button from "../widgets/Button.svelte";
  import Closer from "../widgets/Closer.svelte";
  import WhiteButton from "../workspace/WhiteButton.svelte";
  import { send, receive } from "../../routes/_crossfade.js";
  import { afterUpdate, tick } from "svelte";
  import NoteEditor from "../widgets/NoteEditor.svelte";
  import {
    refreshNotes,
    refreshCollections,
    collections,
    addingWorkspace,
    addedCollections,
    addedWorkspaces,
    page,
    workspaces
  } from "../../stores";
  import { getToken } from "../../getToken";
  /*
  let colours = ["orange", "pink", "blue", "green"];
  let flagsArr = [
    {
      component: FlagFurtherRead,
      string: "Further read",
      value: false
    }, 
    {
      component: FlagIdea,
      string: "Idea",
      value: false
    },
    {
      component: FlagImportant,
      string: "Important",
      value: false
    },
    {
      component: FlagImpTerm,
      string: "Important term",
      value: false
    },
    {
      component: FlagQuestion,
      string: "Question",
      value: false
    },
    {
      component: FlagReference,
      string: "Reference",
      value: false
    },
    {
      component: FlagRevisit,
      string: "Revisit",
      value: false
    },
    {
      component: FlagToDo,
      string: "To Do",
      value: false
    },
    {
      component: FlagUrgent,
      string: "Urgent",
      value: false
    }
  ];*/

  let open = false;
  let newToggle;
  let expanded = false;
  let noteColour = "";
  function click() {
    open = !open;
    //noteColour = "orange";
  }
  async function close() {
    open = false;
    await tick();
    newToggle.querySelector("button").focus();
  }

  let text;
  async function submit(event) {
    event.preventDefault();
    close();
    let workspace;

    if ($page.params.workspace && $page.params.workspace !== "all") {
      workspace = $workspaces.find(
        space => space.name === $page.params.workspace
      ).id;
    }
    // Need to do the same for stack
    let collection;
    if ($page.params.collection && $page.params.collection !== "all") {
      collection = $collections.find(
        space => space.name === $page.params.collection
      ).id;
    }

    const note = {
      body: [
        {
          motivation: "commenting",
          content: text
        }
      ],
      _workspace: workspace,
      _collection: collection
      //tags: tags
    };

    await window.fetch(`/api/notes`, {
      method: "POST",
      credentials: "include",
      headers: {
        "csrf-token": getToken(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    });
    $refreshNotes = Date.now();
  } /*
  let flagsAdded = [];
  function addFlags(flag) {
    flag.value
      ? flagsAdded.push(flag.string)
      : flagsAdded.splice(flagsAdded.indexOf(flag.string), 1);
  }*/
</script>

<style>
  .new-button {
    justify-content: center;
    flex-direction: column;
    display: flex;
  }
  .new-button :global(.Button) {
    padding: 0.65rem 1.95rem 0.6rem;
  }
  .new-button :global(svg) {
    float: left;
  }
  .new-button :global(span) {
    float: left;
    margin-top: 2px;
    margin-left: 10px;
  }
  .NewBox {
    position: absolute;
    background-color: var(--workspace-color);
    color: #fff;
    left: 20px;
    width: calc(100% - 40px);
    top: 20px;
    z-index: 3;
    border-radius: 30px;
    padding: 30px 40px;
  }
  form {
    width: 100%;
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
  input.orange {
    background: #fea95b;
  }
  input.orange::after {
    background: #d86801;
  }
  input.pink {
    background: #ff8ebe;
  }
  input.pink::after {
    background: #c0004e;
  }
  input.blue {
    background: #6fe1fa;
  }
  input.blue::after {
    background: #0693b2;
  }
  input.green {
    background: #9fe793;
  }
  input.green::after {
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
  .Editor :global(#sapper button.ql-active) {
    background: var(--main-background-color);
  }
  .Editor :global(.ql-snow.ql-toolbar button.ql-active .ql-stroke) {
    stroke: var(--workspace-color);
  }
  .Editor :global(.ql-snow.ql-toolbar button.ql-active .ql-fill),
  .Editor :global(.ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill) {
    fill: var(--workspace-color);
  }
  .Editor
    :global(.ql-snow.ql-toolbar
      button:not(.ql-active):hover
      .ql-stroke.ql-fill),
  .Editor :global(.ql-snow .ql-fill),
  .Editor :global(.ql-snow .ql-stroke.ql-fill),
  .Editor :global(.ql-snow.ql-toolbar button:not(.ql-active):hover .ql-fill) {
    fill: var(--main-background-color);
  }
  .Editor :global(.ql-snow.ql-toolbar button:not(.ql-active):hover .ql-stroke),
  .Editor :global(.ql-snow .ql-stroke) {
    stroke: var(--main-background-color);
  }
  .Editor :global(.Editor.hasFocus.svelte-27mrhh .ql-editor) {
    background-color: transparent;
  }
  .Editor :global(#sapper .ql-snow.ql-toolbar button) {
    margin-right: 10px !important;
  }
  .Editor :global(.Editor) {
    background: var(--main-background-color);
    min-height: 30vh;
    display: grid;
    /* ------------- Provitional 
    border-radius: 10px 10px 0 0;
    margin-top: 20px;*/
    border-radius: 10px;
    margin: 20px 0;
  }
  .Editor.orange :global(.Editor) {
    border: 2px solid #fea95b;
    border-bottom: 0;
  }
  .Editor.pink :global(.Editor) {
    border: 2px solid #ff8ebe;
    border-bottom: 0;
  }
  .Editor.blue :global(.Editor) {
    border: 2px solid #6fe1fa;
    border-bottom: 0;
  }
  .Editor.green :global(.Editor) {
    border: 2px solid #9fe793;
    border-bottom: 0;
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
    width: calc(100% - 4px);
    height: 2px;
    display: block;
    top: -2px;
    left: 2px;
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
    background: #eeeeee;
    border-radius: 20px;
    padding: 4px 8px;
    line-height: 10px;
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
  .flags.orange {
    border: 2px solid #fea95b;
    border-top: none;
    background: #fffcfa;
  }
  .flags.orange::after {
    background: #fcf3ed;
  }
  .flags.pink {
    border: 2px solid #ff8ebe;
    border-top: none;
    background: #fffafd;
  }
  .flags.pink::after {
    background: #f9eaf0;
  }
  .flags.blue {
    border: 2px solid #6fe1fa;
    border-top: none;
    background: #fafeff;
  }
  .flags.blue::after {
    background: #dff2f5;
  }
  .flags.green {
    border: 2px solid #9fe793;
    border-top: none;
    background: #f8fcf8;
  }
  .flags.green::after {
    background: #eaf5e6;
  }
  .flags.orange input:checked ~ p {
    color: #d86801;
    border: none;
    background: #ffebda;
  }
  .flags.pink input:checked ~ p {
    color: #c0004e;
    border: none;
    background: #ffe4f0;
  }
  .flags.blue input:checked ~ p {
    color: #0693b2;
    border: none;
    background: #e2f7fa;
  }
  .flags.green input:checked ~ p {
    color: #589b4c;
    border: none;
    background: #e6f8e4;
  }
  /* ------ Footer btns ------ */
  :global(.Button) {
    float: right;
  }
  .newNote :global(button.Closer) {
    width: 125px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.65rem 1.95rem 0.6rem;
  }
  .newNote :global(.Closer::after) {
    content: "Cancel";
    color: var(--main-background-color);
  }
  :global(.Closer:hover::after) {
    text-decoration: underline;
  }
  :global(.Closer svg) {
    display: none;
  }
  @media (max-width: 720px) {
    .new-button {
      position: fixed;
      right: var(--base);
      bottom: 50px;
    }
    .new-button :global(.Button) {
      box-shadow: 3px 1px 7px rgba(0, 0, 0, 0.2);
      padding: 0.65rem;
      border-radius: 100%;
      height: 60px;
      width: 60px;
    }
    .new-button :global(svg) {
      float: inherit;
      width: 25px;
      height: 25px;
    }
    .NewButtonLabel {
      display: none;
    }
    .NewBox {
      left: 0;
      top: 0;
      border-radius: 0;
      width: 100%;
      height: 100%;
      position: fixed;
      position: fixed;
      align-items: center;
      display: flex;
    }
    .newNote :global(button.Closer) {
      width: 50%;
    }
    :global(button.Closer),
    :global(button.Submit) {
      width: 50%;
      padding: 15px 0 !important;
      margin: 0 !important;
      font-size: 0.9rem;
      border-radius: 20px !important;
    }
    .flags p {
      padding: 10px;
    }
    .colours {
      margin: 0 0 15px 0;
      width: 100%;
    }
  }
</style>

{#if open}
  <div
    class="NewBox newNote"
    out:send|local={{ key: 'new-box' }}
    in:receive|local={{ key: 'new-box' }}>
    <form
      id="newform"
      class="newForm"
      action="/api/create-publication"
      on:submit={submit}>
      <!--
      <ul class="colours">
        {#each colours as colour}
          <li>
            <input
              name="noteColour"
              type="radio"
              class={colour}
              checked={colour === 'orange' ? true : ''}
              on:click={() => (noteColour = colour)} />
          </li>
        {/each}
      </ul>-->
      <div class="Editor {noteColour}">
        <NoteEditor bind:richtext={text} />
      </div>
      <!--
      <ul class="flags {noteColour}">
        {#each flagsArr as flag}
          <li>
            <input
              type="checkbox"
              bind:checked={flag.value}
              on:change={() => addFlags(flag)} />
            <p class={flag.string}>
              <svelte:component this={flag.component} />
              {flag.string}
            </p>
          </li>
        {/each}
      </ul>-->
      <WhiteButton>Create</WhiteButton>
      <Closer click={close} dark={true} />
    </form>
  </div>
  <span />
{:else}
  <span
    class="new-button"
    out:send|local={{ key: 'new-box' }}
    in:receive|local={{ key: 'new-box' }}
    bind:this={newToggle}>
    <Button {click}>
      <IcoNewNote />
      <span class="NewButtonLabel">Note</span>
    </Button>
  </span>
{/if}
