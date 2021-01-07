<script>
  import FilterNote from "./Tools/FilterNote.svelte";
  import NavNotes from "../img/NavNotes.svelte";
  import NoNotes from "../img/NoNotes.svelte";
  import SortSelect from "../workspace/SortSelect.svelte";
  import NavNotebook from "../img/NavNotebook.svelte";
  import IcoCloseColumn from "../img/IcoCloseColumn.svelte";
  import NoteCardPage from "./Tools/NoteCardPage.svelte";
  import PageNotesSearcher from "./Tools/PageNotesSearcher.svelte";
  import { flip } from "svelte/animate";
  import { dndzone, TRIGGERS } from "svelte-dnd-action";
  import { page } from "../../stores";
  import {
    pageNotes,
    refreshPageNotes,
    searchPageNotes,
  } from "../../stores/page/notes.js";
  export let items;
  export let requesting;

  $: notebookNotes = $pageNotes.items;

  const flipDurationMs = 300;
  let shouldIgnoreDndEvents = false;
  let dropFromOthersDisabled = true;
  $: dragDisabled = requesting;

  function handleDndConsider(e) {
    const { trigger, id } = e.detail.info;

    if (trigger === TRIGGERS.DRAG_STARTED) {
      const idx = items.findIndex((item) => item.id === id);
      const newId = `${id}_copy_${Math.round(Math.random() * 100000)}`;

      e.detail.items.splice(idx, 0, { ...items[idx], id: newId });
      items = e.detail.items;
      shouldIgnoreDndEvents = true;
    } else if (!shouldIgnoreDndEvents) {
      items = e.detail.items;
    } else {
      items = [...items];
    }
  }

  function handleDndFinalize(e) {
    if (!shouldIgnoreDndEvents) {
      items = e.detail.items;
    } else {
      items = [...items];
      shouldIgnoreDndEvents = false;
    }
  }

  function transformDraggedElement(draggedEl, data, index) {
    /*
    const msg = `My index is ${index}`;
    draggedEl.innerHTML = msg;*/
    console.log("here");
  }

  $: query = Object.assign({}, $page.query) || "";

  let filterOn = false;
  let clicked = false;
  $: if ((query.stack || query.type || query.flag) && !clicked) filterOn = true;

  let filter = () => {
    filterOn = !filterOn;
    clicked = true;
  };

  let closeColumn = false;
  let handleClick = () => {
    closeColumn = !closeColumn;
  };
</script>

