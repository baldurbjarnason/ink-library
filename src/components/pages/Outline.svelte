<script>
  import { page, outlineNotesList, outline } from "../../stores";
  import { goto } from "@sapper/app";
  import { pageItem, refreshOutline, orderedOutlineNotes } from "../../stores";
  import DropAreaOutline from "./DropAreaOutline.svelte";
  import NotesColumn from "./NotesColumn.svelte";
  import NotesCard from "../notes/NotesCard.svelte";
  import OutlineTools from "./Tools/OutlineTools.svelte";
  import { getToken } from "../../getToken";
  import {
    pageNotes,
    refreshPageNotes,
    searchPageNotes,
  } from "../../stores/page/notes.js";

  let addNewNote = false,
    requesting = false,
    keyboardNote = false,
    disabled = true;

  let filters = {
    type: [],
    colour: [],
    flags: [],
    list: false,
  };



  $: notebookNotes = $pageNotes.items;
  $: outlineId =
    $outline && $outline.shortId ? $outline.shortId : $page.params.outlineId;
  $: outlineNotes = $orderedOutlineNotes;
  $: outlineInfo = $outline;
  $: droppedNotes = $outline.type === "loading" ? "loading" : outlineNotes;
</script>

<style>
  .Outline {
    width: 100vw;
    min-height: 100vh;
    background: #f9fbfc;
    display: grid;
    grid-template-columns: 1fr max-content;
  }
</style>

<main class="Outline">
  {#if droppedNotes}
    <DropAreaOutline
      items={outlineNotes}
      bind:keyboardNote
      bind:requesting
      bind:disabled
      {outlineInfo}
      {filters} />
  {:else}
    <div />
  {/if}
  <NotesColumn
    items={notebookNotes}
    {requesting}
    bind:keyboardNote
    bind:disabled />
  <OutlineTools bind:addNewNote bind:filters bind:disabled />
</main>
