<script>
  export let keyword
  export let index
</script>

<style>
  .Keyword {
    color: white;
    background-color: var(--workspace-color);
    border-radius: 50px;
    padding: calc(var(--base) * 0.25) calc(var(--base) * 0.5);
    font-size: 0.7rem;
    white-space: nowrap;
    display: inline-block;
    margin-right: calc(var(--base) * 0.25);
    margin-bottom: calc(var(--base) * 0.25);
    display: inline-flex;
    height: calc(var(--base)*0.5 + 1rem);
  }

  .Button {
    font-family: var(--sans-fonts);
    font-size: 0.9rem;
    flex: 0 1 auto;
    line-height: 1;

    display: inline-block;

    padding: 0;
    margin: auto auto auto calc(var(--base) * 0.5);
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
  .Button:visited:hover {
    color: white !important;
    background-color: var(--workspace-color);
    box-shadow: none;
    text-decoration: none;
  }

  .Button:active {
    background-color: var(--active);
  }
  .Button:focus {
    border-color: var(--link);
    background-color: var(--link);
  }
  .Button svg {
    height: 1rem;
    width: auto;
  }
</style>

<span class="Keyword">{keyword} <button class="Button" aria-label="Remove keywords"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="7.77808" cy="7.77817" r="5" transform="rotate(45 7.77808 7.77817)" fill="white" stroke="#E74951"/>
<rect x="9.5459" y="5.30328" width="1" height="6" rx="0.5" transform="rotate(45 9.5459 5.30328)" fill="#E74951"/>
<rect x="10.2529" y="9.54596" width="1" height="6" rx="0.5" transform="rotate(135 10.2529 9.54596)" fill="#E74951"/>
</svg>
</button></span>
<input type="hidden" name="keyword[{index}]" value="{keyword}" />