<style>
  .NotesColumn,
  .ClosedNotesColumn *,
  .NotesColumn * {
    margin: 0;
    font-size: 0.75rem;
  }
  .ClosedNotesColumn {
    border-radius: 15px;
    padding: 10px 25px;
    border: 1px solid #dde8ed;
    overflow-y: scroll;
    cursor: pointer;
    margin: 0;
    right: 20px;
    top: 20px;
    position: fixed;
    background: #f1f5f8;
    transition: all 0.25s ease-out;
  }
  .NotesColumn {
    z-index: 1;
    background: #f1f5f8;
    position: sticky;
    width: 350px;
    right: 0;
    top: 0;
    height: 100vh;
    border-radius: 50px 0 0 0;
    padding: 30px 30px 0 30px;
    display: grid;
    grid-template-rows: repeat(4, max-content) 1fr;
    transition: all 0.25s ease-out;
    gap: 20px;
  }
  .NotesColumn.closeColumn {
    padding: 30px 0 0 0;
    width: 0;
    opacity: 0;
  }
  .Notes {
    display: grid;
    gap: 10px;
    overflow-y: scroll;
  }
  .Notes .div:last-child {
    padding-bottom: 10px;
  }
  .Header {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 10px;
  }
  .Header .Left h4,
  .Header .Left h2 {
    display: grid;
    font-weight: 500;
    grid-template-columns: max-content 1fr;
    align-items: center;
    gap: 5px;
  }
  .Header .Left h2 {
    color: var(--workspace-color);
    font-size: 1rem;
  }
  .Header .Left h2 :global(svg) {
    width: auto;
    height: 13px;
  }
  .Header .Left h4 {
    color: #888888;
  }
  .Header .Left h4 :global(svg) {
    width: auto;
    height: 9px;
  }
  .Header .Right span {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: #dde8ed;
    display: grid;
    text-align: center;
    align-items: center;
    cursor: pointer;
  }
  .Header .Right span:hover {
    background: #c0d7e1;
  }
  .Header .Right span :global(svg) {
    margin: 0 auto;
  }
  .ListStyle {
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    gap: 10px;
  }
  .Sorting {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    gap: 10px;
  }
  .ListStyle .Sorting p {
    font-weight: 500;
    float: left;
  }
  .ListStyle .Sorting :global(select) {
    padding: 0 28px 0 0;
    background: transparent;
  }
  .Filter {
    background: transparent;
    border: 2px solid var(--action);
    border-radius: 7px;
    color: var(--action);
    padding: 2px 15px;
    position: relative;
    float: right;
    display: grid;
    cursor: pointer;
  }
  .Filter:not(.active):hover {
    background: var(--main-background-color);
  }
  .Filter p {
    font-size: var(--item-font-size);
    float: left;
    font-weight: 700;
  }
  .active p,
  .active > :global(svg) {
    color: #ffffff;
  }
  .active {
    background: var(--action);
  }
  .Filters {
    background: #dde8ed;
    width: calc(100% + 60px);
    transform: translateX(-30px);
    padding: 0 30px;
    border-radius: 15px;
    max-height: 0;
    overflow: hidden;
    transition: all 0.25s ease-out;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--base);
    margin: 0;
    position: relative;
    z-index: 1;
  }
  .Filters.active {
    padding: 30px;
    max-height: inherit;
    overflow: inherit;
  }
  .EmptyOutline {
    position: absolute;
    left: 50%;
    top: 50%;
    display: grid;
    gap: 20px;
    transform: translate(-50%, -50%);
  }
  .EmptyOutline p {
    text-align: center;
    font-size: 0.9rem;
    color: var(--action);
    font-weight: 600;
    margin: 0;
    opacity: 0.5;
  }
</style>

<div>
  <section class="NotesColumn" class:closeColumn>
    <div class="Header">
      <div class="Left">
        <h2>
          <NavNotes />
          Notes
        </h2>
        <h4>
          <NavNotebook />
          Notebook
        </h4>
      </div>
      <div class="Right">
        <span on:click={handleClick}>
          <IcoCloseColumn />
        </span>
      </div>
    </div>
    <PageNotesSearcher />
    <div class="ListStyle">
      <div class="Sorting">
        <SortSelect {query} path={$page.path}>Sort By:</SortSelect>
      </div>
      <section class="Filter {filterOn ? 'active' : ''}" on:click={filter}>
        <p>Filter</p>
      </section>
    </div>
    <div class="Filters {filterOn ? 'active' : ''}">
      <FilterNote />
    </div>
    {#if items.length}
      <div
        class="Notes"
        style={`grid-template-rows: repeat(${items.length}, max-content);`}
        use:dndzone={{ items, flipDurationMs, dropFromOthersDisabled, transformDraggedElement, dragDisabled }}
        on:consider={handleDndConsider}
        on:finalize={handleDndFinalize}>
        {#each items as item (item.id)}
          <div class="div" animate:flip={{ duration: flipDurationMs }}>
            <NoteCardPage note={item} />
          </div>
        {/each}
      </div>
    {:else}
      <div class="EmptyOutline">
        <NoNotes />
        <p>Your notebook is empty</p>
      </div>
    {/if}
  </section>
  {#if closeColumn}
    <section class="ClosedNotesColumn" on:click={handleClick}>
      <div class="Header">
        <div class="Left">
          <h2>
            <NavNotes />
            Notes
          </h2>
          <h4>
            <NavNotebook />
            Notebook
          </h4>
        </div>
      </div>
    </section>
  {/if}
</div>
