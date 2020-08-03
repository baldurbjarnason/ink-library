<script>
  import { library, selectedItems, clearSelected } from "../../stores";
  import FilterSource from "../FilterSource.svelte";
  import Footer from "./Footer.svelte";
  import Button from "../widgets/Button.svelte";
  import Card from "./Card.svelte";
  import Item from "./Item.svelte";
  import HeaderArrows from "./HeaderArrows.svelte";
  import SmallButton from "../widgets/SmallButton.svelte";
  import SortSelect from "./SortSelect.svelte";
  import SortButton from "./SortButton.svelte";
  import Search from "../Search.svelte";
  import NoSources from "../img/NoSources.svelte";
  import IcoFilter from "../img/IcoFilter.svelte";
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  let selecting = true;
  let filterOn = false;
  let items;
  $: if ($library) {
    items = $library.items;
  }
  let query = {};
  let params = {};
  $: if ($page) {
    query = Object.assign({}, $page.query);
    params = Object.assign({}, $page.params);
  }

  let selection = function() {
    if (!selecting) selecting = true;
  };
</script>

<style>
  :root {
    --list-template-columns: 60px 1fr 1fr 0.5fr 0.5fr 2rem;
    --item-font-size: 0.7rem;
    --list-grid-gap: calc(var(--base) * 0.5);
  } /*
  .Header {
    display: grid;
    grid-template-columns: var(--list-template-columns);
    padding: calc(var(--base) * 0.25);
    grid-gap: var(--list-grid-gap);
    font-size: var(--item-font-size);
    position: sticky;
    top: 82px;
    background-color: var(--main-background-color);
    z-index: 1;
  }
  .Header > div {
    display: flex;
    align-items: center;
  }*/
  .Cards {
    position: relative;
    display: grid;
    padding: calc(var(--base) * 2);
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    grid-gap: var(--base);
    grid-auto-rows: max-content;
  } /*
  .Items {
    position: relative;
    min-height: 100vh;
  }*/
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
  } /*
  .Header :global(button.Button) {
    margin-left: -80%;
  }*/
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
  }
  .filter:not(.active):hover {
    background: var(--main-background-color);
  }
  .filter p {
    font-size: var(--item-font-size);
    margin: 0 8px 0 0;
    float: left;
  }
  .filter input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    outline: none;
    opacity: 0;
    cursor: pointer;
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
    grid-template-columns: 1fr 1fr 1fr;
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
    margin-top: 80px;
  }
  .Empty :global(svg) {
    width: 50%;
    max-width: 250px;
  }
  code {
    background-color: transparent;
    color: #c4cdd1;
    font-size: 4rem;
    margin: auto;
  } /*
  .MobileHeader {
    display: none;
  }*/
  @media (min-width: 641px) and (max-width: 720px) {
    /*
    .Header,
    .CardHeader {
      display: none;
    }
    .MobileHeader {
      display: flex;
      padding: calc(var(--base) * 0.25) var(--base);
      justify-content: space-between;
      align-items: center;
    }*/
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
      grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    }
  }
</style>

<div class="CardHeader">
  <div>
    <SortSelect {query} path={$page.path}>Sort By:</SortSelect>
  </div>
  <div>
    <Search />
    <!--
    <section class="filter {filterOn ? 'active' : ''}">
      <p>Filter</p>
      <IcoFilter />
      <input type="checkbox" bind:checked={filterOn} />
    </section>-->
  </div>
</div>
<!--
<section class="formFilter {filterOn ? 'active' : ''}">
  <FilterSource />
</section>-->

<div class="Cards">
  {#if $library.type === 'loading'}
    <div class="Loading" />
  {:else}
    {#each items as item}
      <Card {item} {selecting} {selection} />
    {:else}
      <div class="Empty">
        <NoSources />
      </div>
    {/each}
  {/if}
</div>
{#if selecting && $selectedItems.size}
  <Footer
    endSelection={() => {
      selecting = false;
      clearSelected();
    }} />
{/if}
