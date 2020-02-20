<script>
  import {onMount} from 'svelte'
  import { goto, stores } from "@sapper/app";
  const {page} = stores()
  export let query
  export let path
  let selectElement
  let selectedOption
  $: if ($page) {
    selectedOption = `${$page.query.orderBy}-${$page.query.dir}`
  }
  function sortItems (type) {
    let dir
    if (type.includes('asc')) {
      dir = 'asc'
    } else if (type.includes('desc')) {
      dir = 'desc'
    }
    const config = Object.assign({}, query, {orderBy: type.split('-')[0], dir})
    const url = `${path}?${new URLSearchParams(config).toString()}`
    console.log(url)
    if (query.orderBy !== config.orderBy || query.dir !== config.dir) {
      goto(url)
    }
  }
  function length (event) {
    if (event.target.value.includes("title")) {
      event.target.style.width = `11ch`
    } else if (event.target.value.includes("type")) {
      event.target.style.width = `11ch`
    } else if (event.target.value.includes("modified")) {
      event.target.style.width = `23ch`
    } else if (event.target.value.includes("added")) {
      event.target.style.width = `18ch`
    }
  }
  function changed (event) {
    length(event)
    return sortItems(event.target.value)
  }
  onMount(() => {
    length({target: selectElement})
  })
</script>

<style>
  
  label,
  select,
  option {
    color: var(--action);
    font-size: 0.85rem;
  }
  label {
    font-size: var(--item-font-size);
  }
  select {
    display: inline-block;
    color: var(--action);
    padding:calc(var(--base) * 0.25) 0;
    box-sizing: border-box;
    margin: 0;
    border: none;
    border-radius: 2px;
    padding-right: 1.5rem;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%228%22%20height%3D%224%22%20viewBox%3D%220%200%208%204%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M4%204L0.535899%200.25L7.4641%200.25L4%204Z%22%20fill%3D%22%2314457F%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, transparent 0%, transparent 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 8px auto, 100%;
  font-weight: 600;
    font-size: var(--item-font-size);
  }
  select::-ms-expand {
    display: none;
  }
  select:hover {
    border-color: var(--rc-main);
    cursor: pointer;
  }
</style>

<label>
<slot></slot>
<select name="sort-select" id="sort-select" on:change={changed} bind:this={selectElement}>
<option value="modified-asc" selected={selectedOption === "modified-asc"}>Date Modified, newest first</option>
<option value="modified-desc" selected={selectedOption === "modified-desc"}>Date Modified, oldest first</option>
<option value="title-asc" selected={selectedOption === "title-asc"}>Title, A-Z</option>
<option value="title-desc" selected={selectedOption === "title-desc"}>Title, Z-A</option>
</select></label>