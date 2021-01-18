<script>
  import ArrowDropDown from "../../../img/ArrowDropDown.svelte";
  import IcoColor from "../../../img/IcoColor.svelte";
  import IcoChecked from "../../../img/OutlineIcoChecked.svelte";
  import { page } from "../../../../stores";

  export let typeOf;
  export let addArrParams;

  $: params = $page.query;

  let colours = ["colour1", "colour2", "colour3", "colour4"];
</script>

<style>
  .Colours li {
    grid-template-columns: max-content 1fr 13px;
  }
  .Colours li :global(svg) {
    margin: 0 auto;
  }
  li.Colours > :global(svg:first-child) {
    width: 10px;
    opacity: 0.7;
  }
  :global(ul.Tools) .Checkbox.colour1 {
    border: 2px solid #d86801;
  }
  :global(ul.Tools) .Checkbox.colour1::after {
    background: #d86801;
  }
  :global(ul.Tools) .Checkbox.colour2 {
    border: 2px solid #c0004e;
  }
  :global(ul.Tools) .Checkbox.colour2::after {
    background: #c0004e;
  }
  :global(ul.Tools) .Checkbox.colour3 {
    border: 2px solid #0693b2;
  }
  :global(ul.Tools) .Checkbox.colour3::after {
    background: #0693b2;
  }
  :global(ul.Tools) .Checkbox.colour4 {
    border: 2px solid #589b4c;
  }
  :global(ul.Tools) .Checkbox.colour4::after {
    background: #589b4c;
  }
</style>

<li class="Children Colours">
  <IcoColor />
  <p>Colours</p>
  <p class="Preview">
    ({!params[`${typeOf}Colour`] ? 'All' : !Array.isArray(params[`${typeOf}Colour`]) ? 3 : 4 - params[`${typeOf}Colour`].length})
  </p>
  <ArrowDropDown />
  <ul class="Colours">
    <li
      class:Current={!params[`${typeOf}Colour`]}
      on:click={() => {
        params[`${typeOf}Colour`] ? addArrParams([`${typeOf}Colour`], undefined) : '';
      }}>
      <IcoChecked />
      <p>All colours</p>
    </li>
    <span class="Division Full" />
    {#each colours as colour}
      <li
        on:click={() => {
          addArrParams(`${typeOf}Colour`, colour);
        }}>
        <span
          class="Checkbox {colour}"
          class:Unchecked={(params[`${typeOf}Colour`] && !Array.isArray(params[`${typeOf}Colour`]) && params[`${typeOf}Colour`] === colour) || (params[`${typeOf}Colour`] && Array.isArray(params[`${typeOf}Colour`]) && params[`${typeOf}Colour`].find((item) => item === colour))} />
        <p>{colour}</p>
      </li>
    {/each}
  </ul>
</li>
