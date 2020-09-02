<script>
  import { collections } from "../stores";
  import Audio from "./img/StypeAudio.svelte";
  import Image from "./img/StypeImage.svelte";
  import Text from "./img/StypeText.svelte";
  import Video from "./img/StypeVideo.svelte";
  import Notebook from "./img/IcoNotebook.svelte";
  import ArrowDropDown from "./img/ArrowDropDown.svelte";
  import Stack from "./img/IcoStack.svelte";
  import { page } from "../stores";
  import { goto } from "@sapper/app";

  let stackInput, typeInput;
  let types = [
    "Article",
    "Blog",
    "Book",
    "Chapter",
    "Collection",
    "Comment",
    "Conversation",
    "Course",
    "Dataset",
    "Drawing",
    "Episode",
    "Manuscript",
    "Map",
    "MediaObject",
    "MusicRecordig",
    "Painting",
    "Photograph",
    "Play",
    "Poster",
    "PublicationIssue",
    "PublicationVolume",
    "Review",
    "ShortStory",
    "Thesis",
    "VisualArtwork",
    "WebContent",
    "Person",
    "Organization"
  ];

  let createUrl = obj => {
    Object.keys(obj).forEach((key, index) => {
      if (Array.isArray(obj[key])) {
        let test = obj[key].join(`&${key}=`);
        obj[key] = test;
      }
    });
    let path = $page.path;

    const url =
      Object.keys(obj).length === 0
        ? path
        : `${path}?${decodeURIComponent(new URLSearchParams(obj).toString())}`;
    goto(url);
  };

  let unFilterIt = (a, b) => {
    let obj = $page.query;
    if (Array.isArray(obj[a])) obj[a].splice(obj[a].indexOf(b), 1);
    else delete obj[a];

    createUrl(obj);
  };

  let filterIt = (a, b) => {
    let obj = $page.query;
    if (obj[a]) {
      if (Array.isArray(obj[a])) obj[a].push(b);
      else obj[a] = [obj[a], b];
    } else {
      obj[a] = b;
    }

    createUrl(obj);
    (stackInput = ""), (typeInput = "");
  };

  let queryTypes, queryStack, arrs;
  $: if ($page.query) {
    queryTypes = [];
    queryStack = [];
    arrs = [queryTypes, queryStack];

    Object.keys($page.query).forEach((key, index) => {
      let triggerIt = key === "type" ? "0" : key === "stack" ? "1" : null;
      if (triggerIt) {
        if (Array.isArray($page.query[key])) {
          $page.query[key].map(item => {
            arrs[Number(triggerIt)].push(item);
          });
        } else {
          arrs[Number(triggerIt)].push($page.query[key]);
        }
      }
    });
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
    width: 100%;
    border: 1px solid #eeeeee;
    max-height: 300px;
    overflow-y: scroll;
  }
  ul li.empty {
    display: none;
  }
  ul li.empty:only-child {
    display: block;
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
  li:first-child:hover {
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

<div class="filter type">
  <p>Type</p>
  <input class="btn" />
  <div class="inputs">
    {#if !arrs[0].length}
      <p class="placeholder">Choose type</p>
    {:else}
      {#each arrs[0] as type}
        <p class="arr {type}">
          {type}
          <span on:click={() => unFilterIt('type', type)} />
        </p>
      {/each}
    {/if}
    <ArrowDropDown />
  </div>
  <ul>
    <li>
      <input placeholder="Search type..." bind:value={typeInput} />
    </li>
    {#if typeInput}
      {#each types as type}
        {#if !arrs[0].find(item => type === item) && type
            .toLowerCase()
            .includes(typeInput.toLowerCase())}
          <li on:click={() => filterIt('type', type)}>
            <p class={type.replace(' ', '')}>{type}</p>
          </li>
        {/if}
      {/each}
    {:else}
      {#each types as type}
        {#if !arrs[0].find(item => type === item)}
          <li on:click={() => filterIt('type', type)}>
            <p class={type.replace(' ', '')}>{type}</p>
          </li>
        {/if}
      {/each}
    {/if}
  </ul>
</div>
<div class="filter stack">
  <p>Stack</p>
  <input class="btn" />
  <div class="inputs">
    {#if !arrs[1].length}
      <p class="placeholder">
        <Stack />
        Choose stack
      </p>
    {:else}
      {#each arrs[1] as stack}
        <p class="arr {stack}">
          <Stack />
          {stack}
          <span on:click={() => unFilterIt('stack', stack)} />
        </p>
      {/each}
    {/if}
    <ArrowDropDown />
  </div>
  <ul>
    <li>
      <input placeholder="Search stack..." bind:value={stackInput} />
    </li>
    {#if stackInput}
      {#each $collections as stack}
        {#if !arrs[1].find(item => stack.name === item) && stack.name
            .toLowerCase()
            .includes(stackInput.toLowerCase())}
          <li on:click={() => filterIt('stack', stack.name)}>
            <p class={stack.name}>
              <Stack />
              {stack.name}
            </p>
          </li>
        {/if}
      {/each}
    {:else}
      {#each $collections as stack}
        {#if !arrs[1].find(item => stack.name === item)}
          <li on:click={() => filterIt('stack', stack.name)}>
            <p class={stack.name}>
              <Stack />
              {stack.name}
            </p>
          </li>
        {/if}
      {/each}
    {/if}
  </ul>
</div>
