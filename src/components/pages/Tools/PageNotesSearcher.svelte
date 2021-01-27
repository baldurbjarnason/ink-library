<script>
  import IcoSearch from "../../img/IcoSearch.svelte";
  import { searchPageNotes, page } from "../../../stores";

  let input;
  function loadSearch() {
    if ($page.path.startsWith("/pages/")) $searchPageNotes = input.value;
  }
</script>

<style>
  .SearchBox {
    background-color: #ffffff;
    height: 34px;
    border-radius: 50px;
    width: 100%;
    position: relative;
    float: left;
    border: 1px solid #dde8ed;
  }
  .SearchBox input {
    font-family: var(--sans-fonts);
    font-size: var(--item-font-size);
    border: none;
    font-weight: 700;
    background: transparent;
    position: absolute;
    top: 50%;
    left: 40px;
    width: calc(100% - 50px);
    height: 100%;
    transform: translateY(-50%);
    color: var(--action);
    transition: all 0.25s ease-out;
  }
  .SearchBox input:focus {
    outline: none;
  }
  .SearchBox:focus-within {
    background: #e5ecf2;
  }
  .SearchBox input::placeholder {
    color: var(--action);
    opacity: 0.5;
    font-weight: 500;
  }
  .SearchBox :global(svg) {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    margin: 0;
    width: 15px;
    height: 15px;
  }
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }
  @media (max-width: 640px) {
    .SearchBox {
      left: 0.5rem;
      right: 0.5rem;
      position: absolute;
      width: calc(100% - 80px);
      left: 40px;
      top: 0;
    }
  }
</style>

<div class="SearchBox">
  <input
    type="search"
    required
    name="search"
    id="search-input"
    class="search-field"
    value=""
    placeholder="Search notes..."
    bind:this={input}
    on:input={loadSearch} />
  <IcoSearch />
</div>
