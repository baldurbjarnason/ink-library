<script>
  import {onMount} from 'svelte';
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
  import Note from './Note.svelte';
  import ToC from './ToC.svelte';
  let hash
  onMount(() => {
    hash = window.location.hash || "#about"
    console.log(hash)
  });
  function hashchange () {
    hash = window.location.hash
    console.log(hash)
  }
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
  .MobileTabs {
    display: none;
  }
  @media (max-width: 720px) {
    .Publication {
      grid-template-columns: 1fr;
      grid-row-gap: 0;
      background-color: white;
      margin-top: 1rem;
      border-radius: 40px 40px 0px 0px;
    }
    .MobileTabs {
      display: flex;
      list-style: none;
      justify-content: space-between;
      padding: 1.5rem 1.25rem 0;
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
  }
</style>
<svelte:window on:hashchange={hashchange}/>
<Header />
<div class="Publication">
{#if $publication.type !== "loading"}
<ul class="MobileTabs">
  <li><a href="{$page.path}#about" class:selected={hash === "#about"}>About
  {#if hash === "#about"}
     <span class="Border" out:send="{{key: 'mobile-tabs-marker'}}" in:receive="{{key: 'mobile-tabs-marker'}}"></span>
  {/if}
  </a></li>
  <li><a href="{$page.path}#toc" class:selected={hash === "#toc"}>Contents
  {#if hash === "#toc"}
     <span class="Border" out:send="{{key: 'mobile-tabs-marker'}}" in:receive="{{key: 'mobile-tabs-marker'}}"></span>
  {/if}</a></li>
  <li><a href="{$page.path}#stacks" class:selected={hash === "#stacks"}>Stacks
  {#if hash === "#stacks"}
     <span class="Border" out:send="{{key: 'mobile-tabs-marker'}}" in:receive="{{key: 'mobile-tabs-marker'}}"></span>
  {/if}</a></li>
  <li><a href="{$page.path}#notes" class:selected={hash === "#notes"}>Notes
  {#if hash === "#notes"}
     <span class="Border" out:send="{{key: 'mobile-tabs-marker'}}" in:receive="{{key: 'mobile-tabs-marker'}}"></span>
  {/if}</a></li>
</ul>

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
    <Card>
      <ToC />
    </Card>
  </div>
  <div class="RightBox">
    <Card><h2>Stacks</h2>
    
    <ItemStacks item={$publication} />
    </Card><Card><h2>Notes</h2>
    {#each $publication.replies as note}
      <Note {note} />
    {/each}
    </Card>
  </div>
{/if}
</div>