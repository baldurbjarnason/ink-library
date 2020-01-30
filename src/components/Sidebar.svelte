<script>
  // import { flip } from 'svelte/animate';
  import {send, receive} from '../routes/_crossfade.js';
  import { fly } from 'svelte/transition';
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  import {collections} from '../stores'
  export let params
  let tags
  let workspace
  let queryText
  $: if ($page.query && Object.keys($page.query).length !== 0) {
    queryText = '?' + new URLSearchParams($page.query).toString()
  } else {
    queryText = ""
  }
  $: if (params && $collections) {
    if (params.workspace) {
      workspace = params.workspace
    } else if (params.segment === 'library') {
      workspace = 'all'
    } else {
      workspace = null
    }
    // Need to figure out a better way to filter collections by workspace
    if (workspace !== 'all') {
      tags = $collections.filter(tag => tag.json.workspace === workspace)
    } else {
      tags = $collections
    }
  }
</script>

<style>
.Sidebar {
  padding: var(--base) 0;
  border-radius: 0px 15px 0px 0px;
  height: calc(100vh - 41px);
  overflow-y: auto;
}
.Sidebar.all {
  background-color: var(--all-workspace);
  color: white;
}
.Sidebar.teaching {
  color: white;
  background-color: var(--teaching-workspace);
}
.Sidebar.personal {
  background-color: var(--personal-workspace);
  color: white;
}
.Sidebar.public {
  color: white;
  background-color: var(--public-workspace);
}
.Sidebar.research {
  background-color: var(--research-workspace);
  color: white;
}
.hash {
  font-size: 0.75rem;
  margin-right: calc(var(--base) * 0.5);
  color: white;
}
.Sidebar.all .hash.teaching {
  color: var(--teaching-workspace);
}
.Sidebar.all .hash.personal {
  color: var(--personal-workspace);
}
.Sidebar.all .hash.public {
  color: var(--public-workspace);
}
.Sidebar.all .hash.research {
  color: var(--research-workspace);
}
.all .selected {
  background-color: var(--all-workspace-selected);
}
ul {
  padding: 0;
}
li {
  list-style: none;
  font-size: 0.8rem;
  padding-right: calc(var(--base) * .5);
}
.Sidebar a:link, .Sidebar .empty {
  display: block;
  padding: calc(var(--base) * 0.25) var(--base);
  text-decoration: none;
  border-radius: 0px 50px 50px 0px;
}
.linkText {
  color: white;
}

li a:hover {
  background-color: white;
}
li a:hover .linkText {
  color: var(--link);
}
h2 {
  font-size: 0.9rem;
  padding-left: var(--base);
  font-weight: 600;
}
.tabs {
  display: flex;
  justify-content: space-around;

  padding: 0;
  margin: 0;
  padding-right: 13px;
  height: 41px;
}
.tabs a {
  display: block;
  padding: calc(var(--base) * 0.7);
  position: relative;
}
.tabs li a:before {
  content: ' ';
  border-radius: 100%;
  width: calc(var(--base) * 0.65);
  height: calc(var(--base) * 0.65);
  box-shadow: 1.5px 1.5px 4px rgba(147, 99, 210, 0.4);
  display: block;
  z-index: 1;
}
.tabs svg {
  display: none;
}
.tabs .selected svg {
    max-width: 175%;
  height: auto;
  position: absolute;
    top: -15px;
    z-index: -1;
    left: -13px;
  display: block;
}
.tabs a.selected:hover {
  background-color: transparent;
}
.tabs .selected:before {
  background-color: white;
  box-shadow: none;
}
.all-tab.selected {
  color: var(--all-workspace);
}
.all-tab:before {
  background-color: var(--all-workspace);
  box-shadow: 1.5px 1.5px 4px rgba(185, 185, 185, 0.4);
}
.research-tab.selected {
  color: var(--research-workspace);
}
.research-tab:before {
  background-color: var(--research-workspace);
  box-shadow: 1.5px 1.5px 4px #C32324;
}
.teaching-tab.selected {
  color: var(--teaching-workspace);
}
.teaching-tab:before {
  background-color: var(--teaching-workspace);
  box-shadow: 1.5px 1.5px 4px rgba(147, 99, 210, 0.4);
}
.public-tab.selected {
  color: var(--public-workspace);
}
.public-tab:before {
  background-color: var(--public-workspace);
  box-shadow: 1.5px 1.5px 4px rgba(49, 111, 183, 0.4);
}
.personal-tab.selected {
  color: var(--personal-workspace);
}
.personal-tab:before {
  background-color: var(--personal-workspace);
  box-shadow: 1.5px 1.5px 4px rgba(0, 165, 106, 0.4);
}
.workspaces {
  position: sticky;
  top: 0;
  max-height: 100vh;
}
</style>

