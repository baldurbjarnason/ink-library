<script>
  import {onMount, afterUpdate} from 'svelte';
  import {publication, workspaces, page} from '../../stores'
  import {send, receive} from './crossfade.js';
	import { fly } from 'svelte/transition';
  import { elasticInOut } from 'svelte/easing';
  import ItemStacks from '../workspace/ItemStacks.svelte';
  import NavButton from './NavButton.svelte';
  import Card from './Card.svelte';
  import Keyword from './Keyword.svelte';
  import Tab from './Tab.svelte';
  import Header from './Header.svelte';
  import Metadata from './Metadata.svelte';
  import Cover from './Cover.svelte';
  import Note from './Note.svelte';
  import ToC from './ToC.svelte';
  let hash = "#Description"
  let scroll = false
  onMount(() => {
    hash = window.location.hash || "#Description"
    console.log(hash)
  });
  function hashchange () {
    hash = window.location.hash
    scroll = true
  }
  afterUpdate(() => {
    const element = document.querySelector(hash)
    if (element && scroll) {
      element.scrollIntoView({behavior: "smooth"})
    }
  });
</script>
<!-- What we need here is a grid with a top bar followed by a three column central view (middle being the main). Top bar has a tab switcher between workspaces and a return to workspace link. Ignore related to begin with. -->
<style>
  /* your styles go here */
  .Publication {
    --gap: var(--base);
    --item-font-size: 0.8rem;
    --reader-font-size: 0.8rem;
    padding-top: 1.25rem;
  }
  .Publication .Wrapper {
    display: grid;
    grid-template-columns: minmax(0,.5fr) 1fr .6fr;
    grid-row-gap: var(--base);
    grid-column-gap: var(--gap);
    grid-template-areas: "About Description Stacks"
                         "About ToC Notes"
                         "Keywords ToC Notes"
                         ". ToC Notes"
                         ". ToC Notes";
  }
  :global(#AboutCard) {
    grid-area: About;
  }
  :global(#DescriptionCard) {
    grid-area: Description;
  }
  :global(#StacksCard) {
    grid-area: Stacks;
  }
  :global(#ToCCard) {
    grid-area: ToC;
    height: min-content;
  }
  :global(#KeywordsCard) {
    grid-area: Keywords;
  }
  :global(#NotesCard) {
    grid-area: Notes;
    height: min-content;
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
  .MobileTabs {
    display: none;
  }
  :global(#DescriptionCard .Cover) {
    display: none;
  }
  @media (max-width: 720px) {
    :global(#AboutCard .Cover) {
      display: none;
    }
    :global(#DescriptionCard .Cover) {
      display: block;
    }
    .Publication .Wrapper {
      grid-template-columns: 1fr;
      grid-row-gap: 0;
      display: flex;
      flex-direction: column;
      padding-bottom: 4rem;
    }
    .Publication {
      background-color: white;
      margin-top: 1rem;
      border-radius: 40px 40px 0px 0px;
      padding-top: 1.25rem;
      min-height: 100vh;
    }
    .MobileTabs {
      display: flex;
      list-style: none;
      justify-content: space-between;
      padding: 0.75rem 0 0.5rem 1.25rem;
      margin-right: 1.25rem;
      margin-top: 1.1rem;
      position: sticky;
      top: 0;
      background-color: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(4px);
      z-index: 2;
    }
    .MobileTabs a {
      color: var(--action) !important;
      font-weight: 500;
      text-decoration: none;
      display: block;
      position: relative;
    }
    .selected {
      transform: translateY(-0.25rem);
    }
    .Border {
      height: 4px; 
      background-color: var(--action);
      width: 1.5rem;
      position: absolute;
      bottom: -0.65rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .Publication .Wrapper :global(.Card) {
      display: none;
    }
    .Publication.DescriptionTabSelected :global(.AboutTab), .Publication.ToCTabSelected :global(.ToCTab), .Publication.StacksTabSelected :global(.StacksTab), .Publication.NotesTabSelected :global(.NotesTab)   {
      display: flex;
    }
  }
</style>
<svelte:window on:hashchange={hashchange}/>
<Header />
<div class="Publication {hash.replace('#', '')}TabSelected">
{#if $publication.type !== "loading"}
<ul class="MobileTabs">
  <li><a href="{$page.path}#Description" class:selected={hash === "#Description"}>About
  {#if hash === "#Description"}
     <span class="Border" out:send="{{key: 'mobile-tabs-marker'}}" in:receive="{{key: 'mobile-tabs-marker'}}"></span>
  {/if}
  </a></li>
  <li><a href="{$page.path}#ToC" class:selected={hash === "#ToC"}>Contents
  {#if hash === "#ToC"}
     <span class="Border" out:send="{{key: 'mobile-tabs-marker'}}" in:receive="{{key: 'mobile-tabs-marker'}}"></span>
  {/if}</a></li>
  <li><a href="{$page.path}#Stacks" class:selected={hash === "#Stacks"}>Stacks
  {#if hash === "#Stacks"}
     <span class="Border" out:send="{{key: 'mobile-tabs-marker'}}" in:receive="{{key: 'mobile-tabs-marker'}}"></span>
  {/if}</a></li>
  <li><a href="{$page.path}#Notes" class:selected={hash === "#Notes"}>Notes
  {#if hash === "#Notes"}
     <span class="Border" out:send="{{key: 'mobile-tabs-marker'}}" in:receive="{{key: 'mobile-tabs-marker'}}"></span>
  {/if}</a></li>
</ul>
<div class="Wrapper">
 
  
  <Card id="Description" tab="About">
    <Cover />
    <h2>Description</h2>
    <div class="Description">
      <p>{$publication.description || ""}</p>
    </div>
  </Card>

  <Card id="About" tab="About">
    <Cover />
    <Metadata />
  </Card>

  <Card id="Keywords" tab="About">
    <h2>Keywords</h2>
    <div class="Keywords">
    {#each $publication.keywords as keyword}
        <Keyword {keyword} />
    {:else}
      No Keywords
    {/each}
    </div>
  </Card>
  

  <Card id="ToC" tab="ToC">
    <ToC />
  </Card>

  <Card id="Stacks" tab="Stacks">
    <h2>Stacks</h2>
    <ItemStacks item={$publication} />
  </Card>

  <Card id="Notes" tab="Notes">
    <h2>Notes</h2>
    {#each $publication.replies as note}
      <Note {note} />
    {/each}
  </Card>

</div>
{/if}
</div>