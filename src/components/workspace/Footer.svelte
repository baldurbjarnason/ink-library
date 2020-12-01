<script>
  import {
    selectedItems,
    refreshDate,
    addedCollections,
    addedWorkspaces,
  } from "../../stores";
  // import RiskyButton from "../widgets/RiskyButton.svelte";
  import SecondaryButton from "../widgets/SecondaryButton.svelte";
  import Button from "../widgets/Button.svelte";
  import TypeSelect from "./TypeSelect.svelte";
  import Input from "./Input.svelte";
  import { getToken } from "../../getToken";
  import AddCollections from "./AddCollections.svelte";

  export let endSelection = function() {};
  export let editing;

  async function submit(event) {
    event.preventDefault();
    editing = false;
    const { target } = event;
    const body = Object.fromEntries(
      new URLSearchParams(new FormData(target)).entries()
    );
    body.items = Array.from($selectedItems);
    body.addedCollections = $addedCollections;
    body.addedWorkspaces = $addedWorkspaces;
    $addedWorkspaces = [];
    $addedCollections = [];
    endSelection();
    try {
      await fetch(target.action, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "csrf-token": getToken(),
        },
        body: JSON.stringify(body),
      });
      $refreshDate = Date.now();
    } catch (err) {
      console.error(err);
    }
  }
  /*
  async function remove(event) {
    event.preventDefault();
    editing = false;
    const body = { items: Array.from($selectedItems) };
    endSelection();
    try {
      await fetch("/api/batch-update", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "csrf-token": getToken(),
        },
        body: JSON.stringify(body),
      });
      $refreshDate = Date.now();
    } catch (err) {
      console.error(err);
    }
  }*/
</script>

<style>
  .FooterButtons {
    display: grid;
    grid-gap: calc(var(--base) * 2);
    grid-template-columns: 1fr 1fr;
    align-items: end;
  }
  .FooterButtons :global(button) {
    height: 40px;
  }
  .Footer {
    display: flex;
    justify-content: space-between;
    padding: var(--base) calc(var(--base) * 2) var(--base)
      calc(var(--base) * 2 + 40px);
    width: calc(100% - calc(var(--base) * 4 - 40px));
    align-items: center;
    font-size: var(--item-font-size);
    position: fixed;
    bottom: 0;
    left: 0;
    align-items: end;
    box-shadow: 0px -7px 15px rgba(0, 0, 0, 0.1);
  }
  .Footer.editing {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--base);
    width: 100%;
    padding: 40px;
    border-radius: 50px 50px 0 0;
    bottom: 0;
    border: none;
    background: #ffffff;
  }
  @media (max-width: 720px) {
    .Footer {
      left: 0;
      padding: var(--base) calc(var(--base) * 2);
      width: 100%;
    }
    .Footer.editing {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: var(--base);
      padding: 40px 40px 20px;
      left: 0;
      max-width: 100vw;
      overflow-y: auto;
      max-height: calc(100vh - 53px);
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

<form
  class="Footer"
  class:editing
  action="/api/batch-update"
  on:submit={submit}>
  <!--
  {#if editing}-->
  <div>
    <Input placeholder="First Author, Second Author" name="updateAddAuthors">
      Add authors:
    </Input>
  </div>
  <div>
    <TypeSelect noDefault={true}>Change type:</TypeSelect>
  </div>
  <!--
    <div>
      <ChooseWorkspaces>Change workspace:</ChooseWorkspaces>
    </div>-->
  <AddCollections />
  <span class="FooterButtons">
    <SecondaryButton
      click={() => {
        editing = false;
      }}>
      Cancel
    </SecondaryButton>
    <Button type="submit">Save</Button>
  </span>
</form>
<!--
  {:else}
    <span class="FooterNumber">
      <SecondaryButton
        click={() => {
          endSelection();
        }}>
        Cancel
      </SecondaryButton>
    </span>
    <span class="FooterButtons">
      <RiskyButton click={remove}>Delete</RiskyButton>
      <Button
        click={() => {
          editing = true;
        }}>
        Edit
      </Button>
    </span>
  {/if}
</form>-->
