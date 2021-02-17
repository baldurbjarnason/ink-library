<script>
  import {
    getNoted,
    getHighlighted,
    getFlags,
    getColours,
  } from "../source-margin/processNote.js";
  import { assignIco } from "../source-margin/assignIco.js";
  import { setColour } from "./setColour.js";
  import DateFormat from "../../notes/Date.svelte";
  import HighlightMarginEdit from "./HighlightMarginEdit.svelte";
  import IcoNotebook from "../../img/IcoNotebook.svelte";
  export let note;
  export let annotations;
  export let element;
  $: if (element && annotations) {
    element.addEventListener("annotation-id-change", () => {
      note = annotations[element.dataset.annotationId];
    });
  }
  let annotation;
  $: if ($note && $note.annotation) {
    annotation = $note.annotation;
  }
  let clean = "";
  let id, highlighted, noted, flags, colours;
  $: if (annotation) {
    highlighted = getHighlighted(annotation);
    noted = getNoted(annotation);
    flags = getFlags(annotation);
    colours = getColours(annotation);
  }
  let colour;
  $: if (
    annotation &&
    annotation.tags &&
    annotation.tags.find((tag) => tag.type === "colour")
  ) {
    colour = annotation.tags.find((tag) => tag.type === "colour");
  }
  let noteElement;
  $: if (colour && noteElement) {
    setColour(colour, noteElement);
  } else if (noteElement) {
    noteElement.style.setProperty("--toolbar-colour", "#dddddd");
    noteElement.style.setProperty("--toolbar-text", "#999");
  }
  let editing;
</script>

<style>
  .Note {
    box-shadow: 3px 3px 28px rgba(0, 0, 0, 0.03);
    border: 1px solid var(--toolbar-colour, #dddddd);
    border-radius: 14.32px;
    font-size: 0.75rem;
    margin: 0 1rem;
    padding: 1rem 0 0;
    overflow: hidden;
  }
  .Comment {
    padding: 0 1rem 0.5rem;
  }
  .Comment,
  .Comment :global(*) {
    font-size: 0.75rem;
  }
  .Comment :global(p) {
    margin: 0;
  }
  .Comment :global(p + p) {
    margin-top: 1em;
  }
  .TextButton,
  .TextButton:link {
    font-family: var(--sans-fonts);
    font-size: 0.75rem;
    flex: 0 1 auto;
    line-height: 1;

    display: inline-block;

    padding: 0;

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    font-weight: 500;
    color: #888;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    /* transition: box-shadow 0.15s ease-in-out; */
    background-color: transparent;
    text-decoration: none !important;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: none;
  }

  .TextButton:hover,
  .TextButton:link:hover,
  .TextButton:link:visited:hover,
  .TextButton:visited:hover,
  .TextButton:link:visited:hover {
    color: black;
    box-shadow: none;
    text-decoration: underline;
  }

  .TextButton:active,
  .TextButton:link:active {
    background-color: var(--active);
  }
  .TextButton:focus {
    outline: none;
    box-shadow: 0 0 0 3px #68d6d499;
  }
  .Footer {
    padding: 0.5rem 1rem;
    background: var(--toolbar-background, #ddd);
    color: var(--toolbar-text, #333);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
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

{#if $note}
  {#if editing}
    <HighlightMarginEdit
      {annotation}
      {note}
      stopEditing={() => {
        editing = false;
      }} />
  {:else}
    <div
      class="Note"
      bind:this={noteElement}
      on:click={(event) => {
        if (!editing) {
          editing = true;
        }
      }}>
      <div class="Comment">
        {#if noted}
          {@html noted.content || noted.value}
        {:else}
          <button
            type="button"
            class="TextButton"
            on:click={() => {
              editing = true;
            }}>
            Add note...
          </button>
        {/if}

      </div>
      <div class="Footer">
        {#each flags as flag}
          <div class="Flag Item">
            <svelte:component this={assignIco(flag.name)} />
            <span class={flag.name}>
              {flag.name[0].toUpperCase()}{flag.name.slice(1)}
            </span>
          </div>
        {:else}
          <span />
        {/each}
        {#each annotation.notebooks as notebook}
          <div class="Flag Item">
            <IcoNotebook />
            <span class={notebook.name}>
              {notebook.name[0].toUpperCase()}{notebook.name.slice(1)}
            </span>
          </div>
        {:else}
          <span />
        {/each}
        {#if annotation.updated || annotation.published}
          <DateFormat
            updated={annotation.updated}
            published={annotation.published} />
        {/if}
      </div>
    </div>
  {/if}
{/if}
