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
  footer {
    text-align: left;
    margin-top: 10px;
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
    margin-bottom: 3px;
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
</style>

<div class="Item" class:selected>
  <input type="checkbox" bind:checked={selected} on:click={() => selection()} />
  <span class="circle" />
  <a href="{window.location.pathname}/{item.shortId}">
    <img src={cover.href} alt="Cover for {item.name}" />
  </a>
  <footer>
    <a href="{window.location.pathname}/{item.shortId}">
      <h5>{item.name}</h5>
    </a>
    <div class="Authors">
      {#each item.author as author, i}
        <p class="Author">
          {author.name}
          {#if i !== item.author.length - 1},{/if}
        </p>
      {/each}
      <div class="Stacks">
        <ItemStacks {item} {selected} />
      </div>
    </div>
  </footer>
  <!--
  <div class="Top">
    {#if selecting}
      <label>
        <span class="visually-hidden">Select this item</span>
        <input type="checkbox" bind:checked={selected} />
      </label>
    {:else}
      <span>&nbsp;</span>
    {/if}  
  <span>{typeName(item.type)}</span>
    <span class="Modified">
      Modified:
      <strong>
        {new Date(item.updated).toLocaleString(undefined, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        })}
      </strong>
    </span>
  </div>
  <div class="CardMain">
    <div class="Image">
      <img src={cover.href} alt="Cover for {item.name}" />
    </div>
    <div class="Name">
      <a href="{window.location.pathname}/{item.shortId}" class="title">
        {item.name}
      </a>
      <span class="title">{item.name}</span>
      <div class="Authors">
        {#each item.author as author, i}
          <span class="Author">
            {author.name}
            {#if i !== item.author.length - 1},{/if}
          </span>
        {/each}
      </div>
    </div>
    <!-- Need to add authors! --
  </div>
  <div class="Stacks">
    <ItemStacks {item} {selected} />
  </div>
  <div class="ItemEntry">
    <span />
  </div>-->
</div>
