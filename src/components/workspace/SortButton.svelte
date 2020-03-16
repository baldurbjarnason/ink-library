<script>
  import HeaderArrows from './HeaderArrows.svelte'
  export let query
  export let path
  export let type
  export let selected
  let url, sorting
  $: if (query.orderBy === type) {
    selected = true;
  } else {
    selected = false
  }
  $: if (query) {
    url = `${path}${sortQuery(type)}`
  }
  function flipDirection (direction) {
    sorting = direction === 'asc' ? 'desc' : 'asc';
    return sorting
  }
  function sortQuery (type) {
    const config = Object.assign({}, query, {orderBy: type})
    if (query.orderBy === type) {
      config.dir = flipDirection(query.dir)
    } else {
      config.dir = 'asc'
    }
    return '?' + new URLSearchParams(config).toString()
  }
</script>

<style>
  a.HeaderSort {
    text-decoration: none;
    color: var(--all-workspace);
    border-radius: 6px;
    padding: calc(var(--base) * 0.25);
    background-color: #fdfefe;
  }
  a.HeaderSort.selected {
    background-color:var(--workspace-color);
    color: white;
  }
  a.HeaderSort:link:hover {
    background-color:var(--hover);
    color: white;
  }
</style>
<a href="{url}" class="HeaderSort" class:selected><HeaderArrows arrow={selected ? sorting : false} /> <slot></slot></a>