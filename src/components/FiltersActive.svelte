<script>
  import Audio from "./img/sTypeAudio.svelte";
  import Image from "./img/sTypeImage.svelte";
  import Text from "./img/sTypeText.svelte";
  import Video from "./img/sTypeVideo.svelte";
  import Notebook from "./img/icoNotebook.svelte";

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
  function close(item) {
    var index = notebooks.indexOf(item);
    notebooks.splice(index, 1);
    notebooks = notebooks;

    dynamicNbk.push(item);
    dynamicNbk = dynamicNbk;
  }
  /////////////////////////////////////////// Notebook
  let dynColor = ["Pink", "Orange", "Blue", "Green"];
  let colors = [];

  function colorClick(item) {
    var index = dynColor.indexOf(item);
    dynColor.splice(index, 1);
    dynColor = dynColor;

    colors.push(item);
    colors = colors;
  }
  function closeColor(item) {
    var index = colors.indexOf(item);
    colors.splice(index, 1);
    colors = colors;

    dynColor.push(item);
    dynColor = dynColor;
  }

  /////////////////////////////////////////// Notebook
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
    z-index: 5;
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
  ul {
    position: absolute;
    z-index: 1;
    bottom: 0;
    transform: translateY(calc(100% + 5px));
    background: #ffffff;
    list-style: none;
    padding: 0;
    border-radius: 10px;
    box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.05);
    display: none;
    margin: 5px 0 0;
    right: 0;
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
    padding: 10px;
    cursor: pointer;
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
  ul {
    min-width: 100px;
  }
  ul :global(svg) {
    width: 9px;
    margin-right: 3px;
  }
  /*
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

  .arr.Pink {
    color: #c0004e;
    background: #ffe4f0;
    border: none;
  }
  ul .Pink {
    color: #c0004e;
  }
  ul .Pink::before,
  .arr.Pink::before,
  .arr.Pink span::before,
  .arr.Pink span::after {
    background: #c0004e;
  }

  .arr.Orange {
    color: #d86801;
    background: #ffebda;
    border: none;
  }
  ul .Orange {
    color: #d86801;
  }
  ul .Orange::before,
  .arr.Orange::before,
  .arr.Orange span::before,
  .arr.Orange span::after {
    background: #d86801;
  }

  .arr.Green {
    color: #589b4c;
    background: #e6f8e4;
    border: none;
  }
  ul .Green {
    color: #589b4c;
  }
  ul .Green::before,
  .arr.Green::before,
  .arr.Green span::before,
  .arr.Green span::after {
    background: #589b4c;
  }

  .arr.Blue {
    color: #0693b2;
    background: #e2f7fa;
    border: none;
  }
  ul .Blue {
    color: #0693b2;
  }
  ul .Blue::before,
  .arr.Blue::before,
  .arr.Blue span::before,
  .arr.Blue span::after {
    background: #0693b2;
  }*/
</style>

<div class="filter ntbk">
  <p>Notebook</p>
  <input class="btn" />
  <div class="inputs">
    {#each notebooks as notebook}
      <p class="arr">
        <Notebook />
        {notebook}
        <span on:click={() => close(notebook)} />
      </p>
    {/each}
    {#if !notebooks.length}
      <p class="placeholder" title="hey">Choose notebooks</p>
    {/if}
    <svg
      class="arrow"
      width="7"
      height="11"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.3,8.2C6.7,8.9,5.6,8.9,5,8.2L0.3,2.4C-0.5,1.5,0.2,0,1.5,0l9.3,0c1.3,0,2,1.5,1.2,2.4L7.3,8.2z"
        fill="currentColor" />
    </svg>
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
<!--
<div class="filter color">
  <p>Color</p>
  <input class="btn" />
  <div class="inputs">
    {#each colors as color}
      <p class="arr {color}">
        {color}
        <span on:click={() => closeColor(color)} />
      </p>
    {/each}
    {#if !colors.length}
      <p class="placeholder">Choose color</p>
    {/if}
    <svg
      class="arrow"
      width="7"
      height="11"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.3,8.2C6.7,8.9,5.6,8.9,5,8.2L0.3,2.4C-0.5,1.5,0.2,0,1.5,0l9.3,0c1.3,0,2,1.5,1.2,2.4L7.3,8.2z"
        fill="currentColor" />
    </svg>
  </div>
  <ul>
    {#each dynColor as color}
      <li on:click={() => colorClick(color)}>
        <p class={color}>{color}</p>
      </li>
    {/each}
  </ul>
</div>-->

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
    <svg
      class="arrow"
      width="7"
      height="11"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.3,8.2C6.7,8.9,5.6,8.9,5,8.2L0.3,2.4C-0.5,1.5,0.2,0,1.5,0l9.3,0c1.3,0,2,1.5,1.2,2.4L7.3,8.2z"
        fill="currentColor" />
    </svg>
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
<div>
  <p>Stack</p>
  <input />
</div>
