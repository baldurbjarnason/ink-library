<script>
  import { onMount, afterUpdate } from "svelte";
  import {
    publication,
    workspaces,
    page,
    chapterId,
    storedPub,
    chapter,
    nodes,
    intersecting,
    positions
  } from "../../stores";
  import {guard} from "../../stores/utilities/ssr-guard.js"
  import { elasticInOut } from "svelte/easing";
  import TitleBar from "./reader/TitleBar.svelte";
  import ToolBar from "./reader/ToolBar.svelte";
  import InfoToolBar from "./reader/InfoToolBar.svelte";
  import MainReading from "./reader/MainReading.svelte";
  import MainInfo from "./reader/MainInfo.svelte";
  export let info = false;
  let hash = "#Description";
  let scroll = false;
  let readerBody;
  // we can't scope this to readerBody because then we have to wait for readerBody to become non-nullish and that makes Svelte complain about the stores.
  const watched = guard(nodes)("[data-annotation-id]")
  const visible = guard(intersecting)(watched, {rootMargin: "40px 0px 0px 0px", threshold: 0.1})
  const positioned = guard(positions)(watched, {rootMargin: "0px 0px 1500px 0px", threshold: 0.1})
  $: console.log($watched, $visible, $positioned)
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
</style>

<svelte:window on:hashchange={hashchange} />
<div class="Publication {hash.replace('#', '')}TabSelected">
  <TitleBar />
  {#if info}
    <InfoToolBar />
    <MainInfo />
  {:else}
    <ToolBar root={readerBody} />
    <MainReading bind:readerBody />
  {/if}
</div>
