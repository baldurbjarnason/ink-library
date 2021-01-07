<script>
  import AddItems from "./AddItems.svelte";
  import SingleNotebookList from "./SingleNotebookList.svelte";
  import IcoGoBack from "../img/IcoGoBack.svelte";
  import NavNotebook from "../img/NavNotebook.svelte";
  import { notebook } from "../../stores";
  import DeletionModal from "../notes/Items/DeletionModal.svelte";
  import EditSingleNotebook from "./Tools/EditSingleNotebook.svelte";
  import NewPage from "../pages/NewPage.svelte";
  import { goto } from "@sapper/app";
  import { getToken } from "../../getToken";

  let activeModal = false;
  async function remove() {
    goto(`notebooks`);

    try {
      await fetch(`/api/notebooks/${$notebook.shortId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "csrf-token": getToken(),
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
</script>

<style>
  .Toolbar {
    display: grid;
    top: 0;
    position: relative;
    grid-template-columns: 1fr max-content;
    grid-gap: 20px;
    background-color: #ffffff;
    z-index: 3;
    padding: 20px calc(var(--base) * 2);
  }
  .Toolbar.Loader {
    height: 100px;
    display: flex;
  }
  .Toolbar.Loader :global(.Loading) {
    margin: auto;
  }
  nav.Toolbar::before {
    content: "";
    background: #ffffff;
    width: 80px;
    height: 130px;
    position: absolute;
    top: 0;
    left: -80px;
  }
  .Toolbar > section {
    display: grid;
    grid-gap: 10px;
    margin: 0;
  }
  .Toolbar section * {
    float: left;
  }
  .Header {
    display: grid;
    grid-template-columns: max-content max-content max-content 1fr;
    grid-gap: 20px;
  }
  .breadcrumbs {
    width: max-content;
  }
  .breadcrumbs h5 {
    color: #888888;
    font-weight: 500;
    margin: 0;
  }
  .Title {
    display: grid;
    grid-template-columns: 34px 1fr;
    grid-gap: 10px;
    align-items: center;
  }
  .Title :global(svg) {
    width: 16px;
    margin-right: 5px;
    float: left;
  }
  .library {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 130px 1fr;
  }
  .library h3 {
    font-weight: 600;
    margin: 0;
  }
  .Img {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 10px;
  }
  .Description {
    margin: 0;
    background: #ffffff;
    font-size: 0.9rem;
  }
  .Info {
    display: grid;
    grid-gap: 10px;
  }
  /*----- Colours -----*/
  .Icon {
    border-radius: 50%;
    width: 34px;
    height: 34px;
    position: relative;
    background: var(--main-background-color);
  }
  .Icon :global(svg) {
    width: 15px;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .Icon.colour1 {
    background: #f5e7e6;
  }
  .Icon.colour1 :global(svg) {
    color: #a43939;
  }
  .Icon.colour2 {
    background: #ede6f5;
  }
  .Icon.colour2 :global(svg) {
    color: #6f4c9b;
  }
  .Icon.colour3 {
    background: #fae59b;
  }
  .Icon.colour3 :global(svg) {
    color: #8f7000;
  }
  .Icon.colour4 {
    background: #dcf3f0;
  }
  .Icon.colour4 :global(svg) {
    color: #4c9b92;
  }
  .Delete {
    color: #f05657;
    text-decoration: underline;
    cursor: pointer;
  }
  @media (max-width: 720px) {
    nav.Toolbar::before {
      content: none;
    }
    .Toolbar {
      position: relative;
      padding: calc(var(--base) * 1.5) calc(var(--base) * 2);
      grid-template-columns: 1fr;
    }
    .Toolbar:first-child:nth-last-child(5) :global(.new-button) {
      display: none;
    }
    .breadcrumbs h5 {
      display: none;
    }
    .library {
      grid-template-columns: 1fr;
    }
    .Img {
      width: 100%;
      height: 100px;
    }
  }
</style>

<nav class="Toolbar">
  <section>
    <div class="Header">
      <a href="/notebooks" class="breadcrumbs">
        <IcoGoBack />
        <h5>Notebooks library</h5>
      </a>
      <EditSingleNotebook notebook={$notebook} />
      <h5
        class="Delete"
        on:click={() => {
          activeModal = true;
        }}>
        Delete notebook
      </h5>
      <NewPage notebook={$notebook} />
    </div>
    <div class="library">
      {#if $notebook.shortId}
        <div
          class="Img"
          style={`background-image: url("/img/NotebookImg/${$notebook.settings.coverImg}.jpg")`} />
        <div class="Info">
          <div class="Title">
            <div class="Icon {$notebook.settings.colour}">
              <NavNotebook />
            </div>
            <h3>{$notebook.name}</h3>
          </div>
          <div class="Description">{$notebook.description}</div>
        </div>
      {:else}
        <div class="Title">
          <div class="Icon">
            <NavNotebook />
          </div>
          <h3>...</h3>
        </div>
      {/if}
    </div>
  </section>
  <AddItems notebook={$notebook} />
</nav>
<div class="Body">
  <div class="notesList">
    <SingleNotebookList notebook={$notebook} />
  </div>
</div>
{#if activeModal}
  <DeletionModal
    {remove}
    bind:activeModal
    type="notebook"
    items={[$notebook]} />
{/if}
