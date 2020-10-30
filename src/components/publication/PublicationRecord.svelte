<script>
  import { onMount, afterUpdate } from "svelte";
  import {
    publication,
    workspaces,
    page,
    chapterId,
    storedPub,
    chapter
  } from "../../stores";
  import { guard } from "../../stores/utilities/ssr-guard.js";
  import { elasticInOut } from "svelte/easing";
  import TitleBar from "./reader/TitleBar.svelte";
  import ToolBar from "./reader/ToolBar.svelte";
  import InfoToolBar from "./reader/InfoToolBar.svelte";
  import MainReading from "./reader/MainReading.svelte";
  import MainInfo from "./SourceInfo/MainInfo.svelte";
  import EmptySource from "./EmptySource.svelte";
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
  $: if (
    $chapterId === null &&
    $storedPub.readingOrder[0] &&
    !$page.params.path
  ) {
    $chapterId = $storedPub.readingOrder[0].url;
  } else if ($page.params.path) {
    $chapterId = $page.params.path.join("/");
  } else {
    $chapterId = null;
  }
</script>

<style>
  .Publication {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr minmax(100vh, auto);
  }
  .Publication.Info {
    grid-template-rows: 1fr minmax(100vh, auto);
  }
</style>

<svelte:window on:hashchange={hashchange} />
<div
  class="Publication {hash.replace('#', '')}TabSelected {$page.path.endsWith('info') ? 'Info' : ''}">
  <TitleBar />
  {#if info}
    <!--
    <InfoToolBar />-->
    <MainInfo />
  {:else if $storedPub.type === 'Loading'}
    <ToolBar root={readerBody} hidden={true} />
    <MainReading bind:readerBody hidden={true} />
  {:else if $storedPub.type === 'NoFile' || $storedPub.type === 404}
    <EmptySource />
  {:else}
    <ToolBar root={readerBody} />
    <MainReading bind:readerBody />
  {/if}
</div>
