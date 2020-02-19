<script>
  import Button from '../Button.svelte'
  import WhiteButton from './WhiteButton.svelte'
  import {send, receive} from '../../routes/_crossfade.js';
  import AddWorkspace from './AddWorkspace.svelte'
  import Input from './Input.svelte'
  import FileInput from './FileInput.svelte'
  import TypeSelect from './TypeSelect.svelte'
  import Closer from '../Closer.svelte';
  import AddCollections from './AddCollections.svelte'
  import { afterUpdate, tick } from 'svelte';
  import {refreshDate, refreshCollections, collections, addingWorkspace, addedCollections, addedWorkspaces} from '../../stores';
  import {getToken} from '../../getToken'
  export let workspace
  let open = false
  let input
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
  afterUpdate(() => {
    if (open) {
      input.focus();
    }
  })
  async function submit (event) {
    event.preventDefault();
    close();
    const { target } = event;
    const newInput = window.document.getElementById('new-input').value
    if (newInput[0] === "#") {
      const value = workspace === 'all' ? newInput.slice(1) : `${workspace}/${newInput.slice(1)}`
      try {
        await fetch('/api/create-collection', {
          method: "POST",
          credentials: "include",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "csrf-token": getToken()
            },
          body: JSON.stringify({
            type: 'stack',
            name: value
          })
        })
        $refreshCollections = Date.now()
      } catch (err) {
        console.error(err)
      }
    } else {
      try {
        const body = Object.fromEntries(new URLSearchParams(new FormData(target)).entries())
        body.addedCollections = $addedCollections
        body.addedWorkspaces = $addedWorkspaces
        await fetch(target.action, {
          method: "POST",
          credentials: "include",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "csrf-token": getToken()
            },
          body: JSON.stringify(body)
        })
        $refreshDate = Date.now()
      } catch (err) {
        console.error(err)
      }
    }
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
  .NewBox .MoreItems {
    grid-column: 1 / -1;
    padding: var(--base);
    grid-gap: var(--base);
    border-top: 1px solid white;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  /* .Wide {
    grid-column: 1 / -1;
  } */
  .NewBox input {
    flex: 1 1 100%;
    font-family: var(--sans-fonts);
    font-size: 220%;
    border: none;
    font-weight: 300;
    background-color: transparent;
    color: white;
  }
  .NewBox input:focus {
    outline: none;
  }
  .NewBox input::placeholder {
    color: white;
  }
  .NewBox:focus-within {
    box-shadow: 0 0 0 3px white;
  }
  .new-button {
    margin: 0 auto 0 0;
  }
  .Expander{
    font-family: var(--sans-fonts);
    font-size: 0.9rem;
    flex: 0 1 auto;
    line-height: 1;

    display: inline-block;

    padding: var(--base);

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    font-weight: 500;
    color: white;
    border-radius: 15px;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    /* transition: box-shadow 0.15s ease-in-out; */
    background-color: transparent;
    text-decoration: none !important;
    transition: transform 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: none;
  }

  .Expander:hover svg{
    color: white !important;
    fill: rgba(255, 255, 255, 0.4);
    box-shadow: none;
    text-decoration: none;
  }

  .Expander:active,
  .Expander:link:active {
    background-color: var(--active);
  }
  .Expander:focus {
    outline: none;
    box-shadow: 0 0 0 3px #68d6d499;
  }
  .Expander.expanded {
    transform: rotate(180deg);
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

{#if open}
  <div class="NewBox" out:send="{{key: 'new-box'}}" in:receive="{{key: 'new-box'}}">
  <form id="newform" class="newForm" action="/api/create-publication" on:submit={submit}>
<label class="visually-hidden" id="new-label" for="new-input">New item:</label>
<Closer click={close} dark={true} />
<input type="hidden" name="type" value="Publication">
<input type="title" required name="name" id="new-input" class="title-field" value="" placeholder="Publication Title" bind:this={input}  autocomplete="off">

  <WhiteButton>Create</WhiteButton>
  <button type="button" class="Expander" class:expanded on:click={() => {
    expanded = !expanded
  }}>
  <svg width="36" height="36" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="-1" width="37" height="37" rx="14" transform="matrix(1 0 0 -1 0 37)" stroke="currentColor" stroke-width="2"/>
<rect x="12" y="17.4141" width="2" height="10" rx="1" transform="rotate(-45 12 17.4141)" fill="currentColor"/>
<rect x="24.7285" y="16" width="2" height="10" rx="1" transform="rotate(45 24.7285 16)" fill="currentColor"/>
</svg>
</button>

{#if expanded}
   <div class="MoreItems">
    <div><Input placeholder="https://www.example.com/path/to/item" dark={true} name="newURL" type="url">Add url:</Input></div>
    <div><FileInput dark={true} name="newFile" type="file">Add file:</FileInput></div>
    <div><TypeSelect dark={true}>Select type:</TypeSelect></div>
    <div><AddWorkspace>Add workspace:</AddWorkspace></div>
    <div><Input placeholder="First Author, Second Author..." dark={true} name="author">Add authors:</Input></div>
    <AddCollections dark={true} />
   </div>
{/if}
</form>
</div>
<span></span>
{:else}
  <span class="new-button" out:send="{{key: 'new-box'}}" in:receive="{{key: 'new-box'}}"
    bind:this={newToggle}><Button click={click}><span class="NewButtonPlus">+</span><span class="NewButtonLabel">
      New
    </span></Button></span>
{/if}