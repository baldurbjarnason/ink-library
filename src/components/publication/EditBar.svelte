<script>
  import SmallButton from '../widgets/SmallButton.svelte'
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
    background-color: var(--workspace-color);
    color: white;
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
    font-weight: 400;
  }
  .Button:hover {
    background-color: var(--hover);
  }
  .Button:active {
    background-color: var(--active);
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
<button class="Button" aria-label="{label}" type="button" on:click={save}>Save
</button></div>