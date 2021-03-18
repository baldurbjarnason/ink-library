<script>
  import Positioner from "./Positioner.svelte";
  import HighlightColours from "../HighlightColours.svelte";
  import HighlightFlags from "../HighlightFlags.svelte";
  import HighlightButton from "../HighlightButton.svelte";
  import HighlightNoteField from "../HighlightNoteField.svelte";
  import HighlightNotebooks from "../HighlightNotebooks.svelte";
  import HighlightNoteButton from "../HighlightNoteButton.svelte";
  import { assignIco } from "../../source-margin/assignIco.js";
  import IcoNotebook from "../../../img/IcoNotebook.svelte";
  import IcoFlag from "../../../img/IcoFlag.svelte";
  import CloseIcon from "../CloseIcon.svelte";
  import { notebooks$, source$, chapter$ } from "../../../../../state/state";
  import { chapterURL$ } from "../../../../../state/state-urls";
  import { refresh } from "../../../../../state/refresh";
  import { toolbar$ } from "../../../../../state/models/SelectionToolbar";
  import { tags$ } from "../../../../../state/tags";
  import { setColour } from "../setColour.js";
  import { getToken } from "../../../../getToken";

  let toolbar;
  let colour;
  let selectedFlags;
  let selectedNotebooks;
  let flagMenu;
  let noteBookMenu;
  let plaintext;
  let hidden;
  $: if (colour) {
    setColour(colour, toolbar);
  } else if (toolbar) {
    toolbar.style.setProperty("--toolbar-colour", "#dddddd");
    toolbar.style.setProperty("--toolbar-text", "#999");
  }
  function hasState() {
    if (
      plaintext ||
      colour ||
      selectedFlags.length !== 0 ||
      selectedNotebooks.length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  }
  let openNote = false;
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
  async function createHighlight() {
    const json = {
      tags: createdFlags.concat(selectedFlags),
      notebooks: createdNotebooks.concat(selectedNotebooks),
    };
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
      json.body = [
        {
          format: "text/html",
          motivation: "commenting",
          type: "TextualBody",
          content: content,
        },
      ];
    }
    if (colour) {
      json.tags = json.tags.concat(colour);
    } else {
      const colour = $tags$.find((tag) => tag.type === "colour");
      json.tags = json.tags.concat(colour);
    }
    hidden = true;
    try {
      await $toolbar$.highlight($source$, $chapter$, json);
    } catch (err) {
      console.error(err);
    }
    // refresh($chapterURL$);
    // reset state
    reset();
  }
  function reset() {
    selectedFlags = [];
    selectedNotebooks = [];
    createdFlags = [];
    createdNotebooks = [];
    plaintext = "";
    openNote = false;
    colour = "";
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
  }
  ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 1rem;
  }
  li {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
  }
  :global(#sapper
      .Chapter
      .Highlight[data-annotation-id^="temporary-selection-highlight"]) {
    background-color: rgba(120, 120, 120, 0.2);
    fill: rgba(120, 120, 120, 0.5);
  }
  .ButtonBar {
    display: flex;
    justify-content: right;
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

<svelte:body
  on:click={(event) => {
    if (toolbar.contains(event.target) || toolbar === event.target || event.target.closest('[data-highlight-toolbar]')) return;
    if ($toolbar$ && $toolbar$.temporary) {
      createHighlight();
    } else {
      reset();
    }
  }} />

<Positioner {colour} bind:toolbar {hidden}>
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
        notebooks={$notebooks$ ? $notebooks$.items : []}
        bind:selectedNotebooks
        bind:noteBookMenu
        create={createNotebook} />
    </li>
    <li>
      <HighlightNoteButton
        {colour}
        tags={$tags$}
        click={() => {
          openNote = true;
        }} />
    </li>
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
            <IcoFlag />
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
            <CloseIcon
              click={() => {
                const index = selectedNotebooks.indexOf(notebook);
                if (index !== -1) {
                  selectedNotebooks = selectedNotebooks.filter((old) => {
                    return old !== notebook;
                  });
                }
              }} />
          </div>
        {/each}
      {/if}
    </div>
  {/if}
  {#if openNote}
    <HighlightNoteField bind:plaintext />
    <div class="ButtonBar">
      <HighlightButton click={() => createHighlight()}>Create</HighlightButton>
    </div>
  {/if}
</Positioner>
