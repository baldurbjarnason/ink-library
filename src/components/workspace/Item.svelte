<script>
  import {addSelected, removeSelected} from '../../stores'
  import ItemStacks from './ItemStacks.svelte'
  import ReadButton from './ReadButton.svelte'
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
  let cover = {}
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
    display: grid;
    grid-template-columns: var(--list-template-columns);
    grid-gap: calc(var(--base) * 0.5);
    margin: 2px;
    border-radius: 15px;
    padding: calc(var(--base) * 0.25) calc(var(--base) * 0.5) calc(var(--base) * 0.25) calc(var(--base) * 0.25);
    min-width: 600px;
    position: relative;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1), box-shadow 250ms cubic-bezier(0.075, 0.82, 0.165, 1), transform 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .Image {
    padding: calc(var(--base) * 0.25) 0;
    display: flex;
    max-height: calc(var(--base)*4);
  }
  .Image img {
    height: auto;
    width: auto;
    object-fit: contain;
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
  .ItemEntry span, .ItemEntry label {
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
  @supports(-webkit-appearance: none) {
    input[type="checkbox"] {
      -webkit-appearance: none;
      width: 0.75rem;
      height: 0.75rem;
      border: 2px solid  var(--workspace-color);
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
      width: .4rem;
      height: .4rem;
      background-color: var(--workspace-color);
      border-radius: 2px;
    }
    .selected input[type="checkbox"]:checked::after {
      background-color: white;
    }
}
.Item a {
  color: black;
  text-decoration: none;
}
.Item a:hover {
  color: var(--hover);
  text-decoration: underline;
}
@media (max-width: 720px) {
  .Item {
    min-width: auto;
    grid-template-columns: 60px 1fr 1rem;
  }
  .Stacks, .ItemEntry {
    display: none;
  }
  .ItemEntry.Last {
    display: flex;
  }
}
</style>

<div class="Item" class:selecting class:selected>
  <div class="Image"><img src="{cover.href}" alt="Cover for {item.name}"></div>
  <div class="Name"><a href="{window.location.pathname}/{item.shortId}" class="title">{item.name}</a>
  <div class="Authors">
  {#each item.author as author, i}
     <span class="Author">{author.name}{#if i !== item.author.length - 1}, {/if}</span>
  {/each}
  </div>
  </div>
  <div class="Stacks">
    <ItemStacks {item} {selected} />
  </div>
  <div class="ItemEntry"><span>{item.type}</span></div>
  <div class="ItemEntry"><span>{new Date(item.updated).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' })}</span></div>
  <div class="ItemEntry Last">{#if selecting}
    <label><span class="visually-hidden">Select this item</span><input type="checkbox" bind:checked={selected}></label>
  {:else}
    <span><a href="{window.location.pathname}/{item.shortId}" class="Arrow">
      <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4.94971" y="6.46447" width="7" height="2" rx="0.999999" transform="rotate(-135 4.94971 6.46447)" fill="#3988C0"/>
  <rect y="8.58579" width="7" height="2" rx="0.999999" transform="rotate(-45 0 8.58579)" fill="#3988C0"/>
  </svg>
    </a></span>
  {/if}</div>
</div>