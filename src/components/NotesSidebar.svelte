<script>
  // import { flip } from 'svelte/animate';
  import {send, receive} from '../routes/_crossfade.js';
  import { fly } from 'svelte/transition';
  import { stores } from "@sapper/app";
  import NotesSearch from './NotesSearch.svelte'
  import Input from './workspace/Input.svelte'
  import AddCollections from './workspace/AddCollections.svelte'
  import {collections} from '../stores'
  import {getWorkspaceAsLabel} from './getWorkspaceAsLabel.js'
  const { page, session } = stores();
  export let params
  let tags
  let workspace
  $: if (params && $collections) {
    if (params.publicationId) {
      workspace = null
    } else if (params.workspace) {
      workspace = params.workspace
    } else if (params.segment === 'library') {
      workspace = 'all'
    } else {
      workspace = null
    }
    // Need to figure out a better way to filter collections by workspace
    if (workspace !== 'all') {
      tags = $collections.filter(tag => tag.name.split('/')[0] === workspace)
    } else {
      tags = $collections
    }
  }
  const spaces = ['Research', 'Public_Scholarships', 'Teaching', 'Personal']
  function getWorkspace (name) {
    const space = name.split('/')[0].replace(' ', '_')
    if (spaces.includes(space)) {
      return space.toLowerCase()
    } else {
      return ''
    }
  }
  function getName (name) {
    const space = name.split('/')[0].replace(' ', '_')
    if (spaces.includes(space)) {
      return name.replace(space + '/', '')
    } else {
      return name
    }
  }
</script>

