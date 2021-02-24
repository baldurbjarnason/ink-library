<script>
  import IcoSearch from "../../img/IcoSearch.svelte";
  export let term;
</script>

<style>
  label :global(svg) {
    height: 16px;
    width: 16px;
    padding: 2px;
    position: absolute;
    top: 0.4rem;
    left: 1rem;
  }
  label {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  input {
    display: block;
    padding: 0.25rem 0.25rem 0.25rem 2.25rem;
    border: none;
    background: #f1f5f8;
    border-radius: 5.58596px;
    line-height: 1.5;
    width: 200px;
  }
</style>

<label>
  <IcoSearch />
  <span class="visually-hidden">Search</span>
  <input type="text" bind:value={term} />
</label>
