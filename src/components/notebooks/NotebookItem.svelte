<script>
  import AddItems from "./AddItems.svelte";
  import SingleNotebook from "./SingleNotebook.svelte";
  import IcoGoBack from "../img/IcoGoBack.svelte";
  import NavNotebook from "../img/NavNotebook.svelte";

  import { notebook } from "../../stores";
  //export let notebook = {};
</script>

<style>
  .Toolbar {
    display: flex;
    top: 0;
    position: relative;
    justify-content: space-between;
    background-color: #ffffff;
    z-index: 3;
    padding: 20px calc(var(--base) * 2) 0;
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
  .Toolbar section {
    display: flex;
    flex-direction: column;
    margin: 0;
  }
  .Toolbar section * {
    float: left;
  }
  .breadcrumbs {
    margin-bottom: 10px;
  }
  .breadcrumbs h5 {
    color: #888888;
    font-weight: 500;
    margin: 0;
  }
  .library :global(svg) {
    width: 16px;
    margin-right: 5px;
    float: left;
  }
  .library h3 {
    font-weight: 600;
    margin: 0;
  }
  @media (max-width: 720px) {
    nav.Toolbar::before {
      content: none;
    }
    .Toolbar {
      position: relative;
      padding: calc(var(--base) * 1.5) calc(var(--base) * 2);
    }
    .Toolbar:first-child:nth-last-child(5) :global(.new-button) {
      display: none;
    }
    .Toolbar section {
      display: table;
      width: 100%;
      text-align: center;
    }
    .breadcrumbs {
      margin-bottom: 0;
      margin-top: 3px;
    }
    .breadcrumbs h5 {
      display: none;
    }
    .library {
      float: inherit !important;
      display: inline-table;
    }
  }
</style>

<nav class="Toolbar">
  <section>
    <a href="/" class="breadcrumbs">
      <IcoGoBack />
      <h5>Home</h5>
    </a>
    <div class="library">
      <NavNotebook />
      <h3>Notebooks library</h3>
    </div>
  </section>
  <AddItems />
</nav>

<div class="Body">
  <div class="notesList">
    <SingleNotebook notebook={$notebook} />
  </div>
</div>
