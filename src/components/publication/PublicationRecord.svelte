<script>
  import {publication, workspaces, page} from '../../stores'
	import { fly } from 'svelte/transition';
  import { elasticInOut } from 'svelte/easing';
  import ItemStacks from '../workspace/ItemStacks.svelte';
  import NavButton from './NavButton.svelte';
  import Card from './Card.svelte';
  import Keyword from './Keyword.svelte';
  import Tab from './Tab.svelte';
  import Header from './Header.svelte';
  import Metadata from './Metadata.svelte';

</script>
<!-- What we need here is a grid with a top bar followed by a three column central view (middle being the main). Top bar has a tab switcher between workspaces and a return to workspace link. Ignore related to begin with. -->
<style>
  /* your styles go here */
  .Publication {
    --gap: var(--base);
    display: grid;
    grid-template-columns: minmax(0,.5fr) 1fr .6fr;
    grid-row-gap: var(--base);
    grid-column-gap: var(--gap);
    --item-font-size: 0.8rem;
    --reader-font-size: 0.8rem;
  }
  /* @media (max-width: 1100px) {
    .Publication {
      --gap: var(--base);
    }
  } */
  h2 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }
  .Description {
    font-size:  var(--item-font-size);
  }

  .Keywords {
    padding: var(--base) 0;
  }
</style>

<div class="Publication">
{#if $publication.type !== "loading"}

<Header />

  <div class="LeftBox">
    <Card>
      <Metadata />
    </Card>
    <Card><h2>Keywords</h2>
    <div class="Keywords">
    {#each $publication.keywords as keyword}
       <Keyword {keyword} />
    {/each}
    </div>
    </Card>
  </div>

  <div class="CenterBox">
    <Card><h2>Description</h2>
    
    <div class="Description">
      <p>{$publication.description || ""}</p>
    </div>
    
    </Card>
    <Card><h2>Table of Contents</h2></Card>
  </div>
  <div class="RightBox">
    <Card><h2>Stacks</h2>
    
    <ItemStacks item={$publication} />
    </Card><Card><h2>Notes</h2></Card>
  </div>
  
  <pre><code>{JSON.stringify($publication, null, 2)}</code></pre> 
{/if}
</div>