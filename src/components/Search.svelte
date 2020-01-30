<script>
  // your script goes here
  import {send, receive} from '../routes/_crossfade.js';
  import Closer from './Closer.svelte';
	import { afterUpdate, tick } from 'svelte';
  let open = false
  let input
  let searchToggle
  function click () {
    open = !open;
  }
  async function close () {
    open = false
    await tick()
    searchToggle.focus()
  }
  afterUpdate(() => {
    if (open) {
      input.focus();
    }
  })
</script>

<style>

  .Button,
  .Button:link {
    font-family: var(--sans-fonts);
    font-size: 0.9rem;
    flex: 0 1 auto;
    line-height: 1;

    display: inline-block;

    padding: 0.65rem 1.5rem 0.7rem;

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    font-weight: 300;
    color: var(--workspace-color);
    border-radius: 50px;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    /* transition: box-shadow 0.15s ease-in-out; */
    background-color: #FFFFFF;
    text-decoration: none !important;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: none;
  }

  .Button:hover,
  .Button:link:hover,
  .Button:link:visited:hover,
  .Button:visited:hover,
  .Button:link:visited:hover {
    color: white !important;
    background-color: var(--workspace-color);
    box-shadow: none;
    text-decoration: none;
  }

  .Button:active,
  .Button:link:active {
    background-color: var(--active);
  }
  .Button:focus {
    outline: none;
    box-shadow: 0 0 0 3px #68d6d499;
  }
  .Button svg {
    color: var(--workspace-color);
    margin-left: calc(var(--base) * 1.25);
    transform: translateY(1px);
  }
  .SearchBox {
    position: absolute;
    background-color: white;
    top: calc(var(--base) * 0.5);
    left: 0;
    right: 0;
    height: calc(var(--base) * 5);
    z-index: 2;
    border-radius: 15px;
  }
  .SearchBox form {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .SearchBox input {
    flex: 1 1 100%;
    font-family: var(--sans-fonts);
    font-size: 220%;
    border: none;
    font-weight: 300;
  }
  .SearchBox input:focus {
    outline: none;
  }
  .SearchBox:focus-within {
    box-shadow: 0 0 0 3px var(--workspace-color);
  }
  .SearchBox svg {

    margin: auto calc(var(--base) * 1.5);
  }
</style>

{#if open}
  <div class="SearchBox" out:send="{{key: 'search-box'}}" in:receive="{{key: 'search-box'}}">
  <form role="search" method="get" id="searchform" class="SearchForm" action="">
<label class="visually-hidden" id="search-label" for="search-input">Search:</label>
<Closer click={close} />
<input type="search" required name="s" id="search-input" class="search-field" value="" placeholder="Search..." bind:this={input}>

    <svg width="34" height="34" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9706 14C12.6971 14 12.4377 13.8936 12.2459 13.6987L8.40195 9.8592L8.23498 9.96556C7.38235 10.4973 6.39827 10.7774 5.38933 10.7774C2.41934 10.7774 0 8.35958 0 5.38871C0 2.41783 2.41934 0 5.38933 0C8.35932 0 10.7787 2.41783 10.7787 5.38871C10.7787 6.39554 10.498 7.38111 9.96511 8.2355L9.86208 8.40213L13.6989 12.238C14.1004 12.6422 14.1004 13.2945 13.6989 13.6987C13.5035 13.8936 13.2477 14 12.9706 14ZM5.38933 1.11319C3.03039 1.11319 1.11197 3.03115 1.11197 5.38871C1.11197 7.74626 3.03039 9.66422 5.38933 9.66422C7.74827 9.66422 9.66669 7.74626 9.66669 5.38871C9.66669 3.03115 7.74827 1.11319 5.38933 1.11319Z" fill="currentColor"/>
</svg>
</form>
</div>
<span></span>
{:else}
<button out:send="{{key: 'search-box'}}" in:receive="{{key: 'search-box'}}"
    class="Button"
    on:click={click}
    bind:this={searchToggle}>
    Search...
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9706 14C12.6971 14 12.4377 13.8936 12.2459 13.6987L8.40195 9.8592L8.23498 9.96556C7.38235 10.4973 6.39827 10.7774 5.38933 10.7774C2.41934 10.7774 0 8.35958 0 5.38871C0 2.41783 2.41934 0 5.38933 0C8.35932 0 10.7787 2.41783 10.7787 5.38871C10.7787 6.39554 10.498 7.38111 9.96511 8.2355L9.86208 8.40213L13.6989 12.238C14.1004 12.6422 14.1004 13.2945 13.6989 13.6987C13.5035 13.8936 13.2477 14 12.9706 14ZM5.38933 1.11319C3.03039 1.11319 1.11197 3.03115 1.11197 5.38871C1.11197 7.74626 3.03039 9.66422 5.38933 9.66422C7.74827 9.66422 9.66669 7.74626 9.66669 5.38871C9.66669 3.03115 7.74827 1.11319 5.38933 1.11319Z" fill="currentColor"/>
</svg>

  </button>
{/if}
  