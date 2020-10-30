<script>
  import { publication, workspaces, page } from "../../../stores";
  let download
  $: if ($publication && $publication.json && $publication.json.storageID) {
    download = `/api/download/${$publication.json.storageId}`
  } else {
    download = ""
  }
</script>

<style>
  .ToolBar {
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: var(--reader-toolbar-background);
    border-bottom: 1px solid var(--reader-toolbar-border);
    color: var(--reader-toolbar-color);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: sticky;
    top: 0;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    padding: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    align-items: stretch;
  }
  .ToolBar ol li button {
    color: var(--reader-toolbar-color);
  }
  .Spacer {
    margin: 0.5rem 0.75rem;
    border-left: 1px solid #ddd;
    align-self: stretch;
  }
  .Button {
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
    color: var(--reader-toolbar-color);
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    background-color: transparent;
    text-decoration: none !important;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: none;
    height: 100%;
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

<div class="ToolBar">
  <ol style="transform: translateX(10px);">
    <li>
      <button class="Button" aria-label="Export Source">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 23.5C22 23.6381 21.8881 23.75 21.75 23.75L10.75 23.75C10.6119
            23.75 10.5 23.6381 10.5 23.5L10.5 13.5911C10.5 13.5324 10.5207
            13.4755 10.5585 13.4305L13.5704 9.83935C13.6179 9.78271 13.688 9.75
            13.7619 9.75L21.75 9.75C21.8881 9.75 22 9.86193 22 10L22 23.5Z"
            stroke="#002230"
            stroke-width="1.5" />
          <path
            d="M14.75 14C14.75 14.2761 14.5261 14.5 14.25 14.5L11.25
            14.5C10.9739 14.5 10.75 14.2761 10.75 14L10.75 12.8419C10.75 12.7284
            10.7887 12.6182 10.8596 12.5295L13.1337 9.6876C13.2286 9.56903
            13.3723 9.5 13.5241 9.5L14.25 9.5C14.5261 9.5 14.75 9.72386 14.75
            10L14.75 14Z"
            fill="#002230" />
          <rect
            x="18.25"
            y="12"
            width="7"
            height="9"
            rx="3.5"
            fill="transparent" />
          <rect
            x="24.25"
            y="15.6871"
            width="1.5"
            height="7"
            rx="0.75"
            transform="rotate(90 24.25 15.6871)"
            fill="#002230" />
          <rect
            x="24.0377"
            y="15.4749"
            width="1.5"
            height="5"
            rx="0.75"
            transform="rotate(45 24.0377 15.4749)"
            fill="#002230" />
          <rect
            x="21.5628"
            y="13"
            width="5"
            height="1.5"
            rx="0.75"
            transform="rotate(45 21.5628 13)"
            fill="#002230" />
        </svg>
      </button>
    </li>
    {#if download}
    <li>
      <a href="{download}" class="Button" aria-label="Download Source">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            x="16.2604"
            y="19.293"
            width="8"
            height="1.5"
            rx="0.75"
            transform="rotate(-45 16.2604 19.293)"
            fill="#002230" />
          <rect
            width="8"
            height="1.5"
            rx="0.75"
            transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 18.2175
            19.293)"
            fill="#002230" />
          <rect
            x="16.4677"
            y="20"
            width="11"
            height="1.5"
            rx="0.75"
            transform="rotate(-90 16.4677 20)"
            fill="#002230" />
          <rect
            x="10.5"
            y="23.5"
            width="13"
            height="1.5"
            rx="0.75"
            fill="#002230" />
        </svg>

      </a>

    </li>
    {/if}
    <li class="Spacer" />
    <li>
      <button class="Button">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect
            x="11"
            y="11"
            width="12"
            height="1"
            rx="0.5"
            fill="#002230"
            fill-opacity="0.8" />
          <path
            d="M12.0451 13.5415C12.0208 13.25 12.2509 13 12.5434
            13H21.4566C21.7491 13 21.9792 13.25 21.9549 13.5415L21.0382
            24.5415C21.0166 24.8007 20.8 25 20.5399 25H13.4601C13.2 25 12.9834
            24.8007 12.9618 24.5415L12.0451 13.5415Z"
            fill="#002230"
            fill-opacity="0.8" />
          <rect
            x="15"
            y="9"
            width="4"
            height="1"
            rx="0.5"
            fill="#002230"
            fill-opacity="0.8" />
          <rect
            x="16"
            y="9"
            width="3"
            height="1"
            rx="0.5"
            transform="rotate(90 16 9)"
            fill="#002230"
            fill-opacity="0.8" />
          <rect
            x="19"
            y="9"
            width="3"
            height="1"
            rx="0.5"
            transform="rotate(90 19 9)"
            fill="#002230"
            fill-opacity="0.8" />
        </svg>
      </button>
    </li>
  </ol>
</div>
