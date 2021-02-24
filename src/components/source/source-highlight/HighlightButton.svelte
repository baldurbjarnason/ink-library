<script>
  export let click = null;
  export let hidden = false;
  export let disabled = false;
  export let outline = false;
</script>

<style>
  button.HighlightButton {
    font-family: var(--sans-fonts);
    font-size: 0.8rem;
    flex: 0 1 auto;
    line-height: 1;

    display: inline-block;

    padding: 0.5rem 1rem;

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
    border-radius: 4px;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    /* transition: box-shadow 0.15s ease-in-out; */
    text-decoration: none !important;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    color: white;
    border: none;
    background-color: var(--toolbar-text, #999);
    float: none;
  }
  .HighlightButton.outline {
    color: var(--toolbar-text, #999);
    background-color: transparent;
    border: 1px solid var(--toolbar-text, #999);
  }

  .HighlightButton:hover,
  .HighlightButton:link:hover,
  .HighlightButton:link:visited:hover,
  .HighlightButton:visited:hover,
  .HighlightButton:link:visited:hover {
    color: #f0f0f0 !important;
    background-color: var(--hover) !important;
  }

  .HighlightButton:active,
  .HighlightButton:link:active {
    color: var(--active);
  }
  /* .HighlightButton:focus {
    box-shadow: 0 0 0 3px #68d6d499;
  } */
</style>

<button
  class="HighlightButton"
  type="button"
  class:outline
  {hidden}
  {disabled}
  on:click={click}>
  <slot />
</button>
