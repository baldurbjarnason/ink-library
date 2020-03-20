<script>
  import ItemStacks from './ItemStacks.svelte'
  import ReadButton from './ReadButton.svelte'
  import {addSelected, removeSelected} from '../../stores'
  import {typeName} from '../typeName.js'
  export let item = {}
  export let selecting
  let selected = false
  $: if (!selecting && selected) {
    selected = false
  }
  $: if (selected && item.id) {
    addSelected(item)
  } else {
    removeSelected(item)
  }
  let cover
  $: if (item.resources) {
    cover = item.resources.find(resource => resource.rel.indexOf('cover') !== -1)
    if (!cover) {
      cover = {
        href: "/img/placeholder-cover.jpg",
        rel: ["cover"]
      }
    }
  } else {
    cover = {
      href: "/img/placeholder-cover.jpg",
      rel: ["cover"]
    }
  }
</script>

<style>
  /* your styles go here */
  .Item {
    background-color: white;
    min-height: calc(var(--base) * 4);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 2px;
    border-radius: 15px;
    font-size: var(--item-font-size);
    position: relative;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1), box-shadow 250ms cubic-bezier(0.075, 0.82, 0.165, 1), transform 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .Image {
    padding: calc(var(--base) * 0.5) 0;
    display: flex;
  }
  .Image img {
    height: calc(var(--base)*5);
    width: auto;
    object-fit: contain;
  }
  .Name {
    font-size: var(--item-font-size);
    font-weight: 600;
    padding: calc(var(--base) * 0.5) 0;
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
  }
  .Author {
    color: var(--medium);
    font-weight: 300;
    font-style: italic;
  }
  .selected .Author {
    color: white;
  }
  .Top {
    display: grid;
    grid-template-columns: 1rem 1fr 1fr;
    border-bottom: 0.5px solid var(--light);
    padding: calc(var(--base) * 0.5);
    align-items: center;
    grid-gap: 0.125rem;
  }
  .Top label {
    display: flex;
  }
  .CardMain {
    display: grid;
    grid-template-columns: auto 1fr;
    padding: 0 calc(var(--base) * 0.5);
    grid-gap: calc(var(--base) * 0.5);
  }
  .Stacks {
    padding: calc(var(--base) * 0.5);
  }
  .ItemEntry {
    padding: calc(var(--base) * 0.5);
    display: flex;
  }
  .ItemEntry span {
    margin: auto 0 auto auto;
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
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.1);
    transform: translate(-5px, -5px);
    color: white;
    background-color: var(--workspace-color);
  }
  @supports(-webkit-appearance: none) {
    input[type="checkbox"] {
      -webkit-appearance: none;
      width: 0.75rem;
      height: 0.75rem;
      border: 2px solid  var(--workspace-color);
      border-radius: 4px;
      margin: 0;
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
      margin-left: 1px;
      margin-top: 1px;
      content: "";
      width: .4rem;
      height: .4rem;
      background-color: var(--workspace-color);
      border-radius: 2px;
    }
    .selected input[type="checkbox"]:checked::after {
      background-color: white;
    }
}
.Modified {
  text-align: right;
}
</style>

<div class="Item" class:selecting class:selected>
  <div class="Top">{#if selecting}
    <label><span class="visually-hidden">Select this item</span><input type="checkbox" bind:checked={selected}></label>
  {:else}
    <span>&nbsp;</span>
  {/if}<span>{typeName(item.type)}</span> <span class="Modified">Modified:  <strong>{new Date(item.updated).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' })}</strong></span></div>
  <div class="CardMain">
    <div class="Image"><img src="{cover.href}" alt="Cover for {item.name}"></div>
    <div class="Name"><span class="title">{item.name}</span>
      <div class="Authors">
      {#each item.author as author, i}
        <span class="Author">{author.name}{#if i !== item.author.length - 1}, {/if}</span>
      {/each}
      </div>
    </div>
  <!-- Need to add authors! -->
  </div>
  <div class="Stacks">
    <ItemStacks {item} {selected} />
  </div>
  <div class="ItemEntry"><span><ReadButton {item} /></span></div>
</div>