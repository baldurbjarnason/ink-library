<script>
  export let click = null;
  export let hidden = false;
  export let disabled = false;
</script>

<style>
  :global(#sapper) svg.Close {
    color: var(--toolbar-text, #000);
    margin: 2px auto 0;
    background-color: transparent;
    border-radius: 0;
    height: 8px;
    width: 8px;
    padding: 0;
  }
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
    color: var(--workspace-color);
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
</style>

<button
  class="Button"
  type="button"
  {hidden}
  {disabled}
  on:click={click}
  data-highlight-toolbar="true">
  <svg
    class="Close"
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <rect
      x="5"
      width="1.4142"
      height="7.07099"
      rx="0.707099"
      transform="rotate(45 5 0)"
      fill="#333333" />
    <rect
      x="6"
      y="5"
      width="1.4142"
      height="7.07099"
      rx="0.707099"
      transform="rotate(135 6 5)"
      fill="#333333" />
  </svg>
</button>
