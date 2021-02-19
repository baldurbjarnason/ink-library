<script>
  import HighlightColours from "./HighlightColours.svelte";
  import HighlightFlags from "./HighlightFlags.svelte";
  import HighlightButton from "./HighlightButton.svelte";
  import HighlightTextButton from "./HighlightTextButton.svelte";
  import HighlightNoteField from "./HighlightNoteField.svelte";
  import HighlightNotebooks from "./HighlightNotebooks.svelte";
  import { getToken } from "../../../getToken";
  import HighlightSelectedFlags from "./HighlightSelectedFlags.svelte";
  import HighlightNoteButton from "./HighlightNoteButton.svelte";
  import { assignIco } from "../source-margin/assignIco.js";
  import IcoNotebook from "../../img/IcoNotebook.svelte";
  import IcoTag from "./IcoTag.svelte";
  import CloseIcon from "./CloseIcon.svelte";
  import { onDestroy } from "svelte";
  import { notebooks$, source$, chapter$ } from "../../../../state/state.ts";
  import { tags$ } from "../../../../state/tags.ts";
  import { setColour } from "./setColour.js";
  import {
    getNoted,
    getHighlighted,
    getFlags,
    getColours,
  } from "../source-margin/processNote.js";
  let toolbar;
  let hidden;
  let range;
  let colour;
  let selectedFlags;
  let selectedNotebooks;
  let flagMenu;
  let noteBookMenu;
  let highlight;
  let plaintext;

  export let note;
  export let annotation;
  $: console.log(note, annotation);
  export let stopEditing = () => {};
  let noted;
  $: if (annotation && !plaintext) {
    noted = getNoted(annotation);
    if (noted) {
      window
        .fetch("/api/markdown", {
          method: "POST",
          headers: {
            "Content-Type": "text/html",
            "csrf-token": getToken(),
          },
          body: noted.content || noted.value,
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return { content: "" };
          }
        })
        .then((json) => {
          plaintext = json.content;
        });
    }
  }

  $: if (annotation && annotation.tags) {
    if (!colour) {
      colour = annotation.tags.find((tag) => tag.type === "colour");
    }
    if (
      (!selectedFlags || selectedFlags.length === 0) &&
      annotation.tags.find((tag) => tag.type === "flag")
    ) {
      selectedFlags = annotation.tags.filter((tag) => tag.type === "flag");
    }
    if (
      (!selectedNotebooks || selectedNotebooks.length === 0) &&
      annotation.notebooks &&
      annotation.notebooks.length !== 0
    ) {
      selectedNotebooks = annotation.notebooks;
    }
  }
  $: if (colour && toolbar) {
    setColour(colour, toolbar);
  } else if (toolbar) {
    toolbar.style.setProperty("--toolbar-colour", "#dddddd");
    toolbar.style.setProperty("--toolbar-text", "#999");
  }
  // function hasSelection() {
  //   return $selectionHighlight$ && $selectionHighlight$.selection.isCollapsed;
  // }
  let createdNotebooks = [];
  function createNotebook(name) {
    if (!createdNotebooks.find((item) => item.name === name.toLowerCase())) {
      createdNotebooks = createdNotebooks.concat({ name: name.toLowerCase() });
    }
  }
  let createdFlags = [];
  function createFlag(name) {
    if (!createdFlags.find((item) => item.name === name.toLowerCase())) {
      createdFlags = createdFlags.concat({ name: name.toLowerCase() });
    }
  }
  async function update() {
    const flags = [].concat(selectedFlags, createdFlags).filter((item) => item);
    const notebooks = []
      .concat(selectedNotebooks, createdNotebooks)
      .filter((item) => item);
    let body;
    if (plaintext) {
      const content = await window
        .fetch("/api/markdown", {
          method: "POST",
          headers: {
            "Content-Type": "text/html",
            "csrf-token": getToken(),
          },
          body: plaintext,
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return { content: "" };
          }
        })
        .then((json) => {
          return json.content;
        });
      body = content;
    }
    stopEditing();
    return note.update({ tags: flags.concat(colour), notebooks }, body);
  }
</script>

