<script>
  import IcoEdit from "../img/IcoEdit.svelte";
  import IcoDelete from "../img/IcoDelete.svelte";
  import SecondaryButton from "../widgets/SecondaryButton.svelte";
  import Button from "../widgets/Button.svelte";
  import Footer from "../workspace/Footer.svelte";
  import DeletionModal from "./Items/DeletionModal.svelte";
  import DropDownFlags from "./Items/DropDownFlags.svelte";
  import DropDownColour from "./Items/DropDownColour.svelte";
  import AddNotebooks from "../workspace/AddNotebooks.svelte"
  import DropDownColourNotebook from "../notebooks/Tools/DropDownColour.svelte";
  import { getToken } from "../../getToken";
  import {
    selectedItems,
    refreshNotes,
    addedNotebooks,
    refreshNotebooks,
    refreshNotebook,
    refreshDate,
    tags,
    page,
  } from "../../stores";

  export let endSelection = function() {};
  export let chooseAll;
  export let type;
  export let fullList;

  let editing = false;
  let colour;
  let selectedFlags = [];
  let activeModal = false;

  $: if (!$selectedItems.size) {
    colour = undefined;
    selectedFlags = [];
  }

  let createObj = () => {
    let obj = { items: Array.from($selectedItems) };
    if (type === "note") {
      obj["tags"] = [];

      if (colour) {
        obj["colour"] = true;
        obj.tags = [...obj.tags, ...$tags.getIds([colour.replace(" ", "")])];
      }
      if (selectedFlags.length)
        obj.tags = [...obj.tags, ...$tags.getIds(selectedFlags)];
    } else {
      if (colour) obj["newColour"] = colour;
    }
    return obj;
  };

  const url = type === "note" ? "" : "book";
  async function submit(event) {
    event.preventDefault();
    editing = false;

    const body = createObj();
    endSelection();
    // if ($addedNotebooks.length > 0) {
    //   const notebook = $addedNotebooks[0];
    //   const noteIdsArray = body.items.map(item => item.shortId)
    //   const noteIds = noteIdsArray.join(',')
    //   try {
    //   await window.fetch(
    //     `/api/notebooks/${notebook.shortId}/notes/${noteIds}`,
    //     {
    //       method: "PUT",
    //       credentials: "include",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "csrf-token": getToken(),
    //       },
    //     }
    //   );
    //   $refreshNotebook = { id: notebook.shortId, time: Date.now() };
    //   $refreshNotebooks = Date.now();
    // } catch (err) {
    //   console.error(err);
    // }
    // }



    const updateUrl =
      type === "source" ? "/api/batch-update" : `/api/note${url}sbatch-update`;
    try {
      body.notebooks = $addedNotebooks
      await fetch(updateUrl, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "csrf-token": getToken(),
        },
        body: JSON.stringify(body),
      });

      if (type === "note") $refreshNotes = Date.now();
      else $refreshNotebooks = Date.now();
    } catch (err) {
      console.error(err);
    }
  }

  async function remove() {
    const body = { items: Array.from($selectedItems) };
    endSelection();

    const removeUrl =
      type === "source" ? "/api/batch-update" : `/api/note${url}sbatch-update`;

    try {
      await fetch(removeUrl, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "csrf-token": getToken(),
        },
        body: JSON.stringify(body),
      });

      if (type === "note") $refreshNotes = Date.now();
      else if (type === "source") $refreshDate = Date.now();
      else $refreshNotebooks = Date.now();
    } catch (err) {
      console.error(err);
    }
  }

  let notesListed = [];
  $: if ($selectedItems) {
    notesListed = [];
    $selectedItems.forEach((obj) => {
      notesListed.push(obj);
    });
  }

  $: menu = ["Delete", "Check all", "Edit", "Close"];
  $: if ($page.path.startsWith("/notebooks"))
    menu = menu.filter((i) => i !== "Edit");

  let react = (func) => {
    if (func === "Delete") activeModal = true;
    else if (func === "Edit") editing = true;
    else if (func === "Check all") chooseAll();
    else endSelection();
  };

  function assignIco(icon) {
    switch (icon) {
      case "Delete":
        return IcoDelete;
      case "Edit":
        return IcoEdit;
    }
  }
</script>

