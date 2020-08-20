<script>
  import Notebook from "./img/icoNotebook.svelte";
  import IcoNotebook from "./img/IcoNotebook.svelte";
  import ArrowDropDown from "./img/ArrowDropDown.svelte";
  import FlagFurtherRead from "./img/FlagFurtherRead.svelte";
  import FlagIdea from "./img/FlagIdea.svelte";
  import FlagImportant from "./img/FlagImportant.svelte";
  import FlagImpTerm from "./img/FlagImpTerm.svelte";
  import FlagQuestion from "./img/FlagQuestion.svelte";
  import FlagReference from "./img/FlagReference.svelte";
  import FlagRevisit from "./img/FlagRevisit.svelte";
  import FlagToDo from "./img/FlagToDo.svelte";
  import FlagUrgent from "./img/FlagUrgent.svelte";
  import IcoFlag from "./img/IcoFlag.svelte";
  import IcoColor from "./img/IcoColor.svelte";
  import { page, tags } from "../stores";
  import { goto } from "@sapper/app";

  /////////////////////////////////////////// Colour
  function assignCol(icon) {
    switch (icon) {
      case "colour 1":
        return "Orange";
      case "colour 2":
        return "Pink";
      case "colour 3":
        return "Blue";
      case "colour 4":
        return "Green";
    }
  }
  $: colorArr = $tags.items.filter(
    item => item.type === "flag" && item.name.startsWith("colour")
  );
  $: currentColor =
    $page.query.flag && $page.query.flag.startsWith("colour")
      ? $page.query.flag
      : undefined;

  function colorClick(item) {
    let flagged = { flag: item.toLowerCase() };
    let path = $page.path;

    const url = `${path}?${new URLSearchParams(flagged).toString()}`;
    goto(url);
  }

  /////////////////////////////////////////// Flags
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

  $: flagsArr = $tags.items.filter(
    item => item.type === "flag" && !item.name.startsWith("colour")
  );
  $: currentFlag =
    $page.query.flag && !$page.query.flag.startsWith("colour")
      ? $page.query.flag
      : undefined;

  function flagClick(item) {
    let flagged = { flag: item.toLowerCase() };
    let path = $page.path;

    const url = `${path}?${new URLSearchParams(flagged).toString()}`;
    goto(url);
  }

  function removeFilter(item) {
    //if (Object.keys($page.query).length
    /*
    Object.keys($page.query).forEach((key, index) => {
      console.log(key, $page.query[key]);
    });*/
    goto($page.path);
  }
</script>

<style>
  .filter {
    position: relative;
  }
  p {
    font-size: var(--item-font-size);
    color: var(--workspace-color);
    font-weight: 700;
    margin: 0;
  }
  .inputs {
    border: 1px solid #dde8ed;
    background: #ffffff;
    border-radius: 10px;
    padding: 4px 15px 0 4px;
    position: relative;
    margin-top: 3px;
    cursor: pointer;
    float: left;
    width: 100%;
  }
  .inputs:active ~ ul {
    display: none !important;
  }
  .arr {
    font-weight: 500;
    border: 1px solid #dde8ed;
    border-radius: 6px;
    padding: 2px 0 2px 4px;
    line-height: 18px;
    background: var(--main-background-color);
    position: relative;
    margin-right: 4px;
    margin-bottom: 4px;
    z-index: 2;
    float: left;
  }
  .arr span {
    width: 18px;
    height: 18px;
    float: right;
    margin-left: 1px;
    position: relative;
  }
  .arr span:hover::before,
  .arr span:hover::after {
    background: #15536d;
  }
  .arr span::before,
  .arr span::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    background: var(--workspace-color);
    border-radius: 10px;
  }
  .arr span::before {
    width: 50%;
    height: 2px;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .arr span::after {
    width: 2px;
    height: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .arrow {
    position: absolute;
    right: 8px;
    top: 10px;
    color: var(--action);
  }
  .inputs .placeholder {
    color: #bbd2db;
    font-weight: 400;

    padding: 2px 2px 2px 4px;
    line-height: 18px;
    margin-bottom: 4px;
    float: left;
  }
  .placeholder :global(svg) {
    float: left;
    margin-top: 4px;
    margin-right: 5px;
    height: 11px;
  }
  ul {
    position: absolute;
    z-index: 1;
    bottom: 0;
    transform: translateY(calc(100% + 5px));
    background: #ffffff;
    list-style: none;
    padding: 0;
    border-radius: 10px;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);
    display: none;
    margin: 5px 0 0;
    right: 0;
    min-width: 75%;
  }
  input.btn {
    outline: none;
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: calc(100% - 19px);
    margin-top: 19px;
    opacity: 0;
    z-index: 1;
  }
  .filter:focus-within ul,
  .filter:active ul {
    display: block;
  }
  li {
    padding: 10px 20px;
    cursor: pointer;
  }
  li:last-child {
    border-bottom: none;
  }
  li:hover {
    background: #f6f6f6;
  }
  .ntbk li:first-child:hover {
    cursor: default;
    background: transparent;
  }
  li input {
    border: none;
    background: var(--main-background-color);
    border-radius: 10px;
    color: var(--action);
    font-size: var(--item-font-size);
    padding: 10px;
    outline: none;
  }
  li input::placeholder {
    color: #bbd2db;
  }
  li p {
    font-weight: 500;
  }
  ul :global(svg) {
    width: 9px;
    margin-right: 3px;
  }

  .color ul li p::before,
  .color .arr::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-top: 3px;
    float: left;
    margin-right: 4px;
  }

  .arr.colour2 {
    color: #c0004e;
    background: #ffe4f0;
    border: none;
  }
  ul .colour2 {
    color: #c0004e;
  }
  ul .colour2::before,
  .arr.colour2::before,
  .arr.colour2 span::before,
  .arr.colour2 span::after {
    background: #c0004e;
  }

  .arr.colour1 {
    color: #d86801;
    background: #ffebda;
    border: none;
  }
  ul .colour1 {
    color: #d86801;
  }
  ul .colour1::before,
  .arr.colour1::before,
  .arr.colour1 span::before,
  .arr.colour1 span::after {
    background: #d86801;
  }

  .arr.colour4 {
    color: #589b4c;
    background: #e6f8e4;
    border: none;
  }
  ul .colour4 {
    color: #589b4c;
  }
  ul .colour4::before,
  .arr.colour4::before,
  .arr.colour4 span::before,
  .arr.colour4 span::after {
    background: #589b4c;
  }

  .arr.colour3 {
    color: #0693b2;
    background: #e2f7fa;
    border: none;
  }
  ul .colour3 {
    color: #0693b2;
  }
  ul .colour3::before,
  .arr.colour3::before,
  .arr.colour3 span::before,
  .arr.colour3 span::after {
    background: #0693b2;
  }
