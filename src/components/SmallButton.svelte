<script>
  export let click = null
  export let href = null
  export let hidden = false
  export let disabled = false
</script>

<style>

  .Button,
  .Button:link {
    font-family: var(--sans-fonts);
    font-size: 0.6rem;
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
    text-transform: uppercase;
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
    color: var(--workspace-color);
  }

  .Button:hover,
  .Button:link:hover,
  .Button:link:visited:hover,
  .Button:visited:hover,
  .Button:link:visited:hover {
    color: white !important;
    background-color: var(--rc-dark);
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
</style>


{#if href}
  <a
    class="Button"
    {hidden}
    {disabled}
    {href}
    on:click={click}>
    <slot />
  </a>
{:else}
  <button
    class="Button"
    {hidden}
    {disabled}
    on:click={click}>
    <slot />
  </button>
{/if}
