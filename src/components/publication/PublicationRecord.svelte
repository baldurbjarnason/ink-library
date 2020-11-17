<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import TitleBar from "./reader/TitleBar.svelte";
  import ToolBar from "./reader/ToolBar.svelte";
  import MainReading from "./reader/MainReading.svelte";
  import MainInfo from "./SourceInfo/MainInfo.svelte";
  import EmptySource from "./EmptySource.svelte";
  import { publicationStores } from "../../stores/utilities/publicationStores.js";
  import { stores } from "@sapper/app";
  const { page } = stores();
  const { publication } = publicationStores(page);
  export let info = false;
  let hash = "#Description";
  let scroll = false;
  let readerBody;
  onMount(() => {
    hash = window.location.hash || "#Description";
  });
  function hashchange() {
    hash = window.location.hash;
    scroll = true;
  }
  afterUpdate(() => {
    const element = document.querySelector(hash);
    if (element && scroll) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  });
  onDestroy(() => {
    // poller = null
  });
  $: if ($publication._error) {
    console.log($publication._error);
  }
  // $: console.dir($publication)
  let download;
  $: if ($publication && $publication.json && $publication.json.storageId) {
    download = `/api/download/${$publication.json.storageId}`;
  } else {
    download = "";
  }
</script>

<style>
  .Publication {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr minmax(100vh, auto);
  }
  .Publication.Info {
    grid-template-rows: max-content max-content minmax(100vh, auto);
  }
  .Processing {
    grid-row: 2 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 25%;
  }
</style>

<svelte:window on:hashchange={hashchange} />
<div
  class="Publication {hash.replace('#', '')}TabSelected {$page.path.endsWith('info') ? 'Info' : ''}">
  <TitleBar />
  {#if $publication}
    {#if info}
      <InfoToolBar />
      <MainInfo />
    {:else if $publication._processing}
      <ToolBar root={readerBody} hidden={true} />
      <div class="Processing">Processing...</div>
      <MainReading bind:readerBody hidden={true} />
    {:else if $publication._unsupported}
      <ToolBar root={readerBody} hidden={true} />
      <MainReading bind:readerBody hidden={true} />
      <div class="Processing">
        Ink doesn't support displaying this file but you can
        <a href={download}>download it.</a>
      </div>
    {:else if !$publication._empty}
      <ToolBar root={readerBody} />
      <MainReading bind:readerBody />
    {:else}
      <EmptySource />
    {/if}
  {/if}
</div>
