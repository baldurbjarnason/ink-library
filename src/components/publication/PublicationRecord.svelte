<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import {
    workspaces,
    chapterId,
  } from "../../stores";
  import {guard} from "../../stores/utilities/ssr-guard.js"
  import { elasticInOut } from "svelte/easing";
  import TitleBar from "./reader/TitleBar.svelte";
  import ToolBar from "./reader/ToolBar.svelte";
  import InfoToolBar from "./reader/InfoToolBar.svelte";
  import MainReading from "./reader/MainReading.svelte";
  import MainInfo from "./reader/MainInfo.svelte";
  import EmptySource from "./EmptySource.svelte"
  import {publicationStores} from '../../stores/utilities/publicationStores.js'
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  const {publication} = publicationStores(page)
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
    // $chapterId = null
  })
</script>

<style>
  .Publication {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr minmax(100vh, auto);
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
<div class="Publication {hash.replace('#', '')}TabSelected">
  <TitleBar />
  {#if $publication}
    {#if info}
      <InfoToolBar />
      <MainInfo />
    {:else if $publication._processing}  
      <ToolBar root={readerBody} hidden={true} />
      <div class="Processing">Processing...</div>
    {:else if !$publication._empty}
      <ToolBar root={readerBody} />
      <MainReading bind:readerBody />
    {:else}
      <EmptySource />
    {/if}
  {/if}
</div>
