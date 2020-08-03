<script>
  import { note } from "../stores";
  import NewNote from "./notes/NewNote.svelte";
  import Search from "./Search.svelte";
  import ItemToggle from "./ItemToggle.svelte";
  import WorkspaceMenu from "./WorkspaceMenu.svelte";
  import NotesList from "./notes/NotesList.svelte";
  import NoteEdit from "./notes/NoteEdit.svelte";
  import Button from "./widgets/Button.svelte";
  export let id = false;
  export let workspace;
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
    justify-content: space-between;
    z-index: 2;
  }
  .Body {
    display: grid;
    grid-gap: 1rem;
  }
  .NotesEditor {
    grid-template-columns: 0.3fr 1fr;
  }
  .Tools {
    display: none;
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
  <div class="Tools">
    <Button light={true}>Outline</Button>
    <Button light={true}>Mindmap</Button>
    <Button light={true}>Grouping</Button>
  </div>
</nav>

<div class="Body" class:NotesEditor={id}>
  <div>
    <NotesList />
  </div>
  {#if id}
    <NoteEdit note={$note} />
  {/if}
</div>
