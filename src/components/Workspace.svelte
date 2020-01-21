<script>
  import Button from './Button.svelte'
  import Search from './Search.svelte'
  import ItemToggle from './ItemToggle.svelte'
  import List from './workspace/List.svelte'
</script>

<style>

.Toolbar {
  display: flex;
  height: 82px;
  padding-top: 41px;
  padding-bottom: calc(var(--base) * 0.25);
  top: 0;
  position: sticky;
  background-color: var(--main-background-color);

  z-index: 2;
}
.new-button {
  margin: 0 auto 0 0;
}
  
</style>

<nav class="Toolbar">
  <span class="new-button"><Button>+ New</Button></span>
  <Search />
  <ItemToggle />
</nav>
<List />