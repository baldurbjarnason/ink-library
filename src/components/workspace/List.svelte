<script>
  import {library, selectedItems} from '../../stores'
  import Footer from './Footer.svelte'
  import Button from '../Button.svelte'
  import Card from './Card.svelte'
  import Item from './Item.svelte'
  import HeaderArrows from './HeaderArrows.svelte'
  import SmallButton from '../SmallButton.svelte'
  import SortSelect from './SortSelect.svelte'
  import SortButton from './SortButton.svelte'
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  let selecting = false
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
    --list-template-columns: 60px 1fr 1fr 0.5fr 0.5fr 2rem;
    --item-font-size: 0.7rem;
    --list-grid-gap: calc(var(--base) * 0.5);
  }
  .Header {
    display: grid;
    grid-template-columns: var(--list-template-columns);
    padding: calc(var(--base) * 0.25);
    grid-gap: var(--list-grid-gap);
    font-size: var(--item-font-size);
    position: sticky;
    top: 82px;
    background-color: var(--main-background-color);
    z-index: 1;
  }
  .Header > div {
    display: flex;
    align-items: center;
  }
  .Cards {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--base);
  }
  .Items {
    position: relative;
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
    z-index: 1;
  }
  .Header :global(button.Button) {
    margin-left: -80%;
  }
  .Loading {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    background-color: transparent;
    box-shadow: 0 0 2px #f0f0f0,0 0 4px var(--workspace-color);
    margin: 8rem auto;
    animation-duration: 1s;
    animation-name: loading;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    opacity: 0.5;
    grid-column: 1 / -1;
  }
  @keyframes loading {
  from {
    transform: scale(.5);
    box-shadow: 0 0 2px #f0f0f0,0 0 4px var(--workspace-color);
  }
  to {
    transform: scale(1.5);
    box-shadow: 0 0 0 3px var(--workspace-color), 0 0 0 20px #f0f0f0;
  }
}
.Empty {
  text-align: center;
  color: #C4CDD1;
}
code {
  background-color: transparent;
    color: #C4CDD1;
    font-size: 4rem;
    margin: auto;
}
</style>

  {#if query["list-style"] === 'card'}
    <div class="CardHeader">
    <div><label>Sort By: <SortSelect {query} path={$page.path} /></label></div>
    <div>{#if selecting}
      <SmallButton click={() => selecting = false}>Done</SmallButton>
    {:else}
      <SmallButton click={() => selecting = true}>Select</SmallButton>
    {/if}</div>
    </div>
    <div class="Cards">
    {#if $library.type === 'loading'}
      <div class="Loading"></div>
      {:else}
        {#each items as item}
            <Card {item} {selecting} />
            {:else}
              <div class="Empty">
              <pre aria-hidden="true"><code> ̄\_(ツ)_/ ̄</code></pre>
                <p>
                  No publications...
                </p></div>
        {/each}
    {/if}
    </div>
  {:else}
    <div class="Header">
    <div>&nbsp;</div>
    <div><SortButton {query} type="title" path={$page.path}>Title</SortButton></div>
    <div>Stacks</div>
    <div><SortButton {query} type="type" path={$page.path}>Type</SortButton></div>
    <div><SortButton {query} type="modified" path={$page.path}>Modified</SortButton></div>
    <div>{#if selecting}
      <SmallButton click={() => selecting = false}>Done</SmallButton>
    {:else}
      <SmallButton click={() => selecting = true}>Select</SmallButton>
    {/if}</div>
    </div>
    <div class="Items">
    {#if $library.type === 'loading'}
      <div class="Loading"></div>
      {:else}
        {#each items as item}
            <Item {item} {selecting} />
            {:else}
              <div class="Empty">
              <pre aria-hidden="true"><code> ̄\_(ツ)_/ ̄</code></pre>
                <p>
                  No publications...
                </p></div>
        {/each}
    {/if}
    </div>
  {/if}
  {#if selecting}
    <Footer endSelection={() => {
      selecting = false
    }} />
  {/if}