<style>
.Sidebar {
  padding: var(--base) 0;
  border-radius: 0px 30px 30px 0px;
  height: calc(100vh - 51px);
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
ul {
  padding: 0;
}
li {
  list-style: none;
  font-size: 0.8rem;
  padding-right: calc(var(--base) * .5);
}
.linkText {
  color: white;
}
h2 {
  font-size: 0.9rem;
  padding-left: var(--base);
  font-weight: 600;
}
ul.tabs {
  padding: 0;
  margin-top: 10px;
}
ul.tabs li {
  padding-right: 0;
  width: calc(100% / 5);
  position: relative;
}
.tabs {
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  padding-right: 13px;
  height: 41px;
}
.tabs a {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;     
}
.tabs a:focus {
  outline: none;
}
.tabs li a:before {
  border-radius: .3rem;
  width: calc(var(--base) * 1.2);
  height: calc(var(--base) * 1.2);
  /*box-shadow: 1.5px 1.5px 4px rgba(147, 99, 210, 0.4);*/
  display: block;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  color: #fff;
  font-weight: 500;
  text-align: center;
  line-height: 26px;
  transition: all .25s ease-out;
}
ul.tabs li:hover a:not(.selected):before {
  transform: translate(-50%, calc( -50% - 2px));
  box-shadow: 3px 3px 7px rgba(147, 99, 210, .2);
}
.tabs .borders {
  display: none;
}
.tabs .selected .borders {
  position: absolute;
  top: 9px;
  z-index: -1;
  left: 0;
  display: block;
  width: 100%;
  border-radius: 20px;
  height: 90px;
  margin: 0;
}
.tabs a.all-tab .borders,
.all-tab .borders::before,
.all-tab.selected .borders div { 
  background: var(--all-workspace); 
}
.tabs a.research-tab .borders,
.research-tab .borders::before,
.research-tab.selected .borders div { 
  background: var(--research-workspace); 
}
.tabs a.teaching-tab .borders,
.teaching-tab .borders::before,
.teaching-tab.selected .borders div { 
  background: var(--teaching-workspace); 
}
.tabs a.personal-tab .borders,
.personal-tab .borders::before,
.personal-tab.selected .borders div { 
  background: var(--personal-workspace); 
}
.tabs a.public-tab .borders,
.public-tab .borders::before,
.public-tab.selected .borders div { 
  background: var(--public-workspace); 
}
.tabs .selected .borders::before,
.tabs .selected .borders div {
  content: "";
  width: 10px;
  height: 10px;
  left: -9px;
  top: 24px;
  position: absolute;
}
.tabs .selected .borders::after,
.selected .borders div::after {
  content: "";
  width: 20px;
  height: 20px;
  background: #F5F8FA;
  border-radius: 50%;
  position: absolute;
}
.tabs .selected .borders::after {
  left: -20px;
  top: 12px;
}
.tabs .selected .borders div {
  left: initial;
  right: -9px;
}
.selected .borders div::after {
  right: -11px;
  top: -12px;
}


.tabs .selected:before {
  background-color: transparent;
  box-shadow: none;
  transform: translate(-50%, calc(-50% + 5px));
}
.all-tab.selected {
  color: var(--all-workspace);
}
.all-tab:before {
  content: 'W';
  background-color: var(--all-workspace);
  box-shadow: 1.5px 1.5px 4px rgba(95, 83, 83, 0.5);
}
.research-tab.selected {
  color: var(--research-workspace);
}
.research-tab:before {
  content: 'R';
  background-color: var(--research-workspace-pale);
  box-shadow: 1.5px 1.5px 4px rgba(238, 82, 83, 0.5);
}
.teaching-tab.selected {
  color: var(--teaching-workspace);
}
.teaching-tab:before {
  content: 'T';
  background-color: var(--teaching-workspace-pale);
  box-shadow: 1.5px 1.5px 4px rgba(95, 84, 183, 0.5);
}
.public-tab.selected {
  color: var(--public-workspace);
}
.public-tab:before {
  content: 'PS';
  background-color: var(--public-workspace-pale);
  box-shadow: 1.5px 1.5px 4px rgba(111, 176, 201, .5);
}
.personal-tab.selected {
  color: var(--personal-workspace);
}
.personal-tab:before {
  content: 'P';
  background-color: var(--personal-workspace-pale);
  box-shadow: 1.5px 1.5px 4px rgba(134, 209, 209, .5);
}
.workspaces {
  position: sticky;
  top: 0;
  max-height: 100vh;
}
@media (max-width: 720px) {
  .workspaces {
    display: none;
  }
}
.SidebarBody {
  padding: var(--base);
  display: grid;
  row-gap: var(--base);
}
</style>

{#if workspace}
<div class="workspaces" transition:fly|local={{x: -250}}>
<ul class="tabs">
  <li>
      <a href="/library/all/all" class="all-tab" class:selected={workspace === 'all'}>
          {#if workspace === 'all'}
            <div class="borders" out:send|local="{{key: 'tabs-marker'}}" in:receive|local="{{key: 'tabs-marker'}}"><div></div></div>  
          {/if}
          <span class="visually-hidden">All</span> 
      </a>
  </li>
  <li>
      <a href="/library/Research/all" class="research-tab" class:selected={workspace === 'Research'}>
          {#if workspace === 'Research'}
            <div class="borders" out:send|local="{{key: 'tabs-marker'}}" in:receive|local="{{key: 'tabs-marker'}}"><div></div></div>  
          {/if}
          <span class="visually-hidden">Research</span>
      </a>
  </li>
  <li>
      <a href="/library/Teaching/all" class="teaching-tab" class:selected={workspace === 'Teaching'}>
          {#if workspace === 'Teaching'}
            <div class="borders" out:send|local="{{key: 'tabs-marker'}}" in:receive|local="{{key: 'tabs-marker'}}"><div></div></div>  
          {/if}<span class="visually-hidden">Teaching</span>
      </a>
  </li>
  <li>
      <a href="/library/Public_Scholarships/all" class="public-tab" class:selected={workspace === 'Public_Scholarships'}>
          {#if workspace === 'Public_Scholarships'}
            <div class="borders" out:send|local="{{key: 'tabs-marker'}}" in:receive|local="{{key: 'tabs-marker'}}"><div></div></div>  
          {/if}
          <span class="visually-hidden">Public scholarships</span>
      </a>
  </li>
  <li>
      <a href="/library/Personal/all" class="personal-tab" class:selected={workspace === 'Personal'}>
          {#if workspace === 'Personal'}
            <div class="borders" out:send|local="{{key: 'tabs-marker'}}" in:receive|local="{{key: 'tabs-marker'}}"></div>  
          {/if}
          <span class="visually-hidden">Personal</span>
      </a>
  </li>
</ul>
<div class="Sidebar {workspace.split('_')[0].toLowerCase()}">
<h2>{#if workspace === 'all'}
  All workspaces
  {:else if workspace === "Research"}
    Research
  {:else if workspace === "Public_Scholarships"}
    Public scholarship
  {:else if workspace === "Teaching"}
    Teaching
  {:else if workspace === "Personal"}
    Personal
{:else}
  {workspace}
{/if}</h2>

  <div class="SidebarBody">
  <NotesSearch />
  <Input placeholder="#stack" dark={true} fullWidth={true}  name="newURL" type="text">Stack</Input>
  <Input placeholder="Source title" dark={true} fullWidth={true} name="newURL" type="text">Source</Input>
  </div>

</div>
</div>
{/if}
