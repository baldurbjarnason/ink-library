<script>
  import Button from './Button.svelte'
  import Search from './Search.svelte'
  import ItemToggle from './ItemToggle.svelte'
</script>

<style>

.Toolbar {
  display: flex;
}
.new-button {
  margin: 0 auto 0 0;
}
  
</style>

<nav class="Toolbar">
  <span class="new-button"><Button>+ New</Button></span>
  <Search>Search...</Search>
  <ItemToggle />
</nav>