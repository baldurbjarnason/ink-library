<script>
  export let click = null;
  export let hidden = false;
  export let disabled = false;
</script>

<style>
  .Button,
  .Button:link {
    font-family: var(--sans-fonts);
    font-size: 0.8rem;
    flex: 0 1 auto;
    line-height: 1;

    display: inline-block;

    padding: calc(var(--base) * 0.25) calc(var(--base) * 0.5);

    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
    white-space: nowrap;
    text-decoration: none;
    font-weight: 600;
    color: white;
    border-radius: 5px;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    /* transition: box-shadow 0.15s ease-in-out; */
    background-color: var(--workspace-color);
    text-decoration: none !important;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: 1px solid var(--workspace-color);
    background-color: white;
    color: #005173;
    padding: 0;
    border: none;
    background-color: transparent;
  }

  .Button:hover,
  .Button:link:hover,
  .Button:link:visited:hover,
  .Button:visited:hover,
  .Button:link:visited:hover {
    color: var(--hover) !important;
  }

  .Button:active,
  .Button:link:active {
    color: var(--active);
  }
  /* .Button:focus {
    box-shadow: 0 0 0 3px #68d6d499;
  } */
</style>

<button class="Button" type="button" {hidden} {disabled} on:click={click}>
  <slot />
</button>
