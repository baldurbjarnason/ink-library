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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 2px;
    border-radius: 15px;
    font-size: var(--item-font-size);
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
  .Top {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid var(--light);
    padding: calc(var(--base) * 0.5);
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
</style>

<div class="Item">
  <div class="Top"><span>{item.type}</span><span>Modified:  <strong>{item.updated}</strong></span></div>
  <div class="CardMain">
    <div class="Image"><img src="{cover.href}" alt="Cover for {item.name}"></div>
    <div class="Name"><span class="title">{item.name}</span>
      <div class="Authors">
      {#each item.author as author}
        <span class="Author">{author.name}</span>
      {/each}
      </div>
    </div>
  <!-- Need to add authors! -->
  </div>
  <div class="Stacks">
    <ItemStacks {item} />
  </div>
  <div class="ItemEntry"><span><ReadButton {item} /></span></div>
</div>