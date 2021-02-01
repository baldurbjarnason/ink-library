<script lang="ts">
  import EmptySourcePasteForm from "./EmptySourcePasteForm.svelte";
  import EmptySourceUploadForm from "./EmptySourceUploadForm.svelte";
  import TitleBar from '../source-titlebar/TitleBar.svelte';
	import { onMount } from 'svelte';
  export let source;
  let uploading = false;
  let pasting = false;
  let Info
  onMount(async () => {
    const module = await import('./EmptyInfo.svelte');
    Info = module.default;
  });
</script>

<style>
  /* your styles go here */
  .NoSource {
    grid-column: 1 / -1;
    grid-row: 2 / -1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
    min-height: 100vh;
  }
  /* .TitleBar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  } */
</style>

<div class="TitleBar">
  <TitleBar returnLink="/library/all/all" name={source.name} />
</div>

<svelte:component this={Info} />

<div class="NoSource">
  <EmptySourceUploadForm bind:uploading {source} />
  <EmptySourcePasteForm bind:pasting {source} />
</div>
