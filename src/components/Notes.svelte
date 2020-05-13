<script>
  import NewNote from './notes/NewNote.svelte'
  import Search from './Search.svelte'
  import ItemToggle from './ItemToggle.svelte'
  import WorkspaceMenu from './WorkspaceMenu.svelte'
  import NotesList from './notes/NotesList.svelte'
  import Button from './widgets/Button.svelte'
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
  <NewNote {workspace} />
  <div>
    <Button light={true}>Outline</Button>
    <Button light={true}>Mindmap</Button>
    <Button light={true}>Grouping</Button>
  </div>
</nav>
<NotesList />