<style>
  .HighlightToolbar {
    padding: 0;
    margin: 0;
    background-color: white;
    padding: 0.5rem 0.65rem;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--toolbar-colour, #dddddd);
    z-index: 10;
    position: relative;
  }
  .HighlightToolbar ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 1rem;
  }
  .HighlightToolbar li {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
  }
  :global(#sapper
      .Chapter
      .Highlight[data-annotation-id="temporary-selection-highlight"]) {
    background-color: rgba(120, 120, 120, 0.2);
  }
  .ButtonBar {
    display: flex;
    justify-content: space-between;
  }
  /* your styles go here */
  .Flags {
    display: flex;
    flex-direction: row;
    padding-top: 0.5rem;
    flex-wrap: wrap;
  }
  .Flag {
    margin-right: 0.25rem;
    margin-top: 0.5rem;
    background: var(--toolbar-background, #ddd);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0.25rem 0.25rem;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    display: grid;
    grid-template-columns: 24px 1fr 24px;
  }
  .Flag :global(svg) {
    color: var(--toolbar-text, #000);
    margin-right: 0.5rem;
    width: 16px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 100%;
    height: 16px;
    padding: 3px;
  }
</style>

<nav
  class="HighlightToolbar"
  class:colour
  bind:this={toolbar}
  class:visually-hidden={hidden}
  on:mousedown={(event) => {
    if (event.target.matches('details *:not(label):not(input)') || event.target === event.currentTarget) {
      event.preventDefault();
    }
  }}
  on:click={(event) => {
    if (event.target.matches('input')) {
    }
  }}>
  <ol>
    <HighlightColours bind:colour tags={$tags$} />
    <li>
      <HighlightFlags
        {colour}
        tags={$tags$}
        bind:selectedFlags
        bind:flagMenu
        create={createFlag} />
    </li>
    <li>
      <HighlightNotebooks
        {colour}
        notebooks={$notebooks$.items}
        bind:selectedNotebooks
        bind:noteBookMenu
        create={createNotebook} />
    </li>
    <li />
  </ol>
  {#if (selectedFlags && selectedFlags.length !== 0) || (selectedNotebooks && selectedNotebooks.length !== 0) || createdNotebooks.length !== 0 || createdFlags.length !== 0}
    <div class="Flags">
      {#if selectedFlags}
        {#each selectedFlags as flag}
          <div class="Flag Item">
            <svelte:component this={assignIco(flag.name)} />
            <span class={flag.name}>
              {flag.name[0].toUpperCase()}{flag.name.slice(1)}
            </span>
            <CloseIcon
              click={() => {
                const index = selectedFlags.indexOf(flag);
                if (index !== -1) {
                  selectedFlags = selectedFlags.filter((old) => {
                    return old !== flag;
                  });
                }
              }} />
          </div>
        {/each}
      {/if}
      {#if createdFlags.length !== 0}
        {#each createdFlags as flag}
          <div class="Flag Item">
            <IcoTag />
            <span class={flag.name}>
              {flag.name[0].toUpperCase()}{flag.name.slice(1)}
            </span>
            <CloseIcon
              click={() => {
                const index = createdFlags.indexOf(flag);
                if (index !== -1) {
                  createdFlags = createdFlags.filter((old) => {
                    return old !== flag;
                  });
                }
              }} />
          </div>
        {/each}
      {/if}
      {#if createdNotebooks.length !== 0}
        {#each createdNotebooks as notebook}
          <div class="Flag Item">
            <IcoNotebook />
            <span class={notebook.name}>{notebook.name}</span>
            <CloseIcon
              click={() => {
                const index = createdNotebooks.indexOf(notebook);
                if (index !== -1) {
                  createdNotebooks = createdNotebooks.filter((old) => {
                    return old !== notebook;
                  });
                }
              }} />
          </div>
        {/each}
      {/if}
      {#if selectedNotebooks}
        {#each selectedNotebooks as notebook}
          <div class="Flag Item">
            <IcoNotebook />
            <span class={notebook.name}>{notebook.name}</span>
          </div>
        {/each}
      {/if}
    </div>
  {/if}
  <HighlightNoteField bind:plaintext />
  <div class="ButtonBar">
    <HighlightTextButton click={() => stopEditing()}>
      Cancel
    </HighlightTextButton>
    <HighlightButton click={() => update()}>Save</HighlightButton>
  </div>
</nav>
