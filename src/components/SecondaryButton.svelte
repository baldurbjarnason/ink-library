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
    font-size: 0.9rem;
    flex: 0 1 auto;
    line-height: 1;

    display: inline-block;

    padding: 0.65rem 2.5rem 0.6rem;

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
    border-radius: 15px;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    /* transition: box-shadow 0.15s ease-in-out; */
    background-color: transparent;
    text-decoration: none !important;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: 2px solid var(--workspace-color);
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
  @media (max-width: 720px) {
    .Button {
      padding: 0.5rem 1rem;
      border: none;
      color: var(--action);
    }
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
    type="button"
    {hidden}
    {disabled}
    on:click={click}>
    <slot />
  </button>
{/if}
