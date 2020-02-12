<script>
  import {publication, workspaces, page} from '../../stores'
	import { fly } from 'svelte/transition';
  import { elasticInOut } from 'svelte/easing';
  import ItemStacks from '../workspace/ItemStacks.svelte';
  import NavButton from './NavButton.svelte';
  import Card from './Card.svelte';
  import Tab from './Tab.svelte';
  let workspace
  $: if ($page.params.workspace) {
    workspace = $page.params.workspace
  }
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
    ". ReaderLink"
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
  h2 {
    font-size: 1rem;
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
  .Description {
    font-size:  var(--item-font-size);
  }
  .Metadata {
    font-size:  var(--item-font-size);
    margin: 0;
  }
  .Metadata dt {
    color: #999;
    font-weight: bold;
    margin: var(--base) 0 0;
  }
  .Metadata dd {
    font-weight: bold;
    margin: 0;
    padding: 0;
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

<div class="Publication">
{#if $publication.type !== "loading"}
  <div class="Header" transition:fly|local="{{duration: 250, y: -250, easing: elasticInOut }}">
    <div class="HeaderContent {workspace !== 'all' && 'not-all'}">
    <div class="ReturnLink">
      <a href="/library/{$page.params.workspace}/{$page.params.collection}" class="Return"><span aria-hidden="true" class="Chevron">&lt;</span> {$page.params.workspace === 'all' ? 'All workspaces' : $page.params.workspace.replace('_', ' ')}</a>
    </div>
    <h1>{$publication.name}</h1>
    <div class="CurrentWorkspace">{$page.params.workspace === 'all' ? 'All workspaces' : $page.params.workspace.replace('_', ' ')}</div>
    <div class="ReaderLink">
    <span class="Read">Unread</span>
    <span class="Read">At beginning</span>
      <NavButton href="/">Read</NavButton>
      <NavButton href="/" dark={true}>Restart Reading</NavButton>
    </div>
    </div>

<ul class="tabs">
  <li><a href="/library/all/all/{$page.params.publicationId}" class="all-tab" class:selected={workspace === 'all'}>
  {#if workspace === 'all'}
    <Tab {workspace} />
  {/if}
  <span class="visually-hidden">All</span> </a></li>
  <li><a href="/library/Research/all/{$page.params.publicationId}" class="research-tab" class:selected={workspace === 'Research'}>
  
  {#if workspace === 'Research'}
    <Tab {workspace} />
  {/if}
    <span class="visually-hidden">Research</span></a></li>
  <li><a href="/library/Teaching/all/{$page.params.publicationId}" class="teaching-tab" class:selected={workspace === 'Teaching'}>
  
  {#if workspace === 'Teaching'}
    <Tab {workspace} />
  {/if}<span class="visually-hidden">Teaching</span></a></li>
  <li><a href="/library/Public_Scholarship/all/{$page.params.publicationId}" class="public-tab" class:selected={workspace === 'Public_Scholarship'}>

  {#if workspace === 'Public_Scholarship'}
    <Tab {workspace} />
  {/if}
  <span class="visually-hidden">Public scholarships</span></a></li>
  <li><a href="/library/Personal/all/{$page.params.publicationId}" class="personal-tab" class:selected={workspace === 'Personal'}>

  {#if workspace === 'Personal'}
    <Tab {workspace} />
  {/if}
  <span class="visually-hidden">Personal</span></a></li>
</ul>
</div>




  <div class="LeftBox">
    <Card>
      <h2>Information</h2>
      <img src="{cover.href}" alt="Cover for {$publication.name}" class="Image">
      <dl class="Metadata">
        <dt>Pages</dt>
        <dd></dd>
        <dt>Language</dt>
        <dd>English</dd>
        <dt>Editor</dt>
        <dd>Random Editor Person</dd>
        <dt>Type</dt>
        <dd>{$publication.type.split(/(?=[A-Z])/).join(' ')}</dd>
      </dl>
    </Card>
    <Card><h2>Keywords</h2></Card>
  </div>

  <div class="CenterBox">
    <Card><h2>Description</h2>
    
    <div class="Description">
      <p>We have filler text here.</p>
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