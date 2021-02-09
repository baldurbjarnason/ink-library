<script>
  import { afterUpdate, setContext } from "svelte";
  import { writable } from "svelte/store";
  import { title } from "../../stores/title.js";
  import { source$, chapter$ } from "../../../state/state";
  import History from "../History.svelte";
  import { bookmarks$ } from "../../../state/models/Bookmark";
  import Chapter from "./source-chapter/Chapter.svelte";
  // import TitleBar from '../../../../components/source/source-titlebar/TitleBar.svelte';
  import InfoModal from "./source-info/InfoModal.svelte";
  import ToolBar from "./source-toolbar/ToolBar.svelte";
  import InfoToolBar from "../publication/reader/InfoToolBar.svelte";
  import MainInfo from "./source-info/Info.svelte";
  // import EmptySource from "../../../../components/publication/EmptySource.svelte";
  import { stores } from "@sapper/app";
  const { page } = stores();
  let base;
  let download;
  let media;
  $: if ($page.params.storage && $page.params.id) {
    base = `sources/${$page.params.id}/${$page.params.storage}`;
    download = `/api/download/${$page.params.storage}`;
    media = `/api/stored/${$page.params.storage}`;
  } else {
    base = "";
    download = "";
    media = "";
  }
  // let queryString
  // $: if ($page.query) {
  //   queryString = "?" + new URLSearchParams($page.query).toString()
  // } else {
  //   queryString = ""
  // }
  function url(path) {
    return `sources/${$page.params.id}/${$page.params.storage}/${path}`;
  }
  setContext("url", url);
  function current(path) {
    return `sources/${$page.params.id}/${
      $page.params.storage
    }/${$page.params.chapter.join("/")}`;
  }
  setContext("current", current);
  const sidebar = writable({
    tab: "toc",
    hidden: false,
  });
  setContext("sidebar", sidebar);
  let hash;
  afterUpdate(() => {
    const element = document.querySelector(hash);
    if (element && scroll) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  });
  // export let info = false

  let readerBody;
  $: if ($source$ && $source$.name) {
    $title = $source$.name + " - Rebus Ink";
  }
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
  .TitleBar {
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: var(--all-workspace);
    position: sticky;
    top: 0;
    z-index: 2;
  }
  .TitleBar * {
    color: #ffffff;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 1rem 0.45rem;
  }
  .TitleBar ol li a {
    color: var(--reader-toolbar-color);
  }
</style>

<svelte:window />
<div
  class="Publication TabSelected {$page.path.endsWith('info') ? 'Info' : ''}">
  {#if $source$ && $chapter$}
    <nav class="TitleBar" aria-label="Publication">
      <ol>
        <li>
          <History />
          <!--
          <a href="/library/all/all">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="1.70688"
                y="5.29285"
                width="9"
                height="2"
                rx="0.999999"
                transform="rotate(45 1.70688 5.29285)"
                fill="currentColor"
                fill-opacity="0.8" />
              <rect
                x="1.99985"
                y="5.50012"
                width="12"
                height="2"
                rx="1"
                fill="currentColor"
                fill-opacity="0.8" />
              <rect
                x="7.77817"
                y="1.41418"
                width="9"
                height="2"
                rx="0.999999"
                transform="rotate(135 7.77817 1.41418)"
                fill="currentColor"
                fill-opacity="0.8" />
            </svg>
          </a>-->
        </li>
        <li>
          <span class="Title">{$source$.name}</span>
        </li>
        <li>
          <a class="modal_link" href="#id-source-info" rel="external">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle
                cx="8"
                cy="8"
                r="7.25"
                stroke="currentColor"
                stroke-opacity="0.8"
                stroke-width="1.5" />
              <rect
                x="7"
                y="6.5"
                width="2"
                height="6.5"
                rx="1"
                fill="currentColor"
                fill-opacity="0.8" />
              <circle
                cx="8"
                cy="4.5"
                r="1"
                fill="currentColor"
                fill-opacity="0.8" />
            </svg>
          </a>
        </li>
      </ol>
    </nav>

    <InfoModal let:modal>
      <InfoToolBar />
      <MainInfo />
    </InfoModal>
    <ToolBar {sidebar} />
    <Chapter
      chapter={$chapter$}
      sourceNotes={$bookmarks$}
      path={$page.params.chapter.join('/')}
      bind:readerBody
      {sidebar}
      {media} />
    <!-- {#if $source$._processing}
      <ToolBar root={readerBody} hidden={true} />
      <div class="Processing">Processing...</div>
      <Chapter chapter={$chapter$} path={$page.params.chapter.join("/")} hidden={true} bind:readerBody />
    {:else if $source$._unsupported}
      <ToolBar root={readerBody} hidden={true} />
      <Chapter chapter={$chapter$} path={$page.params.chapter.join("/")} hidden={true} bind:readerBody />
      <div class="Processing">
        Ink doesn't support displaying this file but you can
        <a href={download}>download it.</a>
      </div>
    {:else if !$source$._empty}
      <ToolBar root={readerBody} {sidebar} />
      <Chapter chapter={$chapter$} sourceNotes={$sourceNotes$} path={$page.params.chapter.join("/")} bind:readerBody {sidebar} {media} />
    {:else}
      <EmptySource />
    {/if} -->
  {/if}
</div>
