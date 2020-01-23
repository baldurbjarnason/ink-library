<script>
  import Button from '../Button.svelte'
  import WhiteButton from './WhiteButton.svelte'
  import {send, receive} from '../../routes/_crossfade.js';
  import Closer from '../Closer.svelte';
	import { afterUpdate, tick } from 'svelte';
  let open = false
  let input
  let newToggle
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
</script>

<style>
  .NewBox {
    position: absolute;
    background-color: var(--workspace-color);
    color: white;
    top: calc(var(--base) * 0.5);
    left: 0;
    right: 0;
    height: calc(var(--base) * 5);
    z-index: 2;
    border-radius: 15px;
    padding-right: var(--base);
  }
  .NewBox form {
    display: flex;
    align-items: center;
    height: 100%;
  }
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
  .NewBox:focus-within {
    box-shadow: 0 0 0 3px var(--workspace-color);
  }
  .new-button {
    margin: 0 auto 0 0;
  }
</style>

{#if open}
  <div class="NewBox" out:send="{{key: 'new-box'}}" in:receive="{{key: 'new-box'}}">
  <form method="get" id="newform" class="newForm" action="">
<label class="visually-hidden" id="new-label" for="new-input">New item:</label>
<Closer click={close} dark={true} />
<input type="title" required="" name="s" id="title-input" class="title-field" value="" placeholder="Publication Title" bind:this={input}>

  <WhiteButton click={(ev) => {
    ev.preventDefault()
    close()
  }}>Create</WhiteButton>
</form>
</div>
<span></span>
{:else}
  <span class="new-button" out:send="{{key: 'new-box'}}" in:receive="{{key: 'new-box'}}"
    bind:this={newToggle}><Button click={click}>+ New</Button></span>
{/if}