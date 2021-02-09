<script>
  import IcoGoBack from "./img/IcoGoBack.svelte";
  import { page } from "../stores";

  let GoBack = (e) => {
    e.preventDefault();
    window.history.back();
  };
  $: atSource = $page.path.startsWith("/sources/") ? true : false;
</script>

<style>
  .breadcrumbs {
    margin-bottom: 10px;
    padding: 0;
    border: none;
    background: transparent;
    display: grid;
    grid-template-columns: max-content 1fr;
    text-align: left;
    gap: 5px;
    cursor: pointer;
  }
  .breadcrumbs.atSource {
    margin-bottom: 0;
  }
  .breadcrumbs h5 {
    color: #888888;
    font-weight: 500;
    margin: 0;
  }
  .breadcrumbs.atSource h5,
  .breadcrumbs.atSource :global(*) {
    color: #ffffff;
  }
  @media (max-width: 720px) {
    .breadcrumbs {
      margin-bottom: 0;
      margin-top: 3px;
      grid-template-columns: max-content;
    }
    .breadcrumbs h5 {
      display: none;
    }
  }
</style>

<button class="breadcrumbs" class:atSource on:click={GoBack}>
  <IcoGoBack />
  <h5>Back</h5>
</button>
