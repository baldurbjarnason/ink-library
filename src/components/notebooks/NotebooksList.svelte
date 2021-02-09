<script>
  import { notebooks, clearSelected, selectedItems } from "../../stores";
  import NotesListFooter from "../notes/NotesListFooter.svelte";
  import SortSelect from "../workspace/SortSelect.svelte";
  import NoNotebooks from "../img/NoNotebooks.svelte";
  import IcoFilter from "../img/IcoFilter.svelte";
  import SearchNotebooks from "./Tools/SearchNotebooks.svelte";
  import PaginationButtons from "../PaginationButtons.svelte";
  import FilterNotebook from "../FilterNotebook.svelte";
  import NotebookCard from "./NotebookCard.svelte";

  import { stores } from "@sapper/app";
  const { page } = stores();
  let filterOn = false;
  let clicked = false;
  let items;

  $: items = $notebooks ? $notebooks.items : [];
  $: query = Object.assign({}, $page.query) || "";

  $: if (query.colour && !clicked) filterOn = true;

  let filter = () => {
    filterOn = !filterOn;
    clicked = true;
  };

  let selecting = true;
  let selection = function() {
    selectAll = false;
    if (!selecting) selecting = true;
  };

  $: selectable =
    $page.path === "/notebooks/" || $page.path === "/notebooks" ? true : false;
  $: if (!selectable) {
    clearSelected();
    console.log(selectable);
  }

  clearSelected();

  let selectAll = false;
  let chooseAll = () => {
    if ($selectedItems.size !== items.length) selectAll = true;
  };
  $: fullList = $selectedItems.size == items.length ? true : false;
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
    z-index: 0;
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
  .Loading {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background-color: transparent;
    box-shadow: 0 0 2px #f0f0f0, 0 0 4px var(--workspace-color);
    margin: 8rem auto;
    animation-duration: 1s;
    animation-name: loading;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    opacity: 0.5;
    grid-column: 1 / -1;
  }

  .filter {
    background: transparent;
    border: 2px solid var(--action);
    border-radius: 10px;
    color: var(--action);
    padding: 7px 15px;
    font-weight: 700;
    position: relative;
    margin: 0 0 0 15px;
    float: right;
    display: flex;
    align-items: center;
    cursor: pointer;
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
    z-index: 1;
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
  @keyframes loading {
    from {
      transform: scale(0.5);
      box-shadow: 0 0 2px #f0f0f0, 0 0 4px var(--workspace-color);
    }
    to {
      transform: scale(1.5);
      box-shadow: 0 0 0 3px var(--workspace-color), 0 0 0 20px #f0f0f0;
    }
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
  @media (min-width: 641px) and (max-width: 720px) {
    .CardHeader {
      top: 0;
      padding-top: 0;
      position: relative;
    }
    .formFilter {
      grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    }
  }
  @media (max-width: 640px) {
    .CardHeader {
      padding-top: 50px;
    }
    .formFilter {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }
</style>

<div class="CardHeader">
  <div>
    <SortSelect {query} path={$page.path}>Sort By:</SortSelect>
  </div>
  <div>
    <SearchNotebooks />
    <section class="filter {filterOn ? 'active' : ''}" on:click={filter}>
      <p>Filter</p>
      <IcoFilter />
    </section>
  </div>
</div>
<section class="formFilter {filterOn ? 'active' : ''}">
  <FilterNotebook />
</section>

<div class="Cards">
  {#if $notebooks.type === 'loading'}
    <div class="Loading" />
  {:else}
    {#each items as notebook}
      <NotebookCard {notebook} {selecting} {selection} {selectAll} />
    {:else}
      <div class="Empty">
        <NoNotebooks />
      </div>
    {/each}
  {/if}
</div>
{#if selecting && $selectedItems.size && selectable}
  <NotesListFooter
    type="notebook"
    {chooseAll}
    {fullList}
    endSelection={() => {
      selecting = false;
      clearSelected();
    }} />
{/if}
<PaginationButtons itemsLenght={items.length} />
