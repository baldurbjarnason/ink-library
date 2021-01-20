<script>
  import EmptySourcePasteForm from "./EmptySourcePasteForm.svelte";
  import EmptySourceUploadForm from "./EmptySourceUploadForm.svelte";
  import TitleBar from '../source-titlebar/TitleBar.svelte'
  export let page;
  export let source;
  let uploading = false;
  let pasting = false;
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
<div class="NoSource">
  <EmptySourceUploadForm bind:uploading {page} {source} />
  <EmptySourcePasteForm bind:pasting {page} {source} />
</div>
