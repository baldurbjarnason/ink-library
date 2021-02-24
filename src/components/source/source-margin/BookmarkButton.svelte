<script>
  // import {Bookmark} from "../../../../state/models/Bookmark"
  import { chapter$, source$ } from "../../../../state/state.ts";
  import { encode } from "universal-base64url";
  export let entry;
  let logging;
  export let bookmark;
  let bookmarked = false;
  let id = "";
  $: if ($bookmark.shortId) {
    bookmarked = true;
    id = `bookmark-${encode($bookmark.shortId)}`;
  } else {
    bookmarked = false;
    id = "";
  }
</script>

<style>
  .Button,
  .Button:link {
    font-family: var(--sans-fonts);
    font-size: 0.75rem;
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
    color: #002230;
    border-radius: 5px;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    background-color: transparent;
    text-decoration: none !important;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: none;
    line-height: 0.1;
    border-radius: 0 0 0 1rem;
    padding: 0.25rem;
    background-color: rgb(240, 240, 240, 0.4);
  }
  .notPDF .Button {
    border-radius: 1rem 0 0 1rem;
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
    box-shadow: 0 0 5px 0px #ccc;
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
      font-size: 0.7rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
  .Wrapper {
    left: -44px;
    position: absolute;
  }
  .Wrapper.bookmark .Button {
    background-color: #333;
    color: white;
  }
  .Wrapper {
    transition: transform 250ms ease-in-out;
  }
  /* .Wrapper[data-bookmark-id] svg {
  transform: scale(1.5);
} */
</style>

<div
  {id}
  class="Wrapper"
  class:notPDF={entry.element.dataset.inkPageHeader !== ''}
  class:bookmark={bookmarked}
  style="top: {entry.element.dataset.inkPageHeader === '' ? entry.top - 111 : entry.top - 120}px;"
  data-bookmark-id={$bookmark ? $bookmark.id : null}
  on:click={(event) => {
    async function bookmarking() {
      if (!$bookmark.shortId) {
        logging = true;
        bookmarked = true;
        await $bookmark.create(entry.element, {
          chapter: $chapter$.resource,
          source: $source$,
        });
      } else {
        bookmarked = false;
        await $bookmark.delete();
      }
    }
    return bookmarking();
  }}>

  <button class="Button">
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        x="20.8067"
        y="9"
        width="1.5"
        height="16"
        rx="0.75"
        fill="currentColor" />
      <rect
        x="11.3067"
        y="9"
        width="1.5"
        height="16"
        rx="0.75"
        fill="currentColor" />
      <rect
        x="16.8033"
        y="18.4534"
        width="1.5"
        height="8.20707"
        rx="0.75"
        transform="rotate(45 16.8033 18.4534)"
        fill="currentColor" />
      <rect
        width="1.5"
        height="8.20556"
        rx="0.75"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 16.8067 18.45)"
        fill="currentColor" />
      <rect
        x="22.3067"
        y="9"
        width="1.5"
        height="11"
        rx="0.75"
        transform="rotate(90 22.3067 9)"
        fill="currentColor" />
    </svg>

  </button>
</div>
