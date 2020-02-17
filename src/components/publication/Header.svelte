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
  }
  .HeaderContent {
    background-color: var(--workspace-color);
    color: white;
    padding: calc(var(--base)*1.5) var(--gap);
    border-radius: 0 0 15px 0 ;
    display: grid;
    grid-template-columns: 1fr calc(var(--base) * 7);
    grid-template-areas: ". ReaderLink"
    ". ReaderLink";
    grid-column-gap: var(--gap);
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
</style>


<div class="Header" transition:fly|local="{{duration: 250, y: -250, easing: elasticInOut }}">
  <div class="HeaderContent {workspace !== 'all' && 'not-all'}">
  <div class="ReturnLink">
    <a href="/library/{$page.params.workspace}/{$page.params.collection}" class="Return"><span aria-hidden="true" class="Chevron">&lt;</span> {$page.params.workspace === 'all' ? 'All workspaces' : $page.params.workspace.replace('_', ' ')}</a>
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