</style>

<!--
<div class="filter ntbk">
  <p>Notebook</p>
  <input class="btn" />
  <div class="inputs">
    {#each notebooks as notebook}
      <p class="arr">
        <Notebook />
        {notebook}
        <span on:click={() => closeNotebook(notebook)} />
      </p>
    {/each}
    {#if !notebooks.length}
      <p class="placeholder">
        <Notebook />
        Choose notebooks
      </p>
    {/if}
  </div>
  <ul>
    <li>
      <input placeholder="Choose notebook..." />
    </li>
    {#each dynamicNbk as item}
      <li on:click={() => handleClick(item)}>
        <p>
          <Notebook />
          {item}
        </p>
      </li>
    {/each}
  </ul>
</div>-->

<div class="filter color">
  <p>Color</p>
  <input class="btn" />
  <div class="inputs">
    <!--
    {#each colorArr as color}
      <p class="arr {color}">
        {color}
        <span on:click={() => closeColor(color)} />
      </p>
    {/each}-->
    {#if currentColor}
      <p class="arr {currentColor.replace(' ', '')}">
        {assignCol(currentColor)}
        <span on:click={() => removeFilter(currentColor)} />
      </p>
    {:else}
      <p class="placeholder">
        <IcoColor />
        Choose color
      </p>
    {/if}
    <ArrowDropDown />
  </div>
  <ul>
    {#each colorArr as color}
      {#if !currentColor || currentColor !== color.name}
        <li on:click={() => colorClick(color.name)}>
          <p class={color.name.replace(' ', '')}>{assignCol(color.name)}</p>
        </li>
      {/if}
    {/each}
  </ul>
</div>

<div class="filter type">
  <p>Flag</p>
  <input class="btn" />
  <div class="inputs">
    <!--
    {#each flags as flag}
      <p class="arr {flag.string}">
        <svelte:component this={assignIco(flag.string)} />
        {flag.string}
        <span on:click={() => closeFlag(flag)} />
      </p>
    {/each}-->
    {#if currentFlag}
      <p class="arr {currentFlag.replace(' ', '')}">
        <svelte:component this={assignIco(currentFlag)} />
        {currentFlag}
        <span on:click={() => removeFilter(currentFlag)} />
      </p>
    {:else}
      <p class="placeholder">
        <IcoFlag />
        Choose flag
      </p>
    {/if}
    <ArrowDropDown />
  </div>
  <ul>
    {#each flagsArr as flag}
      {#if !currentFlag || currentFlag !== flag.name}
        <li on:click={() => flagClick(flag.name)}>
          <p class={flag.name}>
            <svelte:component this={assignIco(flag.name)} />
            {flag.name}
          </p>
        </li>
      {/if}
    {/each}
  </ul>
</div>
