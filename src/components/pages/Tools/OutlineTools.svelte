<script>
  import IcoNewNote from "../../img/IcoNewNote.svelte";
  import Linear from "../../img/OutlineIcoLinear.svelte";
  import Columns from "../../img/OutlineIcoColumns.svelte";
  import Page from "../../img/OutlineIcoPage.svelte";
  import Styling from "../../img/OutlineIcoStyling.svelte";
  import Filter from "../../img/OutlineIcoFilter.svelte";
  import Export from "../../img/OutlineIcoExport.svelte";
  import FlagsListStyle from "./OutlineTools/FlagsListStyle.svelte";
  import FlagsListFilter from "./OutlineTools/FlagsListFilter.svelte";
  import ColourList from "./OutlineTools/ColourList.svelte";
  import ListStyleList from "./OutlineTools/ListStyleList.svelte";
  import FilterOptions from "./OutlineTools/FilterOptions.svelte";
  import StyleOptions from "./OutlineTools/StyleOptions.svelte";
  import { page } from "../../../stores";
  import { goto } from "@sapper/app";

  export let addNewNote;

  $: params = $page.query;

  let checkAll = (type) => {
    if (type === "styles") {
      delete params["styles"];
      delete params["styleColour"];
      delete params["styleFlags"];
    } else {
      delete params["filters"];
      delete params["filterColour"];
      delete params["filterFlags"];
    }
    let searchParams = new URLSearchParams(params);

    buildUrl(searchParams);
  };

  let addParams = (query, value) => {
    delete params[query];
    let searchParams = new URLSearchParams();
    if (value) searchParams.append(query, value);

    buildUrl(searchParams);
  };

  let addArrParams = (query, value) => {
    let queryVals = params[query];
    delete params[query];
    let searchParams = new URLSearchParams();

    if (value) {
      if (queryVals) {
        if (Array.isArray(queryVals)) {
          let i = queryVals.indexOf(value);
          i >= 0 ? queryVals.splice(i, 1) : (queryVals = [...queryVals, value]);

          queryVals.forEach((value) => {
            searchParams.append(query, value);
          });
        } else {
          if (queryVals === value) {
            searchParams.delete(query);
          } else {
            searchParams.append(query, queryVals);
            searchParams.append(query, value);
          }
        }
      } else {
        searchParams.append(query, value);
      }
    }
    buildUrl(searchParams);
  };

  let buildUrl = (searchParams) => {
    Object.keys(params).forEach((key) => {
      let value = params[key];
      if (value) {
        if (Array.isArray(value)) {
          value.map((item) => {
            searchParams.append(key, item);
          });
        } else {
          searchParams.append(key, value);
        }
      }
    });

    goto(`${$page.path}?${searchParams.toString()}`);
  };
</script>

