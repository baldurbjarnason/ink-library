<script>
  import Button from '../widgets/Button.svelte'
  import {send, receive} from '../../routes/_crossfade.js';
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
        $addedWorkspaces = []
        $addedCollections = []
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
    grid-gap: var(--base) calc(var(--base) * 3);
    border-top: 1px solid white;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .MoreItems p {
    float: left;
    width: 10%;
    text-align: center;
    line-height: 38px;
    margin: calc(var(--base)*0.25) 0;
    font-size: .8rem;
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
    color: rgba(255, 255, 255, .5);
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
  .typeDiv {
    grid-row: 2;
    grid-column: 2;
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
    <span class="new-button" out:send="{{key: 'new-box'}}" in:receive="{{key: 'new-box'}}" bind:this={newToggle}>
        <Button click={click}>
            <span class="NewButtonPlus">+</span> 
            <span class="NewButtonLabel">New Note</span>
        </Button>
    </span>