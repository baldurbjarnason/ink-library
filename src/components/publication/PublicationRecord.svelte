<script>
  import {onMount, afterUpdate} from 'svelte';
  import {publication, workspaces, page, chapterId, storedPub, chapter} from '../../stores'
  import {send, receive} from './crossfade.js';
	import { fly } from 'svelte/transition';
  import { elasticInOut } from 'svelte/easing';
  import TitleBar from './reader/TitleBar.svelte'
  import ToolBar from './reader/ToolBar.svelte'
  import InfoToolBar from './reader/InfoToolBar.svelte'
  import MainReading from './reader/MainReading.svelte'
  import MainInfo from './reader/MainInfo.svelte'
  export let info = false
  let hash = "#Description"
  let scroll = false
  onMount(() => {
    hash = window.location.hash || "#Description"
  });
  function hashchange () {
    hash = window.location.hash
    scroll = true
  }
  afterUpdate(() => {
    const element = document.querySelector(hash)
    if (element && scroll) {
      element.scrollIntoView({behavior: "smooth"})
    }
  });
  $: if ($chapterId === null && $storedPub.readingOrder[0] && !$page.params.path) {
    $chapterId = $storedPub.readingOrder[0].url
  } else if ($page.params.path) {
    $chapterId = $page.params.path.join("/")
  } else {
    $chapterId = null
  }
</script>
<style>
.Publication {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr minmax(100vh, auto);
}
</style>
<svelte:window on:hashchange={hashchange}/>
<div class="Publication {hash.replace('#', '')}TabSelected">
<TitleBar />
{#if info}
  <InfoToolBar />
  <MainInfo />
{:else}
  <ToolBar />
  <MainReading />
{/if}
</div>