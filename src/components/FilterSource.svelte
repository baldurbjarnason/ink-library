<script>
  import { collections } from "../stores";
  import Audio from "./img/StypeAudio.svelte";
  import Image from "./img/StypeImage.svelte";
  import Text from "./img/StypeText.svelte";
  import Video from "./img/StypeVideo.svelte";
  import Notebook from "./img/IcoNotebook.svelte";
  import ArrowDropDown from "./img/ArrowDropDown.svelte";
  import Stack from "./img/IcoStack.svelte";

  let stacksArr = [];
  function stackClick(item) {
    stacksArr.push(item);
    stacksArr = stacksArr;
  }
  function closeStack(item) {
    var index = stacksArr.indexOf(item);
    stacksArr.splice(index, 1);
    stacksArr = stacksArr;
  }
  /////////////////////////////////////////// Notebook
  let dynamicNbk = ["Aliquam", "Fusce", "Integer", "Nullam", "Duis"];
  let notebooks = [];

  function handleClick(item) {
    var index = dynamicNbk.indexOf(item);
    dynamicNbk.splice(index, 1);
    dynamicNbk = dynamicNbk;

    notebooks.push(item);
    notebooks = notebooks;
  }
  function closeNotebook(item) {
    var index = notebooks.indexOf(item);
    notebooks.splice(index, 1);
    notebooks = notebooks;

    dynamicNbk.push(item);
    dynamicNbk = dynamicNbk;
  }
  /////////////////////////////////////////// Type
  let dynType = [
    {
      component: Text,
      string: "Text"
    },
    {
      component: Video,
      string: "Video"
    },
    {
      component: Audio,
      string: "Audio"
    },
    {
      component: Image,
      string: "Image"
    }
  ];
  let types = [];

  function typeClick(item) {
    var index = dynType.indexOf(item);
    dynType.splice(index, 1);
    dynType = dynType;

    types.push(item);
    types = types;
  }
  function closeType(item) {
    var index = types.indexOf(item);
    types.splice(index, 1);
    types = types;

    dynType.push(item);
    dynType = dynType;
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
    z-index: 1;
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
    border: 1px solid #eeeeee;
  }
  ul :global(svg) {
    width: 9px;
    margin-right: 3px;
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
  .ntbk li:first-child:hover,
  .stack li:first-child:hover {
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
    width: 100%;
  }
  li input::placeholder {
    color: #bbd2db;
  }
  li p {
    font-weight: 500;
  }
</style>

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
      <p class="placeholder" title="hey">
        <Notebook />
        Choose notebooks
      </p>
    {/if}
    <ArrowDropDown />
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
</div>
<div class="filter type">
  <p>Type</p>
  <input class="btn" />
  <div class="inputs">
    {#each types as type}
      <p class="arr {type.string}">
        <svelte:component this={type.component} />
        {type.string}
        <span on:click={() => closeType(type)} />
      </p>
    {/each}
    {#if !types.length}
      <p class="placeholder">Choose type</p>
    {/if}
    <ArrowDropDown />
  </div>
  <ul>
    {#each dynType as type}
      <li on:click={() => typeClick(type)}>
        <p class={type.string}>
          <svelte:component this={type.component} />
          {type.string}
        </p>
      </li>
    {/each}
  </ul>
</div>
<div class="filter stack">
  <p>Stack</p>
  <input class="btn" />
  <div class="inputs">
    {#each stacksArr as stack}
      <p class="arr {stack.name}">
        <Stack />
        {stack.name}
        <a href="/library/all/all">
          <span on:click={() => closeStack(stack)} />
        </a>
      </p>
    {/each}
    {#if !stacksArr.length}
      <p class="placeholder">
        <Stack />
        Choose stack
      </p>
    {/if}
    <ArrowDropDown />
  </div>
  <ul>
    <!--
    <li>
      <input placeholder="Choose stack..." />
    </li>-->
    {#each $collections as stack}
      {#if !stacksArr.length || stack.name !== stacksArr[0].name}
        <li on:click={() => stackClick(stack)}>
          <a href="/library/all/{encodeURIComponent(stack.name)}">
            <p class={stack.name}>
              <Stack />
              {stack.name}
            </p>
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</div>
