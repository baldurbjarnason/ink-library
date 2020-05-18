<script>
  import {notes, clearSelected} from '../../stores'
  import Button from '../widgets/Button.svelte'
  import NotesCard from './NotesCard.svelte'
  import SmallButton from '../widgets/SmallButton.svelte'
  import SortSelect from '../workspace/SortSelect.svelte'
  import SortButton from '../workspace/SortButton.svelte'
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  let selecting = false
  let items
  $: if ($notes) {
    items = $notes.items
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
  .Header > div {
    display: flex;
    align-items: center;
  }
  .Cards {
    position: relative;
    display: grid;
    min-height: calc(100vh - 8rem);
    grid-template-columns: 1fr 1fr;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: var(--base);
    grid-auto-rows: max-content;
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
  grid-column: 1 / -1;
}
code {
  background-color: transparent;
    color: #C4CDD1;
    font-size: 4rem;
    margin: auto;
}
@media (max-width: 720px) {

}

</style>

    <div class="CardHeader">
    <div><SortSelect {query} path={$page.path}>Sort By: </SortSelect></div>
    <div>{#if selecting}
      <SmallButton click={() => selecting = false}>Done</SmallButton>
    {:else}
      <SmallButton click={() => selecting = true}>Select</SmallButton>
    {/if}</div>
    </div>
    <div class="Cards">
    {#if $notes.type === 'loading'}
      <div class="Loading"></div>
      {:else}
        {#each items as note}
            <NotesCard {note} {selecting} />
            {:else}
              <div class="Empty">
              <pre aria-hidden="true"><code> ̄\_(ツ)_/ ̄</code></pre>
                <p>
                  No publications...
                </p></div>
        {/each}
    {/if}
    </div>