<script>
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import {source$, chapter$} from '../../../../../state/state.ts'
  import Chapter from '../../../../../components/source/source-reader/Chapter.svelte';
  import TitleBar from '../../../../../components/source/source-reader/TitleBar.svelte';
  import ToolBar from "../../../../components/publication/reader/ToolBar.svelte";
  import InfoToolBar from "../../../../components/publication/reader/InfoToolBar.svelte";
  import MainInfo from "../../../../components/publication/SourceInfo/MainInfo.svelte";
  import EmptySource from "../../../../components/publication/EmptySource.svelte";
  import {stores} from "@sapper/app";
  const {page} = stores()
  let base
  let download
  $: if ($page.params.storage && $page.params.id) {
    base = `sources/${$page.params.id}/${$page.params.storage}`
    download = `/api/download/${$page.params.storageId}`;
  } else {
    base = ""
    download = "";
  }
  let hash
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
  export let info = false

  let readerBody;
</script>

<style>
  .Publication {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto minmax(100vh, auto);
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
  class="Publication TabSelected {$page.path.endsWith('info') ? 'Info' : ''}">
  {#if $source$ && $chapter$}
    <TitleBar name={$source$.name} />
    {#if info}
      <InfoToolBar />
      <MainInfo />
    {:else if $source$._processing}
      <ToolBar root={readerBody} hidden={true} />
      <div class="Processing">Processing...</div>
      <Chapter chapter={$chapter$} {base} path={$page.params.chapter.join("/")} hidden={true} bind:readerBody />
    {:else if $source$._unsupported}
      <ToolBar root={readerBody} hidden={true} />
      <Chapter chapter={$chapter$} {base} path={$page.params.chapter.join("/")} hidden={true} bind:readerBody />
      <div class="Processing">
        Ink doesn't support displaying this file but you can
        <a href={download}>download it.</a>
      </div>
    {:else if !$source$._empty}
      <ToolBar root={readerBody} />
      <Chapter chapter={$chapter$} {base} path={$page.params.chapter.join("/")} bind:readerBody />
    {:else}
      <EmptySource />
    {/if}
  {/if}
</div>