<style>
  .Tools,
  li.Tool ul,
  li.Tool :global(ul) {
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 10px;
    list-style: none;
    margin: 0;
    gap: 1px;
    cursor: default;
    -webkit-box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.1);
  }
  li.Tool ul,
  li.Tool :global(ul) {
    position: absolute;
    padding: 7px 0;
    right: 0;
    top: 0;
    min-width: 190px;
    transform: translateX(calc(100% + 5px));
    display: none;
  }
  li.Tool:hover > ul,
  li.Tool :global(li:hover ul) {
    display: grid;
  }
  .Tools li,
  .Tools :global(li) {
    margin: 0 2px;
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }
  li.Children:hover::before,
  li.Children ul:hover:before,
  .Tools :global(li.Children:hover::before),
  .Tools :global(li.Children ul:hover:before) {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
  }
  li.Children ul:hover:before,
  .Tools :global(li.Children ul:hover:before) {
    left: 5px;
  }
  li.Tool ul li,
  li.Tool ul :global(li) {
    display: grid;
    padding: 5px 10px;
    text-align: left;
    align-items: center;
    gap: 7px;
    border-radius: 7px;
    grid-template-columns: max-content 1fr max-content;
  }
  li.Tool :global(.Current),
  li.Tool :global(li:hover) {
    background: var(--main-background-color);
  }
  li.Tool :global(li svg.Check) {
    color: var(--action);
    opacity: 0;
    transition: all 0.2s ease-out;
  }
  .Tool.List :global(li.Current svg.Check) {
    opacity: 1;
  }
  ul.Tools {
    position: fixed;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    padding: 6px 0 0;
    display: grid;
  }
  ul.Tools > li {
    text-align: center;
    padding: 5px;
    border-radius: 10px;
  }
  ul.Tools > li > p {
    font-size: 0.6rem !important;
  }
  ul.Tools > li.Current,
  ul.Tools > li:hover {
    background: #eeeeee;
  }
  ul.Tools p,
  ul.Tools :global(p) {
    font-size: 0.7rem;
    margin: 0;
    font-weight: 400;
  }
  p.Header,
  ul.Tools :global(p.Preview),
  ul.Tools :global(p.Header) {
    color: #888888;
  }
  ul.Tools p.Header,
  ul.Tools :global(p.Header) {
    text-align: left;
    padding-left: 30px;
    font-size: 0.55rem;
    text-transform: uppercase;
    font-weight: 600;
  }
  ul.Tools span.Division,
  ul.Tools :global(span.Division) {
    background: #eeeeee;
    height: 1px;
    cursor: default;
    position: relative;
  }
  ul.Tools span.Division.Short {
    width: 50%;
    margin: 10px auto;
  }
  ul.Tools span.Division.Long {
    width: 70%;
    margin: 4px auto;
  }
  ul.Tools :global(span.Division.Full) {
    width: 100%;
    margin: 4px auto;
  }
  span.Division.Last {
    margin-bottom: 0 !important;
  }
  .Tools .Tool.Export {
    background: #f6f6f6;
    border-radius: 0 0 10px 10px;
    padding: 15px 5px 11px;
    margin: 0;
  }
  .Tools :global(.Checkbox) {
    width: 12px;
    height: 12px;
    border-radius: 3px;
    position: relative;
    border: 2px solid var(--action);
  }
  .Tools :global(.Checkbox::after) {
    content: "";
    width: 5px;
    height: 5px;
    background: var(--action);
    border-radius: 1px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .Tools :global(.Checkbox.Unchecked::after) {
    content: inherit;
  }
  li.Tool ul :global(li.Children) {
    grid-template-columns: max-content 1fr max-content 13px;
  }
  li.Tool ul :global(li.Children ul) {
    top: inherit;
    bottom: -8px;
  }
  .Tool :global(li.Flags > svg.arrow),
  .Tool :global(li.Colours > svg.arrow) {
    transform: rotate(-90deg);
    position: inherit;
    top: inherit;
    right: inherit;
    height: 9px;
    width: auto;
  }
  ul.Tools p.Header.And {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    padding: inherit;
    width: 40px;
  }
  span.Notification {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #f05657;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  span.NewText {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: block;
    margin: 4px auto 8px;
    background: #333;
    position: relative;
  }
  span.NewText::before,
  span.NewText::after {
    content: "";
    width: 50%;
    height: 1px;
    border-radius: 10px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  span.NewText::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
</style>

<ul class="Tools">
  <li
    class="Tool Linear"
    class:Current={!params.sheet}
    on:click={() => {
      addParams('sheet', undefined);
    }}>
    <Linear />
    <p>Linear</p>
  </li>
  <li
    class="Tool Page"
    class:Current={params.sheet && params.sheet === 'page'}
    on:click={() => {
      addParams('sheet', 'page');
    }}>
    <Page />
    <p>Page</p>
  </li>
  <span class="Division Short" />
  <li
    class="Tool NewNote"
    on:click={() => {
      addNewNote = !addNewNote;
    }}>
    <span class="NewText" />
    <p>Text</p>
  </li>
  <span class="Division Short" />
  <ListStyleList {addParams} />
  <li class="Tool List Children">
    {#if params['styles'] || params['styleFlags'] || params['styleColour']}
      <span class="Notification" />
    {/if}
    <Styling />
    <p>Styling</p>
    <ul class="Styles">
      <StyleOptions {checkAll} {addArrParams} />
      <span class="Division Long" />
      <ColourList typeOf="style" {addArrParams} />
      <span class="Division Long" />
      <FlagsListStyle {buildUrl} {addArrParams} />
    </ul>
  </li>
  <li class="Tool List Filter Children">
    {#if params['filters'] || params['filterFlags'] || params['filterColour']}
      <span class="Notification" />
    {/if}
    <Filter />
    <p>Filter</p>
    <ul class="Filters">
      <FilterOptions {checkAll} {addArrParams} />
      <span class="Division Long" />
      <p class="Header">Display notes</p>
      <ColourList typeOf="filter" {addArrParams} />
      <span class="Division Long">
        <p class="Header And">and</p>
      </span>
      <FlagsListFilter {addArrParams} />
    </ul>
  </li>
  <span class="Division Short Last" />
  <li class="Tool Export">
    <Export />
    <p>Export</p>
  </li>
</ul>
