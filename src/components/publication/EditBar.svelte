<script>
  import SmallButton from '../SmallButton.svelte'
  export let cancel
  export let label
  export let save
</script>

<style>

  .Button,
  .Button:link {
    font-family: var(--sans-fonts);
    font-size:  var(--item-font-size);
    flex: 0 1 auto;
    line-height: 1;

    display: flex;

    padding: 0;

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    font-weight: 500;
    color: var(--workspace-color);
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    /* transition: box-shadow 0.15s ease-in-out; */
    background: transparent;
    border-radius: 3px;
    text-decoration: none !important;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: 1px solid transparent;
    margin-left: 1rem;
  }
  .Button:hover {
    color: var(--hover);
  }
  .Button:active {
    color: var(--active);
  }
  .EditBar {
    display: flex;
    position: absolute;

    top: calc(var(--base)*1.25);
    right: var(--gap);
    width: min-content;
    justify-content: space-between;
  }
</style>

<div class="EditBar">
<SmallButton click={cancel}>Cancel</SmallButton>
<button class="Button" aria-label="{label}" type="button" on:click={save}>
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.500031" width="24" height="24" rx="5" fill="currentColor"/>
<path d="M16.1667 5H6.16667C5.25 5 4.5 5.75 4.5 6.66667V18.3333C4.5 19.25 5.25 20 6.16667 20H17.8333C18.75 20 19.5 19.25 19.5 18.3333V8.33333L16.1667 5ZM12 18.3333C10.625 18.3333 9.5 17.2083 9.5 15.8333C9.5 14.4583 10.625 13.3333 12 13.3333C13.375 13.3333 14.5 14.4583 14.5 15.8333C14.5 17.2083 13.375 18.3333 12 18.3333ZM14.5 10H6.16667V6.66667H14.5V10Z" fill="white"/>
</svg>
</button></div>