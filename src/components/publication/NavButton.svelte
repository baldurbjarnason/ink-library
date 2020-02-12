<script>
  export let click = null
  export let href = null
  export let dark = false
</script>

<style>

  .Button,
  .Button:link {
    font-family: var(--sans-fonts);
    font-size:  var(--item-font-size);
    flex: 0 1 auto;
    line-height: 1;

    display: inline-block;

    padding: 0.65rem var(--base) 0.6rem;

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
    background: #FFFFFF;
    border-radius: 7px;
    text-decoration: none !important;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: 1px solid transparent;
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
  .Button.dark {
    background-color: transparent;
    border-color: white;
    color: white;
  }
</style>


{#if href}
  <a
    class="Button"
    {href}
    on:click={click}
    class:dark>
    <slot />
  </a>
{:else}
  <button
    class="Button"
    on:click={click}
    class:dark>
    <slot />
  </button>
{/if}
