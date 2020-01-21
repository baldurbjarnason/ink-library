<script>
  import ItemStacks from './ItemStacks.svelte'
  import ReadButton from './ReadButton.svelte'
  export let item = {}
  let cover = {}
  $: if (item.resources) {
    cover = item.resources.find(resource => resource.rel.indexOf('cover') !== -1)
  }
</script>

<style>
  /* your styles go here */
  .Item {
    background-color: white;
    min-height: calc(var(--base) * 4);
    display: grid;
    grid-template-columns: 60px 1fr 0.75fr 0.5fr 0.5fr 0.3fr;
    grid-gap: calc(var(--base) * 0.25);
    margin: 2px;
    border-radius: 15px;
    padding: calc(var(--base) * 0.25);
    min-width: 600px;
    --item-font-size: 0.7rem;
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
  }
  .ItemEntry {
    font-size: var(--item-font-size);
    font-weight: 300;
    display: flex;
  }
  .ItemEntry span {
    margin: auto;
  }
</style>

<div class="Item">
  <div class="Image"><img src="{cover.href}" alt="Cover for {item.name}"></div>
  <div class="Name">{item.name}</div>
  <div class="Stacks">
    <ItemStacks {item} />
  </div>
  <div class="ItemEntry"><span>{item.type}</span></div>
  <div class="ItemEntry"><span>{item.updated}</span></div>
  <div class="ItemEntry"><span><ReadButton {item} /></span></div>
</div>