<script>
  import { addSelected, removeSelected, page } from "../../stores";
  import ItemStacks from "./ItemStacks.svelte";
  import { typeName } from "../typeName.js";
  export let item = {};
  export let selecting;
  let selected = false;
  $: if (!selecting && selected) {
    selected = false;
  }
  $: if (selected && item.id) {
    addSelected(item);
  } else {
    removeSelected(item);
  }
  let cover = {};
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
</script>

<style>
  /* your styles go here */
  .Item .Name {
    justify-content: center;
  }
  .title,
  .Author,
  .Stacks :global(ul) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: inherit;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
  .title {
    max-height: 31px;
    -webkit-line-clamp: 2;
  }
  .Author {
    max-height: 15px;
    -webkit-line-clamp: 1;
  }
  .Stacks :global(ul) {
    padding-top: 7px;
    max-height: 22px;
    -webkit-line-clamp: 1;
  }

  .Item {
    grid-template-columns: 55px 1fr;
    margin: 0;
    padding: 0 0 0 10px;
    min-height: calc(var(--base) * 4);
    display: grid;
    grid-gap: 30px;
    border-radius: 15px;
    position: relative;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1),
      box-shadow 250ms cubic-bezier(0.075, 0.82, 0.165, 1),
      transform 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .Image {
    display: flex;
    border-radius: 10px;
    position: relative;
  }
  .Image::before {
    content: "";
    display: block;
    opacity: 0.6;
    background: #dde8ed;
    width: 75px;
    height: 75px;
    position: absolute;
    top: -5px;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
  .Image img {
    height: auto;
    width: auto;
    object-fit: contain;
    border-radius: 10px;
    z-index: 1;
  }
  .Name {
    font-size: var(--item-font-size);
    font-weight: 600;
    padding: calc(var(--base) * 0.5) 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .ItemEntry {
    font-size: var(--item-font-size);
    font-weight: 300;
    display: flex;
  }
  .ItemEntry span,
  .ItemEntry label {
    margin: auto 0;
  }
  .Author {
    color: var(--medium);
    font-weight: 300;
    font-style: italic;
  }
  .selected .Author {
    color: white;
  }
  .selecting {
    box-shadow: 0 0 0 2px var(--light);
  }
  .selecting label::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .selected {
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.05);
    transform: translate(-5px, -5px);
    color: white;
    background-color: var(--workspace-color);
  }
  .Item.selected a {
    color: white;
  }
  @supports (-webkit-appearance: none) {
    input[type="checkbox"] {
      -webkit-appearance: none;
      width: 0.75rem;
      height: 0.75rem;
      border: 2px solid var(--workspace-color);
      border-radius: 4px;
    }
    .selected input[type="checkbox"] {
      border-color: white;
    }
    input[type="checkbox"]:checked {
      position: relative;
      /* Do a bug fix to keep iOS from adding dark background. */
      background: none;
    }
    input[type="checkbox"]:checked::after {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -0.2rem;
      margin-top: -0.2rem;
      content: "";
      width: 0.4rem;
      height: 0.4rem;
      background-color: var(--workspace-color);
      border-radius: 2px;
    }
    .selected input[type="checkbox"]:checked::after {
      background-color: white;
    }
  }
  .Item a {
    color: #333333;
    text-decoration: none;
  }
  .Item a:hover {
    color: var(--hover);
    text-decoration: underline;
  }
  @media (max-width: 849px) {
    .Item {
      display: block;
      background-color: #fff;
      position: relative;
      border: 1px solid #eee;
      border-radius: 15px;
      padding: 28px 30px 20px;
      text-align: center;
      box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.03);
    }
    .Image {
      width: 68px;
      position: relative;
      margin: 0 auto;
    }
    .Image::before {
      top: -10px;
      width: 95px;
      height: 95px;
    }
  }
</style>

<div class="Item" class:selecting class:selected>
  <div class="Image">
    <img src={cover.href} alt="Cover for {item.name}" />
  </div>
  <div class="Name">
    <a href={`/library/all/all/${item.shortId}`} class="title">{item.name}</a>
    <div class="Authors">
      {#each item.author as author, i}
        <span class="Author">
          {author.name}
          {#if i !== item.author.length - 1},{/if}
        </span>
      {/each}
    </div>

    <div class="Stacks">
      <ItemStacks {item} {selected} />
    </div>
  </div>
  <!--
  <div class="Stacks">
    <ItemStacks {item} {selected} />
  </div>
  <div class="ItemEntry">
    <span>{typeName(item.type)}</span>
  </div>
  <div class="ItemEntry">
    <span>
      {new Date(item.updated).toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      })}
    </span>
  </div>
  <div class="ItemEntry Last">
    {#if selecting}
      <label>
        <span class="visually-hidden">Select this item</span>
        <input type="checkbox" bind:checked={selected} />
      </label>
    {/if}
  </div>-->
</div>
