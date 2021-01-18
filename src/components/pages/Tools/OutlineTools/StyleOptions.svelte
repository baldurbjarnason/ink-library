<script>
  import IcoChecked from "../../../img/OutlineIcoChecked.svelte";
  import { page } from "../../../../stores";

  export let checkAll;
  export let addArrParams;

  $: params = $page.query;

  let stylesFor = ["highlight", "source", "note"];
</script>

<style>
  p.StyleName {
    text-transform: capitalize;
  }
</style>

<li
  class:Current={!params.styles && !params.styleColour && !params.styleFlags}
  on:click={() => {
    params.styles || params.styleColour || params.styleFlags ? checkAll('styles') : '';
  }}>
  <IcoChecked />
  <p>Default</p>
</li>
<span class="Division Full" />
<p class="Header">Notes attributes</p>
{#each stylesFor as style}
  <li
    on:click={() => {
      addArrParams('styles', style);
    }}>
    <span
      class="Checkbox"
      class:Unchecked={(params['styles'] && !Array.isArray(params['styles']) && params['styles'] === style) || (params['styles'] && Array.isArray(params['styles']) && params['styles'].find((item) => item === style))} />
    <p class="StyleName">{style}</p>
    <span />
  </li>
{/each}
