<script>
  import Workspace from '../../components/Workspace.svelte';
  import { library as libraryStore } from '../../stores';
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  export let library;
  $: if (library) {
    libraryStore.set(library)
  }
</script>
<script context="module">
  import { preload as _preload } from "./_preload.js";
  export const preload = _preload;
</script>

<Workspace></Workspace>