<script>
  import FlagFurtherRead from "../../img/FlagFurtherRead.svelte";
  import FlagIdea from "../../img/FlagIdea.svelte";
  import FlagImportant from "../../img/FlagImportant.svelte";
  import FlagImpTerm from "../../img/FlagImpTerm.svelte";
  import FlagQuestion from "../../img/FlagQuestion.svelte";
  import FlagReference from "../../img/FlagReference.svelte";
  import FlagRevisit from "../../img/FlagRevisit.svelte";
  import FlagToDo from "../../img/FlagToDo.svelte";
  import FlagUrgent from "../../img/FlagUrgent.svelte";
  import NavSource from "../../img/NavSource.svelte";
  import { page, addSelected, removeSelected } from "../../../stores";
  export let item = {};
  $: note = item;

  function assignIco(icon) {
    switch (icon) {
      case "further reading":
        return FlagFurtherRead;
      case "idea":
        return FlagIdea;
      case "important":
        return FlagImportant;
      case "important term":
        return FlagImpTerm;
      case "question":
        return FlagQuestion;
      case "reference":
        return FlagReference;
      case "revisit":
        return FlagRevisit;
      case "to do":
        return FlagToDo;
      case "urgent":
        return FlagUrgent;
    }
  }

  let noted, highlighed;
  $: colour = note.tags.find((colour) => colour.type === "colour") || "";

  $: if (note && note.body && note.body[0]) {
    noted = note.body.find((item) => item.motivation === "commenting");
    highlighed = note.body.find((item) => item.motivation === "highlighting");
  }

  $: params = $page.query;
  $: noteColour =
    params.styleColour &&
    ((!Array.isArray(params["styleColour"]) &&
      params["styleColour"] === colour.name) ||
      (Array.isArray(params["styleColour"]) &&
        params["styleColour"].find((item) => item === colour.name)))
      ? "NoColour"
      : colour.name;
</script>

<style>
  .Item {
    background: #ffffff;
    border-radius: 20px;
    padding: 16px;
    display: grid;
    gap: 10px;
    grid-template-rows: max-content;
    position: relative;
  }
  .Item.two {
    grid-template-rows: repeat(2, max-content);
  }
  .Item * {
    margin: 0;
    font-weight: 500;
  }
  /* -------------- Highlight -------------- */
  header {
    display: grid;
    grid-template-columns: 4px 1fr;
    grid-gap: 8px;
  }
  header .info {
    display: grid;
    grid-gap: 4px;
  }
  .Page {
    font-size: 0.6rem;
    float: left;
    width: max-content;
    padding: 0 8px;
    border-radius: 5px;
    align-items: center;
    display: flex;
    color: #ffffff;
  }
  .Source {
    display: grid;
    align-items: center;
    grid-template-columns: 10px 1fr;
    grid-gap: 5px;
  }
  .Source :global(svg) {
    width: 10px;
    height: auto;
    color: var(--workspace-color);
  }
  .Source p {
    font-size: 0.7rem;
    font-weight: 400;
    color: #333333;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  /* -------------- Note -------------- */
  .Note,
  .Highlight {
    font-size: 0.75rem;
    line-height: 0.9rem;
    margin: 0;
    color: #333333;
  }
  /* ------------ No colour ------------ */
  .Item header .column {
    background: #ffffff;
  }
  /* ------------ Colour 1 ------------ */
  .colour1 {
    background: #fcefe7;
  }
  .colour1 header .column,
  .colour1 .OutlineFlags li {
    background: #d86801;
  }
  /* ------------ Colour 2 ------------ */
  .colour2 {
    background: #faebf4;
  }
  .colour2 header .column,
  .colour2 .OutlineFlags li {
    background: #c0004e;
  }
  /* ------------ Colour 3 ------------ */
  .colour3 {
    background: #e2f7fb;
  }
  .colour3 header .column,
  .colour3 .OutlineFlags li {
    background: #0693b2;
  }
  /* ------------ Colour 4 ------------ */
  .colour4 {
    background: #e7f3e3;
  }
  .colour4 header .column,
  .colour4 .OutlineFlags li {
    background: #589b4c;
  }
  /* ------------ No colour ------------ */
  .NoColour {
    background: transparent;
  }
  .NoColour header .column,
  .NoColour .OutlineFlags li {
    background: #888888;
  }

  .OutlineFlags {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
    gap: 5px;
  }
  .OutlineFlags li {
    border-radius: 15px;
    color: #fff;
    display: grid;
    grid-template-columns: repeat(2, max-content);
    gap: 5px;
    align-items: center;
    padding: 2px 10px;
  }
  .OutlineFlags li p {
    font-size: 0.75rem;
  }
  .Item .Note :global(*),
  .Item .Highlight :global(*) {
    font-size: 0.75rem;
    line-height: 0.9rem;
    margin: 0;
    font-weight: 400;
    color: #333 !important;
    background: transparent !important;
  }
  .Item .Note :global(strong),
  .Item .Highlight :global(strong) {
    font-weight: 700;
  }
</style>

<div
  class="Item {noteColour}
  {noted && (highlighed || note.source) ? 'two' : ''}">
  {#if highlighed || note.source}
    <header>
      <div class="column" />
      <div class="info">
        {#if highlighed.content && (!params['styles'] || (!Array.isArray(params['styles']) && params['styles'] !== 'highlight') || (Array.isArray(params['styles']) && !params['styles'].find((item) => item === 'highlight')))}
          <p class="Highlight {noted && noted.content ? '' : 'noNote'}">
            {@html highlighed.content}
          </p>
        {/if}
        {#if note.source && note.source.name}
          <div class="Source">
            <NavSource />
            <p>{note.source.name}</p>
          </div>
        {/if}
      </div>
    </header>
  {/if}
  {#if noted && (!params['styles'] || (!Array.isArray(params['styles']) && params['styles'] !== 'note') || (Array.isArray(params['styles']) && !params['styles'].find((item) => item === 'note')))}
    <p class="Note">
      {@html noted.content}
    </p>
  {/if}
  <ul class="OutlineFlags">
    {#each note.tags as flag}
      {#if flag.type === 'flag'}
        <li>
          <svelte:component this={assignIco(flag.name)} />
          <p>{flag.name}</p>
        </li>
      {/if}
    {/each}
  </ul>
</div>
