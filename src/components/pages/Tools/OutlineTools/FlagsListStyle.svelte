<script>
  import ArrowDropDown from "../../../img/ArrowDropDown.svelte";
  import FlagFurtherRead from "../../../img/FlagFurtherRead.svelte";
  import FlagIdea from "../../../img/FlagIdea.svelte";
  import FlagImportant from "../../../img/FlagImportant.svelte";
  import FlagImpTerm from "../../../img/FlagImpTerm.svelte";
  import FlagQuestion from "../../../img/FlagQuestion.svelte";
  import FlagReference from "../../../img/FlagReference.svelte";
  import FlagRevisit from "../../../img/FlagRevisit.svelte";
  import FlagToDo from "../../../img/FlagToDo.svelte";
  import FlagUrgent from "../../../img/FlagUrgent.svelte";
  import IcoFlag from "../../../img/IcoFlag.svelte";
  import IcoChecked from "../../../img/OutlineIcoChecked.svelte";
  import { page } from "../../../../stores";

  export let buildUrl;
  export let addArrParams;

  $: params = $page.query;

  let flags = [
    "furtherreading",
    "idea",
    "important",
    "importantterm",
    "question",
    "reference",
    "revisit",
    "todo",
    "urgent",
  ];

  function assignIco(icon) {
    switch (icon) {
      case "furtherreading":
        return FlagFurtherRead;
      case "idea":
        return FlagIdea;
      case "important":
        return FlagImportant;
      case "importantterm":
        return FlagImpTerm;
      case "question":
        return FlagQuestion;
      case "reference":
        return FlagReference;
      case "revisit":
        return FlagRevisit;
      case "todo":
        return FlagToDo;
      case "urgent":
        return FlagUrgent;
    }
  }

  let allFlags = () => {
    delete params["styleFlags"];
    let searchParams = new URLSearchParams();

    flags.map((flag) => {
      searchParams.append("styleFlags", flag);
    });

    buildUrl(searchParams);
  };
</script>

<style>
  .StyleFlags li {
    grid-template-columns: max-content 1fr 13px;
  }
  .StyleFlags li :global(svg) {
    margin: 0 auto;
  }
  li.Flags > :global(svg:first-child) {
    width: 10px;
    color: var(--action);
    opacity: 0.6;
  }
  p.FlagName {
    text-transform: capitalize;
  }
</style>

<li class="Children Flags">
  <IcoFlag />
  <p>Flags</p>
  <p class="Preview">
    ({!params.styleFlags ? 0 : !Array.isArray(params['styleFlags']) ? 1 : params.styleFlags.length < 9 ? params.styleFlags.length : 'All'})
  </p>
  <ArrowDropDown />
  <ul class="StyleFlags">
    <li
      class:Current={params.styleFlags && Array.isArray(params['styleFlags']) && params.styleFlags.length === 9}
      on:click={() => {
        !params.styleFlags || (params.styleFlags && params.styleFlags.length < 9) ? allFlags() : '';
      }}>
      <IcoChecked />
      <p>All flags</p>
    </li>
    <span class="Division Full" />
    {#each flags as flag}
      <li
        on:click={() => {
          addArrParams('styleFlags', flag);
        }}>
        <span
          class="Checkbox"
          class:Unchecked={!params['styleFlags'] || (!Array.isArray(params['styleFlags']) && params['styleFlags'] !== flag) || (Array.isArray(params['styleFlags']) && params['styleFlags'].indexOf(flag) < 0)} />
        <p class="FlagName">
          {flag === 'todo' ? 'To do' : flag === 'importantterm' ? 'Important term' : flag === 'furtherreading' ? 'Further reading' : flag}
        </p>
        <svelte:component this={assignIco(flag)} />
      </li>
    {/each}
  </ul>
</li>
