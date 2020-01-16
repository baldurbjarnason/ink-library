<script>
  export let click
</script>

<style>

  .Button,
  .Button:link {
    font-family: var(--sans-fonts);
    font-size: 0.9rem;
    flex: 0 1 auto;
    line-height: 1;

    display: inline-block;

    padding: 0.5rem;
    margin: auto calc(var(--base) * 0.5);
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
    border-color: var(--link);
    background-color: var(--link);
  }
</style>


<button type="Button" class="Button" on:click={click}>
<svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle opacity="0.7" cx="14.1426" cy="15" r="10" transform="rotate(45 14.1426 15)" fill="currentColor"/>
<rect x="16.9707" y="10.7573" width="2" height="10" rx="1" transform="rotate(45 16.9707 10.7573)" fill="white"/>
<rect x="18.3848" y="17.8286" width="2" height="10" rx="1" transform="rotate(135 18.3848 17.8286)" fill="white"/>
</svg>

</button>
