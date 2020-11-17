<script>
  //import { afterUpdate, tick } from "svelte";
  import { send, receive } from "../../routes/_crossfade.js";
  //////////May leave
  ///////////Change for add item icon or something
  import NotesSearch from "../NotesSearch.svelte";
  import Search from "../Search.svelte";
  import Button from "../widgets/Button.svelte";
  import NewNote from "../notes/NewNote.svelte";
  import NewItem from "../workspace/NewItem.svelte";
  import { getToken } from "../../getToken";
  import { refreshNotebook, page } from "../../stores";
  import { searchedNotes } from "../../stores/notebook/notes.js";
  import { searchedSources } from "../../stores/notebook/sources.js";
  import NotesFound from "./AddingItems/NotesFound.svelte";
  import AddThis from "./AddingItems/AddThis.svelte";
  import TopMenu from "./AddingItems/TopMenu.svelte";
  import Loader from "../Loader.svelte";
  import { goto } from "@sapper/app";

  export let notebook;
  let open = false;
  let newToggle;

  function click() {
    open = !open;
    if ($page.query.notebook) goto($page.path);
  }

  function ntbkClose(nulled) {
    open = false;
    addItem = undefined;
    if (nulled !== "cancel")
      $refreshNotebook = { id: notebook.id, time: Date.now() };
  }

  let itemType = "source";
  let itemState = "existent";

  let foundItems = [];
  $: foundItems =
    itemType === "source" ? $searchedSources.items : $searchedNotes.items;
  $: loader =
    itemType === "source" ? $searchedSources.type : $searchedNotes.type;

  let searchTool = itemType => {
    switch (itemType) {
      case "source":
        return Search;
      case "note":
        return NotesSearch;
    }
  };

  let addItem = false;
  function addThis(item) {
    addItem = item;
  }
  function removeThis() {
    addItem = undefined;
  }

  function menu(type, state) {
    if (type) itemType = type;
    if (state) itemState = state;
    addItem = undefined;
  }

  async function submit(event) {
    event.preventDefault();
    try {
      await window.fetch(
        `/api/notebooks/${notebook.id}/${itemType}s/${addItem.shortId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "csrf-token": getToken()
          }
        }
      );

      ntbkClose();
      $refreshNotebook = { id: notebook.id, time: Date.now() };
    } catch (err) {
      console.error(err);
    }
  }
</script>

<style>
  .new-button {
    justify-content: center;
    flex-direction: column;
    display: flex;
  }
  .new-button :global(.Button) {
    padding: 0.65rem 1.95rem 0.6rem;
  }
  .new-button :global(svg) {
    float: left;
  }
  .new-button :global(span) {
    float: left;
    margin-top: 2px;
    margin-left: 10px;
  }
  .NewBox {
    position: absolute;
    background-color: var(--workspace-color);
    color: #fff;
    left: 20px;
    width: calc(100% - 40px);
    top: 20px;
    z-index: 3;
    border-radius: 30px;
    padding: 30px 40px;
  }
  /* ------ Footer btns ------ */
  :global(.Button) {
    float: right;
  }
  footer .Closer {
    width: 125px;
    height: 34px;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  footer .Closer:hover {
    text-decoration: underline;
  }
  footer .Closer p {
    font-size: 0.8rem;
    margin: 0;
    font-weight: 500;
  }
  .searchItems :global(label.Button:focus-within ~ ul),
  .searchItems :global(.SearchBox:focus-within ~ ul),
  .searchItems:active :global(ul) {
    display: block;
  }
  .searchItems :global(ul) {
    display: none;
  }
  /*------ New note form ------*/
  .NewBox :global(.NewBox) {
    padding: 0;
    position: relative;
    width: 100%;
    left: 0;
    top: 0;
  }
  .NewBox :global(.NewBox .Editor .Editor) {
    min-height: 20vh;
  }
  /*------ Search inputs (notes/sources) ------*/
  .NewBox :global(label.Button),
  .NewBox :global(.SearchBox) {
    background: var(--main-background-color);
    border: none;
    border-radius: 10px;
    color: var(--workspace-color);
    outline: none;
    height: 60px;
    width: 100%;
  }
  .NewBox :global(label.Button input),
  .NewBox :global(.SearchBox input) {
    font-size: 180%;
    font-weight: 500;
    left: 50px;
  }
  .NewBox :global(label.Button input::placeholder),
  .NewBox :global(.SearchBox input::placeholder) {
    font-weight: 300;
  }
  .NewBox :global(label.Button svg),
  .NewBox :global(.SearchBox svg) {
    width: 25px;
    height: 25px;
  }
  .searchItems {
    float: left;
    width: 100%;
    position: relative;
  }
  .searchItems ul {
    background: #ffffff;
    list-style: none;
    border-radius: 10px;
    position: absolute;
    width: 100%;
    bottom: 0;
    transform: translateY(calc(100% + 5px));
    padding: 0;
    margin: 0;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #eeeeee;
    max-height: 60vh;
    overflow-y: scroll;
    z-index: 1;
  }
  ul li.empty {
    color: #333333;
    font-size: 0.9rem;
    font-weight: 500;
    font-style: italic;
    padding: 10px 20px;
    display: none;
  }
  ul li.empty:only-child {
    display: block;
  }
  footer {
    margin-top: 20px;
    float: left;
    width: 100%;
  }
  .submit.nonActive {
    opacity: 0.5;
  }
  :global(.Button),
  .submit {
    float: right;
  }
  .submit {
    background: var(--main-background-color);
    color: var(--workspace-color);
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 10px;
    cursor: pointer;
  }
  footer .Closer,
  .submit {
    width: 125px;
    height: 34px;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
  }
  .AddItem {
    background: #fff;
    width: 14px;
    height: 14px;
    position: relative;
    border-radius: 50%;
    margin: 0 !important;
    transform: translateY(1px);
  }
  .AddItem::before,
  .AddItem::after {
    background: var(--workspace-color);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    width: 50%;
    height: 2px;
    content: "";
  }
  .AddItem::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  .NewBox :global(section.header) {
    padding: 0 0 40px 0;
  }
  .NewBox :global(div.MoreItems) {
    padding: 0;
  }
  :global(.Collection .Closer) {
    width: max-content;
    height: max-content;
  }
  :global(.Collection .Closer svg) {
    display: block;
  }
  @media (max-width: 720px) {
    .new-button {
      position: fixed;
      right: var(--base);
      bottom: 50px;
    }
    .new-button :global(.Button) {
      box-shadow: 3px 1px 7px rgba(0, 0, 0, 0.2);
      padding: 0.65rem;
      border-radius: 100%;
      height: 60px;
      width: 60px;
    }
    .new-button :global(svg) {
      float: inherit;
      width: 25px;
      height: 25px;
    }
    .NewButtonLabel {
      display: none;
    }
    .NewBox {
      left: 0;
      top: 0;
      border-radius: 0;
      width: 100%;
      height: 100%;
      position: fixed;
      align-items: center;
      padding: 40px 40px 30px;
    }
    .NewBox :global(.NewBox) {
      display: inherit;
    }
    footer .Closer,
    :global(button.Submit) {
      width: 150px !important;
      padding: 15px 0 !important;
      margin: 0 !important;
      font-size: 0.9rem;
      border-radius: 20px !important;
    }
    .AddItem {
      width: 100%;
      height: 100%;
      background: transparent;
    }
    .AddItem::before,
    .AddItem::after {
      background: #ffffff;
      width: 60%;
      border-radius: 10px;
    }
    .NewBox .searchItems :global(label.Button),
    .NewBox .searchItems :global(.SearchBox) {
      position: inherit;
      left: 0;
      right: inherit;
    }
  }
</style>

{#if open}
  <div
    class="NewBox"
    out:send|local={{ key: 'new-box' }}
    in:receive|local={{ key: 'new-box' }}>
    <TopMenu {menu} {itemType} {itemState} />
    {#if itemState === 'existent'}
      <div class="searchItems">
        <svelte:component this={searchTool(itemType)} />
        {#if addItem}
          <AddThis {addItem} {itemType} {removeThis} />
        {:else}
          <ul class="searching">
            {#if loader && loader === 'loading'}
              <Loader />
            {:else}
              {#each foundItems as item}
                {#if !notebook[`${itemType}s`].find(element => {
                  if (element.shortId === item.shortId) return true;
                })}
                  <NotesFound {item} {addThis} {itemType} />
                {/if}
              {/each}
              <li class="empty">No {itemType}s found...</li>
            {/if}
          </ul>
        {/if}
      </div>
      <footer>
        <span
          class="submit {!addItem ? 'nonActive' : ''}"
          on:click={addItem ? submit : ''}>
          Add {itemType}
        </span>
        <span class="Closer" on:click={() => ntbkClose('cancel')}>
          <p>Cancel</p>
        </span>
      </footer>
    {:else if itemState === 'new'}
      {#if itemType === 'note'}
        <NewNote {ntbkClose} />
      {:else}
        <NewItem {ntbkClose} />
      {/if}
    {/if}
  </div>
  <span />
{:else}
  <span
    class="new-button"
    out:send|local={{ key: 'new-box' }}
    in:receive|local={{ key: 'new-box' }}
    bind:this={newToggle}>
    <Button {click}>
      <span class="AddItem" />
      <span class="NewButtonLabel">Add Item</span>
    </Button>
  </span>
{/if}
