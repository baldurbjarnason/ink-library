<script>
  import {library} from '../../stores'
  import Item from './Item.svelte'
  import HeaderArrows from './HeaderArrows.svelte'
  let items
  $: if ($library) {
    items = $library.items
  }
</script>

<style>
  :root {
    --list-template-columns: 60px 1fr 1fr 0.5fr 0.5fr 0.3fr;
    --item-font-size: 0.7rem;
    --list-grid-gap: calc(var(--base) * 0.5);
  }
  .Header {
    display: grid;
    grid-template-columns: var(--list-template-columns);
    padding: calc(var(--base) * 0.5);
    grid-gap: var(--list-grid-gap);
    font-size: var(--item-font-size);
    position: sticky;
    top: 82px;
    background-color: var(--main-background-color);
  }
  .Header > div {
    display: flex;
    align-items: center;
  }
</style>

<div class="Header">
<div>&nbsp;</div>
<div><HeaderArrows /> Name</div>
<div><HeaderArrows /> Stacks</div>
<div><HeaderArrows /> Type</div>
<div><HeaderArrows /> Modified</div>
<div>&nbsp;</div>
</div>
{#each items as item}
   <!-- content here -->
   <div><Item {item} /></div>
{/each}