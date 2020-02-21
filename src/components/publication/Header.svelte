<script>
  import {publication, workspaces, page} from '../../stores'
	import { fly } from 'svelte/transition';
  import { elasticInOut } from 'svelte/easing';
  import Tab from './Tab.svelte';
  import NavButton from './NavButton.svelte';
  let workspace
  $: if ($page.params.workspace) {
    workspace = $page.params.workspace
  }
  let usedWorkspaces
  $: if ($publication.tags) {
    usedWorkspaces = $publication.tags.filter(item => item.type === 'workspace').map(item => item.name.replace(' ', '_'))
  }
  let next
  let previous
  $: if (workspace && usedWorkspaces) {
    if (workspace === "all") {
      next = usedWorkspaces[0]
      previous = null
    } else {
      next = usedWorkspaces[usedWorkspaces.indexOf(workspace) + 1]
      previous = usedWorkspaces[usedWorkspaces.indexOf(workspace) - 1]
    }
    if (!previous && workspace !== "all") {
      previous = "all"
    }
  }
  let url
  $: if ($publication && $publication.links) {
    const link = $publication.links.find(link => link.rel === 'alternate')
    if (link) {
      url = link.url
    }
  }
  function getPosition (publication) {
    if (publication.position && publication.position.description) {
      return publication.position.description
    } else {
      return ""
    }
  }
  function getReadDate (publication) {
    if (!publication.status) {
      return new Date($publication.updated).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' })
    } else {
      return new Date($publication.published).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' })
    }
  }
</script>

<style>
  .Header {
    grid-column: 1 / -1;
    --item-font-size: 0.8rem;
    --reader-font-size: 0.8rem;
  }
  .HeaderContent {
    background-color: var(--workspace-color);
    color: white;
    padding: calc(var(--base)*1.5) var(--base);
    border-radius: 0 0 15px 0 ;
    display: grid;
    grid-template-columns: 1fr calc(var(--base) * 7);
    grid-template-areas: ". ReaderLink"
    ". ReaderLink";
    grid-column-gap: var(--base);
    grid-template-rows: 1.5rem 1fr 1.5rem;
  }
  .HeaderContent.not-all {
    border-radius: 0 0 15px 15px;
  }
  .ReaderLink {
    grid-area: ReaderLink;
    display: flex;
    flex-direction: column;
    display: grid;
    grid-gap: calc(var(--base) * 0.5);
    color: white;
  }
  .Read {
    font-size:  var(--item-font-size);
  }
  .ReadStatus {
    font-weight: 400;
    margin-right: 0.75rem;
  }
  .ReadDate {
    font-weight: 700;
  }

  h1 {
    font-weight: bold;
    align-self: end;
    margin: 0;
  }
  .CurrentWorkspace {
    align-self: end;
    margin: 0;
    font-size:  var(--item-font-size);
  }
  .ReturnLink a {
    font-size:  var(--item-font-size);
    color: #f0f0f0;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  .Chevron {
    font-size: calc(var(--item-font-size) * 0.65);
    vertical-align: text-bottom;
    margin-right: 0.25rem;
  }


