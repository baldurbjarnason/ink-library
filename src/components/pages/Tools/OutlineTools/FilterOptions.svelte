<script>
  import IcoChecked from "../../../img/OutlineIcoChecked.svelte";
  import { page } from "../../../../stores";

  export let checkAll;
  export let addArrParams;

  $: params = $page.query;
  let filtersOf = ["headers", "notes"];
</script>

<style>
  p.StyleName {
    text-transform: capitalize;
  }
</style>

<li
  class:Current={!params.filters && !params.filterColour && !params.filterFlags}
  on:click={() => {
    params.filters || params.filterColour || params.filterFlags ? checkAll('filters') : '';
  }}>
  <IcoChecked />
  <p>Default</p>
</li>
<span class="Division Full" />
{#each filtersOf as filter}
  <li
    on:click={() => {
      addArrParams('filters', filter);
    }}>
    <span
      class="Checkbox"
      class:Unchecked={(params['filters'] && !Array.isArray(params['filters']) && params['filters'] === filter) || (params['filters'] && Array.isArray(params['filters']) && params['filters'].find((item) => item === filter))} />
    <p class="StyleName">Enable {filter}</p>
    <span />
  </li>
{/each}