<style>
  .form {
    display: grid;
    grid-column: 1 / 3;
    grid-template-columns: 1fr 1fr;
    gap: 30px 20px;
  }
  .FooterButtons {
    display: grid;
    grid-gap: calc(var(--base) * 2);
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }
  .FooterButtons :global(button) {
    height: 40px;
  }
  .FooterNumber {
    font-size: 1rem;
    font-style: italic;
    color: var(--medium);
    font-weight: 300;
  }
  .Footer {
    padding: 10px 50px;
    bottom: 20px;
    left: calc(50% + 40px);
    position: fixed;
    background: #fff;
    border: 1px solid #eee;
    transform: translateX(-50%);
    border-radius: 20px;
    z-index: 1;
    transition: all 0.2s ease;
    box-shadow: 0px 0px 30px 0px rgba(0, 34, 48, 0.2);
  }
  .Footer.editing {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--base);
    width: calc(100% - 80px);
    padding: 40px;
    border-radius: 50px 50px 0 0;
    bottom: 0;
    border: none;
  }
  form.Footer.editing::before {
    background: #ffffff;
    width: 80px;
    height: 80px;
    position: absolute;
    left: -80px;
    bottom: 0;
    content: "";
  }
  /*-----------------------------------*/
  /*-----------------------------------*/
  /*-----------------------------------*/
  /*-----------------------------------*/
  /*-----------------------------------*/
  /*-----------------------------------*/
  .Footer ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-rows: 70px;
    gap: 50px;
  }
  .Footer li {
    cursor: pointer;
    border-radius: 15px;
    text-align: center;
    gap: 10px;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    transition: all 0.25s ease;
  }
  .Footer li:hover {
    background: var(--main-background-color);
  }
  .Footer li.Delete:hover {
    background: #fcf0f0;
  }
  .Footer li .Icon {
    width: 16px;
    height: 16px;
    display: block;
    margin: 0 auto;
  }
  .Footer li.Delete {
    color: #f05657;
    width: 100px;
  }
  .Footer li.Delete::after {
    content: "";
    background: #dddddd;
    width: 1px;
    height: 65%;
    right: -25px;
    position: absolute;
  }
  .Footer li.Delete .Icon :global(svg) {
    width: auto;
    height: 18px;
    transform: translateY(-1px);
  }
  .Footer li.Edit .Icon :global(svg) {
    transform: translate(-5px, -5px);
    height: 26px;
    width: auto;
  }
  .Footer li.Edit .Icon :global(svg path) {
    fill: var(--workspace-color);
  }
  .Footer li.Edit .Icon :global(svg rect) {
    height: 1px;
    width: 5px;
    x: 6;
    fill: #ffffff;
    stroke: none;
  }
  .Footer li.Close .Icon {
    position: relative;
  }
  .Footer li.Close .Icon::before,
  .Footer li.Close .Icon::after {
    content: "";
    width: 3px;
    height: 20px;
    background: var(--workspace-color);
    position: absolute;
    transform: translate(-50%, -50%) rotate(45deg);
    top: 50%;
    left: 50%;
    border-radius: 10px;
  }
  .Footer li.Close .Icon::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  .Footer li.Checkall .Icon {
    border-radius: 50%;
    border: 2px solid var(--workspace-color);
    position: relative;
  }
  .Footer li.Checkall .Icon::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: transparent;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    transition: all 0.35s ease;
  }
  .Footer li.Checkall.allChecked .Icon::after {
    background: #333333;
  }
  .Footer li p {
    margin: 0;
    font-size: 0.75rem;
    font-weight: 600;
  }
  @media (max-width: 720px) {
    .Footer {
      left: 0;
      padding: var(--base) calc(var(--base) * 2);
      width: 100%;
      bottom: 0;
      z-index: 4;
      transform: translateX(0);
      border-radius: 20px 20px 0 0;
    }
    .Footer.editing {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: var(--base);
      padding: 40px 40px 20px;
      left: 0;
      width: 100%;
      max-width: 100vw;
      max-height: calc(100vh - 53px);
    }
    .form {
      grid-template-columns: 1fr;
    }
    .FooterButtons {
      display: grid;
      grid-gap: 0.5rem;
      grid-template-columns: 0.75fr 1fr;
    }
    .editing .FooterButtons {
      padding-bottom: 1rem;
    }
  }
</style>

{#if !activeModal}
  <form class="Footer" class:editing on:submit={submit}>
    {#if editing}
      <div class="form">
        {#if type === 'source'}
          <Footer {endSelection} bind:editing />
        {:else}
          <DropDownColour bind:colour />
          <DropDownFlags bind:selectedFlags />
          <AddNotebooks />
          <span />
          <span class="FooterButtons">
            <SecondaryButton
              click={() => {
                editing = false;
              }}>
              Cancel
            </SecondaryButton>
            <Button type="submit">Save</Button>
          </span>
        {/if}
      </div>
    {:else}
      <ul style={`grid-template-columns: repeat(${menu.length}, 100px);`}>
        {#each menu as button}
          <li
            class="Button {button.replace(' ', '')}
            {button === 'Check all' && fullList ? 'allChecked' : ''}"
            on:click={() => react(button)}>
            <span class="Icon">
              <svelte:component this={assignIco(button)} />
            </span>
            <p>{button}</p>
          </li>
        {/each}
      </ul>
    {/if}
  </form>
{:else}
  <DeletionModal {remove} bind:activeModal {type} items={notesListed} />
{/if}
