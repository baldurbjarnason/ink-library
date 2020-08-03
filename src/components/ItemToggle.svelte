<script>
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  let card;
  let items;
  let selected;
  $: if ($page.query) {
    const cardConfig = Object.assign({}, $page.query, {
      "list-style": "card"
    });
    const itemsConfig = Object.assign({}, $page.query, {
      "list-style": "item"
    });
    card = "?" + new URLSearchParams(cardConfig).toString();
    items = "?" + new URLSearchParams(itemsConfig).toString();
    if ($page.query["list-style"] === "card") {
      selected = "card";
    } else {
      selected = "item";
    }
  } else {
    card = "";
    items = "";
  }
</script>

<style>
  a,
  a:link {
    font-family: var(--sans-fonts);
    font-size: 0.9rem;
    flex: 0 1 auto;
    line-height: 1;

    display: inline-block;

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
    background-color: transparent;
    text-decoration: none !important;
    transition: color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: none;
    margin: auto;
    padding: calc(var(--base) * 0.5) 0 calc(var(--base) * 0.5)
      calc(var(--base) * 0.65);
  }

  a:hover,
  a:link:hover,
  a:link:visited:hover,
  a:visited:hover,
  a:link:visited:hover {
    color: var(--rc-dark) !important;
    box-shadow: none;
    text-decoration: none;
    opacity: 1;
  }

  a:active,
  a:link:active {
    color: var(--active);
  }
  a:focus {
    color: var(--link);
  }
  a {
    opacity: 0.2;
  }
  .selected {
    opacity: 1;
  }
  .Toggles {
    display: flex;
    padding: 0 0 0 var(--base);
  }
  @media (max-width: 720px) {
    .Toggles {
      display: none;
    }
  }
</style>

<!-- markup (zero or more items) goes here -->
<div class="Toggles">
  <a href="{$page.path}{items}" class:selected={selected === 'item'}>
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="1" cy="1" r="1" fill="currentColor" />
      <rect x="4" width="10" height="2" rx="1" fill="currentColor" />
      <circle cx="1" cy="6" r="1" fill="currentColor" />
      <rect x="4" y="5" width="10" height="2" rx="1" fill="currentColor" />
      <circle cx="1" cy="11" r="1" fill="currentColor" />
      <rect x="4" y="10" width="10" height="2" rx="1" fill="currentColor" />
    </svg>
  </a>
  <a href="{$page.path}{card}" class:selected={selected === 'card'}>
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect x="7" y="7" width="5" height="5" rx="1" fill="currentColor" />
        <rect x="7" width="5" height="5" rx="1" fill="currentColor" />
        <rect width="5" height="5" rx="1" fill="currentColor" />
        <rect y="7" width="5" height="5" rx="1" fill="currentColor" />
      </g>
    </svg>
  </a>
</div>
