<script>
  import {library} from '../../stores'
  import Card from './Card.svelte'
  import Item from './Item.svelte'
  import HeaderArrows from './HeaderArrows.svelte'
  import SmallButton from '../SmallButton.svelte'
  import SortSelect from './SortSelect.svelte'
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  let items
  $: if ($library) {
    items = $library.items
  }
  let query = {}
  let params = {}
  $: if ($page) {
    query = Object.assign({}, $page.query);
    params = Object.assign({}, $page.params);
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
  .Cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .CardHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--item-font-size);
    position: sticky;
    top: 82px;
    background-color: var(--main-background-color);
    padding: calc(var(--base) * 0.25) 0;
  }
</style>

  {#if query["list-style"] === 'card'}
    <div class="CardHeader">
    <div><label>Sort By: <SortSelect /></label></div>
    <div><SmallButton>Select</SmallButton></div>
    </div>
    <div class="Cards">
    {#each items as item}
        <Card {item} />
    {/each}
    </div>
  {:else}
    <div class="Header">
    <div>&nbsp;</div>
    <div><HeaderArrows /> Title</div>
    <div><HeaderArrows /> Stacks</div>
    <div><HeaderArrows /> Type</div>
    <div><HeaderArrows /> Modified</div>
    <div><SmallButton>Select</SmallButton></div>
    </div>
    <div class="Items">
    {#each items as item}
        <Item {item} />
    {/each}
    </div>
  {/if}