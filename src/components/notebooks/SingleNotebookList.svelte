<script>
  import SortSelect from "../workspace/SortSelect.svelte";
  import SortSelectNotebooks from "./Tools/SortSelectNotebooks.svelte";
  import NoNotebooks from "../img/NoNotebooks.svelte";
  import IcoFilter from "../img/IcoFilter.svelte";
  import FilterNote from "../FilterNote.svelte";
  import FilterSource from "../FilterSource.svelte";
  import NotesCard from "../notes/NotesCard.svelte";
  import Card from "../workspace/Card.svelte";
  import Loader from "../Loader.svelte";
  import SingleNotebookMenu from "./Tools/SingleNotebookMenu.svelte";
  import { searchedNotes } from "../../stores/notebook/notes.js";
  import { searchedSources } from "../../stores/notebook/sources.js";
  import { stores } from "@sapper/app";
  export let notebook = {};

  const { page } = stores();
  let filterOn = false;
  let clicked = false;
  let Items;

  let menuTabs = "all";

  $: if (menuTabs === "all" && notebook) {
    Items = [].concat(notebook.sources).concat(notebook.notes);
  } else if (menuTabs === "sources") {
    Items =
      $searchedSources.type === "loading"
        ? $searchedSources
        : $searchedSources.items;
  } else if (menuTabs === "notes") {
    Items =
      $searchedNotes.type === "loading" ? $searchedNotes : $searchedNotes.items;
  }

  $: if (Items.type !== "loading" || (menuTabs === "all" && !Items[0])) {
    if (menuTabs === "all" && query.dir && query.dir === "asc")
      Items.sort((a, b) => (a.updated > b.updated ? 1 : -1));
    else Items.sort((a, b) => (a.updated > b.updated ? -1 : 1));
  }

  $: query = Object.assign({}, $page.query) || "";

  $: if ((query.stack || query.type || query.flag) && !clicked) filterOn = true;

  let filter = () => {
    filterOn = !filterOn;
    clicked = true;
  };
</script>

<style>
  :root {
    --list-template-columns: 60px 1fr 1fr 0.5fr 0.5fr 2rem;
    --item-font-size: 0.7rem;
    --list-grid-gap: calc(var(--base) * 0.5);
  }
  .Header > div {
    display: flex;
    align-items: center;
  }
  .Cards {
    position: relative;
    display: grid;
    padding: calc(var(--base) * 2);
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: var(--base);
    grid-auto-rows: max-content;
  }
  .CardHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--item-font-size);
    position: relative;
    background-color: #ffffff;
    z-index: 2;
    padding: 20px 40px 10px;
    border-bottom-right-radius: 50px;
    -webkit-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
    -moz-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
  }
  .CardHeader :global(ul.Menu) {
    order: 2;
  }
  .EmptyFilter {
    width: 87px;
    height: 34px;
    margin: 0;
    order: 3;
  }
  .filter {
    background: transparent;
    border: 2px solid var(--action);
    border-radius: 10px;
    color: var(--action);
    padding: 7px 15px;
    font-weight: 700;
    position: relative;
    margin: 0;
    float: right;
    display: flex;
    align-items: center;
    cursor: pointer;
    order: 3;
  }
  .filter:not(.active):hover {
    background: var(--main-background-color);
  }
  .filter p {
    font-size: var(--item-font-size);
    margin: 0 8px 0 0;
    float: left;
    font-weight: 600;
  }
  .active p,
  .active > :global(svg) {
    color: #ffffff;
  }
  .active {
    background: var(--action);
  }

  .formFilter {
    background: #f9fbfc;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--base);
    grid-auto-rows: -webkit-max-content;
    grid-auto-rows: max-content;
    margin: 0;
    border-radius: 0 0 50px 0;
    height: 0;
    overflow: hidden;
    position: relative;
    position: relative;
    padding: 0 40px;
    transition: all 0.25s ease-out;
  }
  .formFilter.active {
    height: inherit;
    padding: 20px 40px;
    overflow: inherit;
  }
  .formFilter::before {
    content: "";
    background: #f9fbfc;
    width: 50px;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-100%);
    height: 0;
    transition: all 0.25s ease-out;
  }
  .formFilter.active::before {
    height: 50px;
  }
  .formFilter :global(.notebook) {
    display: none;
  }
  .Cards > :global(a:only-child) {
    width: calc(50% - (var(--base) / 2));
  }
  .Empty {
    text-align: center;
    color: #c4cdd1;
    grid-column: 1 / -1;
  }
  .Empty {
    text-align: center;
    color: #c4cdd1;
    grid-column: 1 / -1;
    margin-top: 80px;
  }
  .Empty :global(svg) {
    width: 50%;
    max-width: 250px;
  }
  .Cards :global(.Item > input[type="checkbox"]) {
    display: none;
  }
  @media (min-width: 641px) and (max-width: 720px) {
    .CardHeader {
      top: 0;
      padding-top: 0;
      position: relative;
    }
  }
  @media (max-width: 720px) {
    .CardHeader {
      display: grid;
      grid-template-columns: 1fr max-content;
      row-gap: 30px;
    }
    .formFilter {
      grid-template-columns: 1fr;
    }
  }
  @media (min-width: 721px) {
    .Cards :global(.Item:only-child) {
      width: calc(50% - var(--base) / 2);
    }
  }
</style>

<div class="CardHeader">
  <SingleNotebookMenu bind:menuTabs shortId={notebook.shortId} />
  <div>
    {#if menuTabs !== 'all'}
      <SortSelect {query} path={$page.path}>Sort By:</SortSelect>
    {:else}
      <SortSelectNotebooks {query} path={$page.path}>
        Sort By:
      </SortSelectNotebooks>
    {/if}
  </div>
  {#if menuTabs !== 'all'}
    <section class="filter {filterOn ? 'active' : ''}" on:click={filter}>
      <p>Filter</p>
      <IcoFilter />
    </section>
  {:else}
    <section class="EmptyFilter" />
  {/if}
</div>
{#if menuTabs !== 'all'}
  <section class="formFilter {filterOn ? 'active' : ''}">
    {#if menuTabs === 'notes'}
      <FilterNote />
    {:else}
      <FilterSource />
    {/if}
  </section>
{/if}

<div class="Cards">
  {#if Items.type === 'loading'}
    <Loader />
  {:else if Items[0]}
    {#each Items as item}
      {#if item.type === 'Note'}
        <NotesCard note={item} selecting={false} selection={false} />
      {:else}
        <Card {item} selecting={true} selection={false} />
      {/if}
    {/each}
  {:else}
    <div class="Empty">
      <NoNotebooks />
    </div>
  {/if}
</div>
