<script>
  import { goto } from "@sapper/app";
  let sort
  export let query
  export let path
  $: if (sort) {
    sortItems(sort)
  }
  function sortItems (type) {
    if (type.includes('added')) return
    let dir
    if (type.includes('asc')) {
      dir = 'asc'
    } else if (type.includes('desc')) {
      dir = 'desc'
    }
    const config = Object.assign({}, query, {sortBy: type.split('-')[0], dir})
    const url = `${path}?${new URLSearchParams(config).toString()}`
    if (query.sortBy !== config.sortBy && config.sortBy !== 'added') {
      goto(url)
    } else if (config.sortBy === 'added' && query.dir !== config.dir) {
      goto(url)
    }
  }
</script>

<style>
  
  label,
  select,
  option {
    font-size: 0.85rem;
  }
  select {
    display: inline-block;
    color: var(--dark);
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
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%228%22%20height%3D%224%22%20viewBox%3D%220%200%208%204%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M4%204L0.535899%200.25L7.4641%200.25L4%204Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fsvg%3E"),
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

<label><select name="sort-select" id="sort-select" bind:value={sort}>
<option value="title-desc">Title, Z-A</option>
<option value="type-asc">Type, A-Z</option>
<option value="type-desc">Type, Z-A</option>
<option value="modified-asc">Modified, oldest first</option>
<option value="modified-desc">Modified, newest first</option>
</select></label>