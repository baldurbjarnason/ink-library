<script>
  import IcoNewNote from "../../img/IcoNewNote.svelte";
  import OutlineIcoHeader from "../../img/OutlineIcoHeader.svelte";
  import OutlineIcoThought from "../../img/OutlineIcoThought.svelte";
  import Linear from "../../img/OutlineIcoLinear.svelte";
  import Columns from "../../img/OutlineIcoColumns.svelte";
  import Page from "../../img/OutlineIcoPage.svelte";
  import Filter from "../../img/OutlineIcoFilter.svelte";
  import Export from "../../img/OutlineIcoExport.svelte";
  import FlagsListFilter from "./OutlineTools/FlagsListFilter.svelte";
  import ColourList from "./OutlineTools/ColourList.svelte";
  import ListStyleList from "./OutlineTools/ListStyleList.svelte";
  import FilterOptions from "./OutlineTools/FilterOptions.svelte";
  import NewOutlineNote from "./NewOutlineNote.svelte";
  import { page } from "../../../stores";
  import { goto } from "@sapper/app";
  import { getToken } from "../../../getToken";

  export let addNewNote;
  export let filters;
  export let disabled;

  // NOTE FROM MARIE: don't know why the api-server is wrong on production, but hard coding seems to fix it for now.
  let server = process.env.NODE_ENV==="development" || "dev" ? process.env.API_SERVER : "https://ink-api-dev-dot-thematic-cider-139815.appspot.com/" 

  let checkAll = () => {
    filters.type = [];
    filters.colour = [];
    filters.flags = [];
  };

  let addParams = (value) => {
    filters.list = value;
  };

  let addArrParams = (filter, value) => {
    if (filters[filter].includes(value)) {
      filters[filter].splice(filters[filter].indexOf(value), 1);
      filters[filter] = filters[filter];
    } else filters[filter] = [...filters[filter], value];
  };
  let downloadDocx = async () => {
    const url = `${server}outlines/${$page.params.outlineId}/docx`;
    window.location.replace(url);
  }
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
  ul.Tools > li:hover,
  li.NewNote.Active {
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
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #f05657;
    position: absolute;
    top: 5px;
    right: 5px;
  }
  .NewItem {
    position: absolute;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
    border: none;
  }
  .Export p.Message {
    display: none;
    background: rgba(0, 34, 48, 0.9);
    font-size: 0.7rem;
    color: #fff;
    padding: 3px 10px;
    font-weight: 500;
    bottom: 0;
    margin: 0;
    left: 50%;
    text-transform: capitalize;
    position: absolute;
    border-radius: 5px;
    transform: translate(-50%, calc(100% + 5px));
  }
  .Export:hover p.Message {
    display: block;
  }
  .Export p.Message::after {
    content: "";
    top: -9px;
    left: 50%;
    width: 0px;
    height: 0px;
    border-radius: 3px;
    position: absolute;
    border-style: solid;
    border-width: 6px;
    transform: translate(-50%, 3px) rotate(45deg);
    border-color: rgba(0, 34, 48, 0.9) transparent transparent
      rgba(0, 34, 48, 0.9);
  }
</style>

<ul class="Tools">
  <li class="Tool NewNote {addNewNote === 'header' ? 'Active' : ''}">
    <button
      class="NewItem"
      on:click={() => {
        addNewNote = !addNewNote || addNewNote !== 'header' ? 'header' : false;
      }} />
    <OutlineIcoHeader />
    <p>Header</p>
    {#if addNewNote === 'header'}
      <NewOutlineNote type={'header'} bind:addNewNote bind:disabled />
    {/if}
  </li>
  <li class="Tool NewNote {addNewNote === 'note' ? 'Active' : ''}">
    <button
      class="NewItem"
      on:click={() => {
        addNewNote = !addNewNote || addNewNote !== 'note' ? 'note' : false;
      }} />
    <OutlineIcoThought />
    <p>Thought</p>
    {#if addNewNote === 'note'}
      <NewOutlineNote type={'note'} bind:addNewNote bind:disabled />
    {/if}
  </li>
  <span class="Division Short" />
  <!--<ListStyleList {addParams} bind:filters />
  <li class="Tool List Filter Children">
    {#if filters.colour.length || filters.flags.length || filters.type.length}
      <span class="Notification" />
    {/if}
    <Filter />
    <p>Filter</p>
    <ul class="Filters">
      <FilterOptions {checkAll} {addArrParams} {filters} />
      <span class="Division Long" />
      <p class="Header">Display notes</p>
      <ColourList {addArrParams} bind:filters />
      <span class="Division Long">
        <p class="Header And">and</p>
      </span>
      <FlagsListFilter {addArrParams} bind:filters />
    </ul>
  </li> -->
  <span class="Division Short Last" />
  <li class="Tool Export">
    <button
    class="NewItem"
    on:click={downloadDocx} />
    <Export />
    <p>Export</p>
  </li>
</ul>
