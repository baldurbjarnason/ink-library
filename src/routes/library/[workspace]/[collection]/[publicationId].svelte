<script>
  import {publication} from '../../../../stores'
	import { scale, fly } from 'svelte/transition';
	import { elasticInOut } from 'svelte/easing';

  let cover = {}
  $: if ($publication.resources) {
    cover = $publication.resources.find(resource => resource.rel.indexOf('cover') !== -1)
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
<!-- What we need here is a grid with a top bar followed by a three column central view (middle being the main). Top bar has a tab switcher between workspaces and a return to workspace link. Ignore related to begin with. -->
<style>
  /* your styles go here */
  .Publication {
    --gap: calc(var(--base)*2);
    display: grid;
    grid-template-columns: minmax(0,.4fr) 1fr .6fr;
    grid-row-gap: var(--base);
    grid-column-gap: var(--gap);
  }
  @media (max-width: 1100px) {
    .Publication {
      --gap: var(--base);
    }
  }
  .Header {
    grid-column: 1 / -1;
  }
  .HeaderContent {
    background-color: var(--workspace-color);
    color: white;
    padding: var(--base) var(--gap);
    border-radius: 0 0 15px 0 ;
  }
  .Card {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: var(--base) var(--gap);
    box-shadow: 5px 5px 50px rgba(0, 0, 0, 0.05);
    border-radius: 15px;
    margin: var(--base) 0;
  }
  h2 {
    font-size: 0.85rem;
    font-weight: 600;
    margin: 0;
  }
  .Image {
    max-width: 100%;
    height: auto;
    box-shadow: 3px 3px 10px rgba(192, 192, 192, 0.3);
    border-radius: 15px;
    margin: var(--base) 0;
  }
</style>

<div class="Publication">
  {#if $publication.type !== 'loading'}
  <div class="Header" transition:fly="{{duration: 250, y: -250 }}">
    <div class="HeaderContent"><h1>{$publication.name}</h1></div>
  </div>

  <div class="LeftBox">
    <div class="Card" transition:scale="{{delay: 250, duration: 350, easing: elasticInOut }}">
      <h2>Information</h2>
      <img src="{cover.href}" alt="Cover for {$publication.name}" class="Image">
    </div>
    <div class="Card" transition:scale="{{delay: 250, duration: 350, easing: elasticInOut }}"><h2>Keywords</h2></div>
  </div>

  <div class="CenterBox">
    <div class="Card" transition:scale="{{delay: 500, duration: 350, easing: elasticInOut }}"><h2>Description</h2></div><div class="Card" transition:scale="{{delay: 500, duration: 350, easing: elasticInOut }}"><h2>Table of Contents</h2></div>
  </div>
  <div class="RightBox">
    <div class="Card" transition:scale="{{delay: 750, duration: 350, easing: elasticInOut }}"><h2>Stacks</h2></div><div class="Card" transition:scale="{{delay: 750, duration: 350, easing: elasticInOut }}"><h2>Notes</h2></div>
  </div>
  
  <pre><code>{JSON.stringify($publication, null, 2)}</code></pre> 
  {/if}
</div>