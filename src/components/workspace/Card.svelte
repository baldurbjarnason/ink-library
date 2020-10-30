<script>
  import ItemStacks from "./ItemStacks.svelte";
  import { addSelected, removeSelected } from "../../stores";
  import { typeName } from "../typeName.js";
  export let item = {};
  export let selecting;
  let selected = false;
  export let selection = function() {};
  $: if (!selecting && selected) {
    selected = false;
  }
  $: if (selected && item.id) {
    addSelected(item);
  } else {
    removeSelected(item);
  }
  let cover;
  $: if (item.resources) {
    cover = item.resources.find(
      resource => resource.rel.indexOf("cover") !== -1
    );
    if (!cover) {
      cover = {
        href: "/img/placeholder-cover.jpg",
        rel: ["cover"]
      };
    }
  } else {
    cover = {
      href: "/img/placeholder-cover.jpg",
      rel: ["cover"]
    };
  }

  let stacks;
  if (item.tags) {
    stacks = item.tags.filter(tag => {
      if (tag.type === "stack") return tag;
    });
  }
</script>

<style>
  /* your styles go here */
  .Item,
  .Item * {
    transition: all 0.25s ease-out;
  }
  .Item {
    background-color: #fff;
    position: relative;
    border: 1px solid #eeeeee;
    border-radius: 15px;
    padding: 28px 30px;
    text-align: center;
    -webkit-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
    -moz-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.03);
  }
  .Item.selected {
    border: 1px solid var(--workspace-color);
  }
  a {
    cursor: pointer;
    text-decoration: none;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1;
  }
  .circle {
    position: absolute;
    width: 102px;
    height: 102px;
    background: var(--third-blue);
    border-radius: 50%;
    opacity: 0.6;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  img {
    width: 68px;
    height: 102px;
    border-radius: 10px;
    position: relative;
  }
  h5,
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: inherit;
    max-height: 35px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  h5 {
    font-weight: 600;
    color: #333;
  }
  p {
    font-size: 0.75rem;
    margin: 0;
  }
  .selected {
    background: #f9fbfc;
  }
  .Stacks {
    position: relative;
    z-index: 1;
  }
  .Stacks:empty {
    display: none;
  }
  @supports (-webkit-appearance: none) {
    input[type="checkbox"] {
      -webkit-appearance: none;
      width: 40px;
      height: 40px;
      position: absolute;
      top: 0;
      right: 0;
      outline: none;
      margin: 0;
      padding: 0;
      cursor: pointer;
      z-index: 1;
    }
    input[type="checkbox"]::before {
      width: 14px;
      height: 14px;
      border: 1px solid #cccccc;
      content: "";
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      border-radius: 50%;
      position: absolute;
      transition: all 0.25s ease-out;
    }
    input[type="checkbox"]:hover::before {
      background: #eeeeee;
    }
    input[type="checkbox"]:checked::before {
      border: 1px solid var(--workspace-color);
      background: var(--workspace-color);
    }
  }
  .Modified {
    text-align: right;
  }
  footer *,
  footer :global(ul) {
    margin: 0;
    padding: 0;
  }
  footer {
    display: grid;
    grid-gap: 2px;
    text-align: left;
    margin-top: 10px;
  }
  .Authors,
  .Title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: inherit;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
  }
  .Authors {
    font-weight: 400;
  }
</style>

<div class="Item" class:selected>
  <a href="library/all/all/{item.shortId}">_</a>
  <input type="checkbox" bind:checked={selected} on:click={() => selection()} />
  <span class="circle" />
  <img
    src={cover.href ? cover.href : `/img/placeholder-cover.jpg`}
    alt="Cover for {item.name}" />
  <footer>
    <h5 class="Title">{item.name}</h5>
    <div class="Authors">
      {#if item.author}
        <p class="Author">
          {#each item.author as author, i}
            {#if i !== item.author.length - 1 && i !== 0},{/if}
            {author.name}
          {/each}
        </p>
      {/if}
    </div>
    <div class="Stacks">
      {#if stacks}
        <ItemStacks {item} {selected} />
      {/if}
    </div>
  </footer>
</div>
