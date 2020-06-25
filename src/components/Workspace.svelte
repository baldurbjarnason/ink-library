<script>
  import NewItem from './workspace/NewItem.svelte'
  import Search from './Search.svelte'
  import WorkspaceMenu from './WorkspaceMenu.svelte'
  import List from './workspace/List.svelte'
  export let workspace
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
.Toolbar::before{
  content: '';
  background: var(--main-background-color);
  width: calc(100% + 20px);
  height: 100%;
  position: absolute;
  top: 0;
  left: -5px;
  z-index: -1;
}
  @media (max-width: 720px) {
    .Toolbar {
      height: calc(var(--base) * 6);
      padding: calc(var(--base) * 1.5) calc(var(--base) * 2);
      position: relative;
      top: 0;
      background-color: transparent;
    }
  }
</style>

<WorkspaceMenu {workspace} />

<nav class="Toolbar">
  <NewItem {workspace} />
  <Search />
</nav>
<List />