.tabs {
  display: flex;
  justify-content: space-around;

  padding: 0;
  margin: 0;
  padding-right: 13px;
  height: 41px;
  width: min-content;
}
.tabs li {
  list-style: none;
  font-size: 0.8rem;
  padding-right: calc(var(--base) * .5);
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
  position: relative;
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
.MobileRead {
  display: none;
}
@media (max-width: 720px) {
  .HeaderContent {
    grid-template-areas: none;
    grid-template-rows: 1.5rem 1fr;
    grid-template-columns: 1rem 1fr 1rem;
    padding: calc(var(--base)*1.5);
  }
  h1 {
    margin-top: 1rem;
    font-weight: 600;
    font-size: var(--base);
  }
  .ReaderLink {
    display: none;
  }
  .MobileRead {
    display: flex;
    align-items: center;
    text-align: right;
    justify-content: flex-end;
  }
  .MobileRead a {
    color: white !important;
    text-decoration: none;
    padding: 0.25rem;
    border-radius: 8px;
    text-transform: uppercase;
    font-size: 0.65rem;
  }
  .MobileRead a:hover {
    color: var(--workspace-color) !important;
    background-color: white;
  }
  .ReturnLink {
    display: flex;
    align-items: center;
    grid-column: 1 / 3;
  }
  .tabs {
    margin: auto;
    padding: 0;
    height: auto;
  }
  .tabs li a:before {
    background-color: white;
    box-shadow: none;
    width: calc(var(--base) * 0.45);
    height: calc(var(--base) * 0.45);
  }
  .tabs li a :global(.Tab) {
    display: none;
  }
  .tabs a:not(.selected):before {
    opacity: 0.5;
  }
  .tabs li {
    padding-right: 0;
  }
  .tabs a {
    padding: calc(var(--base) * 0.35);
  }
}
</style>


{#if $publication.type !== "loading"}
<div class="Header" transition:fly|local="{{duration: 250, y: -250, easing: elasticInOut }}">
  <div class="HeaderContent {workspace !== 'all' && 'not-all'}">
  <div class="ReturnLink">
    <a href="/library/{$page.params.workspace}/{$page.params.collection}" class="Return"><span aria-hidden="true" class="Chevron">&lt;</span> {$page.params.workspace === 'all' ? 'All workspaces' : $page.params.workspace.replace('_', ' ')}</a>
  </div>
  {#if url}
    <div class="MobileRead"><a href="{url}">Read</a></div>
  {/if}

    <div class="MobileRead">
  {#if previous}
      <a href="/library/{previous}/all/{$page.params.publicationId}">
        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)">
    <rect x="6.36395" y="8.48529" width="9" height="2" rx="0.999999" transform="rotate(-135 6.36395 8.48529)" fill="currentColor"/>
    <rect x="0.292877" y="12.364" width="9" height="2" rx="0.999999" transform="rotate(-45 0.292877 12.364)" fill="currentColor"/>
    </svg>
      </a>
  {/if}
    </div>
  <h1>{$publication.name}</h1>
  <div class="ReaderLink">
  {#if url}
    <div class="Read">
      <span class="ReadStatus">{$publication.status || "New"}</span>
      <span class="ReadDate">{getReadDate($publication)}</span>
    </div>
    <span class="Read">{getPosition($publication)}</span>
      <NavButton href="{url}">Read</NavButton>
      <NavButton href="{url}" dark={true}>Restart Reading</NavButton>
  {/if}
  </div>
  {#if next}
    <div class="MobileRead">
      <a href="/library/{next}/all/{$page.params.publicationId}">
        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6.36395" y="8.48529" width="9" height="2" rx="0.999999" transform="rotate(-135 6.36395 8.48529)" fill="currentColor"/>
    <rect x="0.292877" y="12.364" width="9" height="2" rx="0.999999" transform="rotate(-45 0.292877 12.364)" fill="currentColor"/>
    </svg>
      </a>
    </div>
  {/if}
    
  </div>
<ul class="tabs">
  <li><a href="/library/all/all/{$page.params.publicationId}" class="all-tab" class:selected={workspace === 'all'}>
  {#if workspace === 'all'}
    <Tab {workspace} />
  {/if}
  <span class="visually-hidden">All</span> </a></li>
  {#each usedWorkspaces as space}
    <li><a href="/library/{space}/all/{$page.params.publicationId}" class="{space.split('_')[0].toLowerCase()}-tab" class:selected={workspace === space}>
    {#if workspace === space}
      <Tab {workspace} />
    {/if}
      <span class="visually-hidden">{space.replace('_', ' ')}</span></a></li>
  {/each}
</ul>
</div>
{/if}