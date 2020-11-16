<script>
  import { page, addSelected, removeSelected } from "../../stores";
  import IcoNotebook from "../img/IcoNotebook.svelte";
  import DateFormat from "../notes/Date.svelte";

  export let notebook = {};
  export let selecting;
  export let selection = function() {};
  export let selectAll;

  let selected = false;

  $: if (!selecting && selected) selected = false;
  $: if (selected && notebook.id) addSelected(notebook);
  else removeSelected(notebook);

  $: selectable =
    $page.path === "/notebooks" || $page.path === "/notebooks/" ? true : false;

  $: if (selectAll) {
    selected = true;
    selection();
  }
</script>

<style>
  .Item {
    display: grid;
    grid-template-rows: 150px auto;
    background-color: #fff;
    border: 1px solid #eeeeee;
    overflow: hidden;
    position: relative;
    border-radius: 15px;
    -webkit-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
    -moz-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
  }
  a {
    text-decoration: inherit !important;
    color: inherit;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  /* -------------- Input -------------- */
  .BulkSelector {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
  }
  .BulkSelector::before,
  .BulkSelector::after {
    content: "";
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 50%;
    position: absolute;
    transition: all 0.25s ease-out;
  }
  .BulkSelector::before {
    width: 14px;
    height: 14px;
    border: 1px solid #888888;
    background: #ffffff;
  }
  .BulkSelector::after {
    width: 8px;
    height: 8px;
    background: transparent;
  }
  .BulkSelector:checked::after {
    background: #888888;
  }
  .colour1 .BulkSelector::before {
    border: 1px solid #a43939;
  }
  .colour2 .BulkSelector::before {
    border: 1px solid #6f4c9b;
  }
  .colour3 .BulkSelector::before {
    border: 1px solid #8f7000;
  }
  .colour4 .BulkSelector::before {
    border: 1px solid #4c9b92;
  }
  .colour1 .BulkSelector:checked::after {
    background: #a43939;
  }
  .colour2 .BulkSelector:checked::after {
    background: #6f4c9b;
  }
  .colour3 .BulkSelector:checked::after {
    background: #8f7000;
  }
  .colour4 .BulkSelector:checked::after {
    background: #4c9b92;
  }
  /* ---------- Cover image --------------*/
  .Img {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  .Info {
    display: grid;
    grid-template-columns: 34px 1fr;
    padding: 20px;
    grid-gap: 10px;
    min-width: 0;
  }
  .Icon {
    border-radius: 50%;
    width: 34px;
    height: 34px;
    position: relative;
  }
  h5 {
    font-weight: 600;
    margin: 0;
  }
  p {
    color: #888888;
    font-size: var(--item-font-size);
    margin: 0;
  }
  .Icon :global(svg) {
    width: 15px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .name,
  .Date {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .InfoContent {
    overflow: hidden;
  }
  /*----- Colours -----*/
  .Icon.colour1 {
    background: #f5e7e6;
  }
  .Icon.colour1 :global(svg) {
    color: #a43939;
  }
  .Icon.colour2 {
    background: #ede6f5;
  }
  .Icon.colour2 :global(svg) {
    color: #6f4c9b;
  }
  .Icon.colour3 {
    background: #fae59b;
  }
  .Icon.colour3 :global(svg) {
    color: #8f7000;
  }
  .Icon.colour4 {
    background: #dcf3f0;
  }
  .Icon.colour4 :global(svg) {
    color: #4c9b92;
  }
  @media (min-width: 721px) {
    a:only-child {
      width: calc(50% - var(--base) / 2);
    }
  }
</style>

<div class="Item {notebook.settings.colour}">
  <a href={`notebooks/${notebook.shortId}`}>{notebook.name}</a>
  {#if selectable}
    <input
      class="BulkSelector"
      type="checkbox"
      bind:checked={selected}
      on:click={() => selection()} />
  {/if}
  {#if notebook.settings.coverImg}
    <div
      class="Img"
      style={`background-image: url("/img/NotebookImg/${notebook.settings.coverImg}.jpg")`} />
  {:else}
    <div class="Img" style={'background-color: red'} />
  {/if}
  <div class="Info">
    <div class="Icon {notebook.settings.colour}">
      <IcoNotebook />
    </div>
    <div class="InfoContent">
      <h5 class="name">{notebook.name}</h5>
      <p class="Date">
        <DateFormat updated={notebook.updated} published={notebook.published} />
      </p>
    </div>
  </div>
</div>
