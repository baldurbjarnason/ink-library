<script>
  //https://github.com/isaacHagoel/svelte-dnd-action
  import { onMount } from "svelte";
  import NoNotes from "../img/NoNotes.svelte";
  import NoteCardOutline from "./Tools/NoteCardOutline.svelte";
  import NewHeaderCard from "./Tools/NewHeaderCard.svelte";
  import NewNoteCard from "./Tools/NewNoteCard.svelte";
  import OutlineHeader from "./Tools/OutlineHeader.svelte";
  import Loader from "../Loader.svelte";
  import { getToken } from "../../getToken";
  import { flip } from "svelte/animate";
  import {
    dndzone,
    TRIGGERS,
    SHADOW_ITEM_MARKER_PROPERTY_NAME,
  } from "svelte-dnd-action";
  import { fade } from "svelte/transition"; // fade in works, but fade-out is a known issue
  import { cubicIn } from "svelte/easing";
  import { pageItem, page, outline, refreshOutline } from "../../stores";
  export let items;
  export let requesting;
  export let outlineInfo;
  export let filters;

  $: params = $page.query;
  $: isTransitioning =
    items !== "loading" ? !!items.find((i) => i.isByeBye || i.isHi) : "";
  const flipDurationMs = 300;
  let dropTargetStyle;

  function handleSort(e) {
    items = e.detail.items;
    dropTargetStyle = {
      background: "rgba(241, 245, 248, 1)",
    };
  }

  function handleDrop(e) {
    handleSort(e);
    arrangement(e);
  }

  async function deleteItem(id) {
    if (!items.length) return;

    let note = { shortId: id };
    requesting = true;
    try {
      await fetch(
        `/api/pages/${$page.params.pageId}/outlines/${$page.params.outlineId}/notes`,
        {
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify(note),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "csrf-token": getToken(),
          },
        }
      );
      $refreshOutline = { id: $outline.id, time: Date.now() };
      requesting = false;
    } catch (err) {
      console.error(err);
    }
  }

  async function addNote(note, request) {
    requesting = true;
    try {
      await window.fetch(
        `/api/pages/${$page.params.pageId}/outlines/${$page.params.outlineId}/notes`,
        {
          method: request,
          credentials: "include",
          body: JSON.stringify(note),
          headers: {
            "Content-Type": "application/json",
            "csrf-token": getToken(),
          },
        }
      );

      $refreshOutline = { id: $outline.id, time: Date.now() };
      requesting = false;
    } catch (err) {
      console.error(err);
    }
  }

  function arrangement(e) {
    let id = e.detail.info.id;
    let index;
    items.find((note, i) => {
      if (id === note.id) index = i;
    });

    const request = items[index]["contextId"] ? "PATCH" : "POST";

    let note = {
      shortId: items[index].shortId,
      fresh: items[index].fresh,
    };

    if (note.fresh) {
      note["body"] = items[index].body;
      note["json"] = items[index].json;
    }

    if (request === "PATCH") {
      note["next"] = null;
      note["previous"] = null;
    }

    if (index === 0) {
      if (items.length > 1) note["next"] = items[index + 1].shortId;
    } else {
      note["previous"] = items[index - 1].shortId;
      if (items.length > index + 1) note["next"] = items[index + 1].shortId;
    }

    if (request === "PATCH" && !note.next && !note.previous) return;
    addNote(note, request);
  }

  let assignComp = (item) => {
    if (item.json && item.json.type === "header") return NewHeaderCard;
    else if (item.json && item.json.type === "note") return NewNoteCard;
    else return NoteCardOutline;
  };
</script>

<style>
  .Workarea {
    padding: 30px;
    display: grid;
    gap: 30px;
    position: relative;
    grid-template-rows: max-content max-content;
  }
  * {
    box-sizing: border-box;
  }
  ul.ItemsList {
    min-height: calc(90vh - 100px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0 auto;
    width: 70%;
    padding: 5%;
    border-radius: 30px;
    transform: translateX(40px);
    list-style-type: none;
    counter-reset: items;
  }
  li.Item {
    position: relative;
  }
  li.Hide {
    display: none;
  }
  li.header:not(.Hide) + li {
    counter-reset: items;
  }
  li:not(.header)::before {
    color: var(--workspace-color);
    font-size: 0.9rem;
    font-weight: 500;
    counter-increment: items;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(calc(-100% - 7px));
  }
  ul.ItemsList.alpha li:not(.header)::before {
    content: counter(items, upper-alpha) ". ";
  }
  ul.ItemsList.roman li:not(.header)::before {
    content: counter(items, upper-roman) ". ";
  }
  ul.ItemsList.decimal li:not(.header)::before {
    content: counter(items, decimal) ". ";
  }
  ul.ItemsList.bPoint li:not(.header)::before {
    content: counter(items, disc);
    font-size: 2rem;
    line-height: 1.5rem;
  }
  .custom-shadow-item {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    visibility: visible;
    opacity: 0.5;
    margin: 0;
  }
  :global(.custom-shadow-item:first-child) {
    background: blue;
  }
  .hi {
    animation: fadeIn 900ms ease;
  }
  .bye {
    animation: fadeOut 900ms ease;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .EmptyOutline {
    position: absolute;
    left: calc(50% + 40px);
    top: 50%;
    display: grid;
    gap: 20px;
    transform: translate(-50%, -50%);
  }
  .EmptyOutline div {
    display: grid;
    text-align: center;
  }
  .EmptyOutline p {
    font-size: 0.9rem;
    color: var(--action);
    font-weight: 600;
    margin: 0;
    opacity: 0.5;
  }
  li.Item.header {
    transform: translateX(-20px);
  }
</style>

<div class="Workarea">
  <OutlineHeader {outlineInfo} notebook={$pageItem.notebook} />
  {#if requesting || items === 'loading'}
    <ul class="ItemsList">
      <Loader />
    </ul>
  {:else}
    <ul
      class={`ItemsList ${filters.list ? filters.list : ''}`}
      use:dndzone={{ items, flipDurationMs, dragDisabled: isTransitioning, dropFromOthersDisabled: isTransitioning, dropTargetStyle }}
      on:consider={handleSort}
      on:finalize={handleDrop}>
      {#each items as item, i (item.id)}
        <li
          class="Item {item.json ? item.json.type : ''}"
          class:Hide={(item.json && filters.type.some((type) => type === item.json.type)) || (!item.json && item.tags.some((item) => filters.colour.includes(item.name) || filters.flags.includes(item.name)))}
          animate:flip={{ duration: flipDurationMs }}>
          {#if (item.json && !filters.type.some((type) => type === item.json.type)) || (!item.json && !item.tags.some((item) => filters.colour.includes(item.name) || filters.flags.includes(item.name)))}
            <svelte:component this={assignComp(item)} {item} />
            {#if item[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
              <div
                in:fade={{ duration: 200, easing: cubicIn }}
                class="custom-shadow-item {item.isByeBye ? 'bye' : item.isHi ? 'hi' : ''}">
                <svelte:component this={assignComp(item)} {item} />
              </div>
            {/if}
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
  {#if !items.length}
    <div class="EmptyOutline">
      <NoNotes />
      <div>
        <p>Your outline is empty</p>
        <p>Drop some notes</p>
      </div>
    </div>
  {/if}
</div>