{#if workspace}
<div class="workspaces" transition:fly|local={{x: -250}}>
<ul class="tabs">
  <li><a href="/library/all/all{queryText}" class="all-tab" class:selected={workspace === 'all'}>
  {#if workspace === 'all'}
    <svg  out:send="{{key: 'tabs-marker'}}" in:receive="{{key: 'tabs-marker'}}" width='66' height='57' viewBox='0 0 66 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='9' width='48' height='57' rx='24' fill='currentColor'/><path d='M66 38.0345C59.2 38.0345 57.1667 30.6782 57 27L54 43L66 38.0345Z' fill='currentColor'/><path d='M0 37.7241C6.8 37.7241 8.83333 29.908 9 26L12 43L0 37.7241Z' fill='currentColor'/></svg>
  {/if}
  <span class="visually-hidden">All</span> </a></li>
  <li><a href="/library/Research/all{queryText}" class="research-tab" class:selected={workspace === 'Research'}>
  
  {#if workspace === 'Research'}
    <svg  out:send="{{key: 'tabs-marker'}}" in:receive="{{key: 'tabs-marker'}}" width='66' height='57' viewBox='0 0 66 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='9' width='48' height='57' rx='24' fill='currentColor'/><path d='M66 38.0345C59.2 38.0345 57.1667 30.6782 57 27L54 43L66 38.0345Z' fill='currentColor'/><path d='M0 37.7241C6.8 37.7241 8.83333 29.908 9 26L12 43L0 37.7241Z' fill='currentColor'/></svg>
  {/if}
    <span class="visually-hidden">Research</span></a></li>
  <li><a href="/library/Teaching/all{queryText}" class="teaching-tab" class:selected={workspace === 'Teaching'}>
  
  {#if workspace === 'Teaching'}
    <svg  out:send="{{key: 'tabs-marker'}}" in:receive="{{key: 'tabs-marker'}}" width='66' height='57' viewBox='0 0 66 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='9' width='48' height='57' rx='24' fill='currentColor'/><path d='M66 38.0345C59.2 38.0345 57.1667 30.6782 57 27L54 43L66 38.0345Z' fill='currentColor'/><path d='M0 37.7241C6.8 37.7241 8.83333 29.908 9 26L12 43L0 37.7241Z' fill='currentColor'/></svg>
  {/if}<span class="visually-hidden">Teaching</span></a></li>
  <li><a href="/library/Public+Scholarship/all{queryText}" class="public-tab" class:selected={workspace === 'Public Scholarship'}>

  {#if workspace === 'Public Scholarship'}
    <svg  out:send="{{key: 'tabs-marker'}}" in:receive="{{key: 'tabs-marker'}}" width='66' height='57' viewBox='0 0 66 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='9' width='48' height='57' rx='24' fill='currentColor'/><path d='M66 38.0345C59.2 38.0345 57.1667 30.6782 57 27L54 43L66 38.0345Z' fill='currentColor'/><path d='M0 37.7241C6.8 37.7241 8.83333 29.908 9 26L12 43L0 37.7241Z' fill='currentColor'/></svg>
  {/if}
  <span class="visually-hidden">Public scholarships</span></a></li>
  <li><a href="/library/Personal/all{queryText}" class="personal-tab" class:selected={workspace === 'Personal'}>

  {#if workspace === 'Personal'}
    <svg  out:send="{{key: 'tabs-marker'}}" in:receive="{{key: 'tabs-marker'}}" width='66' height='57' viewBox='0 0 66 20' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='9' width='48' height='57' rx='24' fill='currentColor'/><path d='M66 38.0345C59.2 38.0345 57.1667 30.6782 57 27L54 43L66 38.0345Z' fill='currentColor'/><path d='M0 37.7241C6.8 37.7241 8.83333 29.908 9 26L12 43L0 37.7241Z' fill='currentColor'/></svg>
  {/if}
  <span class="visually-hidden">Personal</span></a></li>
</ul>
<div class="Sidebar {workspace.split(' ')[0].toLowerCase()}">
<h2>{#if workspace === 'all'}
  All workspaces
  {:else if workspace === "Research"}
    Research
  {:else if workspace === "Public Scholarship"}
    Public scholarship
  {:else if workspace === "Teaching"}
    Teaching
  {:else if workspace === "Personal"}
    Personal
{:else}
  {workspace}
{/if}</h2>
  <ul>
  {#each tags as tag}
    <li><a href="/library/{workspace}/{encodeURIComponent(tag.name)}{queryText}" class:selected={params.collection === tag.name}><span class="hash {tag.json.workspace.replace(' ', '_')}">#</span> <span class="linkText">
      {tag.name}
    </span></a></li>
    {:else}
      <li><span class="empty">No collections...</span></li>
  {/each}
  </ul>
</div>
</div>
{:else}
   <div></div>
{/if}