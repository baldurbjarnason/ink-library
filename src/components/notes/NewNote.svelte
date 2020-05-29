<script>
  import Button from '../widgets/Button.svelte'
  import Closer from '../widgets/Closer.svelte';
  import WhiteButton from '../workspace/WhiteButton.svelte'
  import {send, receive} from '../../routes/_crossfade.js';
  import { afterUpdate, tick } from 'svelte';
  import NoteEditor from '../widgets/NoteEditor.svelte'
  import {refreshNotes, refreshCollections, collections, addingWorkspace, addedCollections, addedWorkspaces, page, workspaces} from '../../stores';
  import {getToken} from '../../getToken'
  let open = false
  let newToggle
  let expanded = false
  function click () {
    open = !open;
  }
  async function close () {
    open = false
    await tick()
    newToggle.querySelector('button').focus()
  }

  let text
  async function submit (event) {
    event.preventDefault();
    close();
    let workspace
    if ($page.params.workspace && $page.params.workspace !== 'all') {
      workspace = $workspaces.find(space => space.name === $page.params.workspace).id
    }
    // Need to do the same for stack
    let collection
    if ($page.params.collection && $page.params.collection !== 'all') {
      collection = $collections.find(space => space.name === $page.params.collection).id
    }
    const note = {
      body: [{
        motivation: "commenting",
        content : text
      }],
      _workspace: workspace,
      _collection: collection
    }
    await window.fetch(`/api/notes`, {
      method: 'POST',
      credentials: "include",
      headers: {
        "csrf-token": getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note),
    })
    $refreshNotes = Date.now()
  }
</script>

<style>
  .NewBox {
    position: absolute;
    background-color: var(--workspace-color);
    color: white;
    top: calc(var(--base) * 0.5);
    left: 0;
    right: 0;
    min-height: calc(var(--base)*5.3);
    z-index: 2;
    border-radius: 15px;
  }
  .NewBox form {
    display: -webkit-box;
    display: grid;
    grid-template-columns: min-content 1fr min-content min-content;
    align-items: center;
    height: 100%;
    grid-template-rows: calc(var(--base)*5.3) auto;
  }
.Editor {
  display: block;
  background-color: rgba(255,255,255,0.9);
    grid-column: 1 / -1;
    color: #333;
    margin: 1rem;
    border-radius: 0.25rem;
}
  @media (max-width: 720px) {
    .new-button {
      position: fixed;
      right: var(--base);
      bottom: 70px;
    }
    .new-button :global(.Button) {
      box-shadow: 3px 1px 7px rgba(0, 0, 0, 0.2);
      padding: .65rem;
      border-radius: 100%;
      height: 42px;
      width: 42px;
    }
    .NewButtonLabel {
      display: none;
    }
    .NewButtonPlus {
      font-size: 2rem;
      line-height: 1rem;
    }
  }

@media (max-width: 720px) {
  .NewBox input {
    font-size: 100%;
  }
  .Expander {
    padding: 0.25rem;
  }
  .Expander svg {
    width: 29px;
    height: 29px;
  }
  .NewBox .MoreItems {
    max-height: 55vh;
    grid-template-columns: 1fr;
    overflow-y: auto;
    margin-bottom: 2rem;
  }
}
</style>

{#if open}<div class="NewBox" out:send="{{key: 'new-box'}}" in:receive="{{key: 'new-box'}}">
        <form id="newform" class="newForm" action="/api/create-publication" on:submit={submit}>
            <Closer click={close} dark={true} />
            
<span>&nbsp;</span>
            <WhiteButton>Create</WhiteButton>
<span>&nbsp;</span>
          <div class="Editor">
          <NoteEditor bind:richtext={text}/>
          </div>
        </form>
    </div>
    <span></span>
{:else}
    <span class="new-button" out:send="{{key: 'new-box'}}" in:receive="{{key: 'new-box'}}" bind:this={newToggle}>
        <Button click={click}>
            <span class="NewButtonPlus">+</span> 
            <span class="NewButtonLabel">New Note</span>
        </Button>
    </span>
{/if}