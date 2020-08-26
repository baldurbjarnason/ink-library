<script>
  import { publication, workspaces, page, chapter } from "../../../stores";
  import { selection } from "../../../stores/utilities/selection.js";
  import { highlightRange, updateHighlight } from "./toolbar/highlightRange.js";
  import { positionToAnnotation } from "./toolbar/positionToAnnotation.js";
  import { saveNote } from "./toolbar/saveNote.js";
  import { dialog } from "../../notes/NoteEditDialog.svelte";
  export let root = null;
  export let hidden = false
  $: if (root) {
    root.addEventListener("click", handleClick, false);
    // set up event listeners
    // get the selection store
  }
  function handleClick(event) {
    if (event.target.matches("mark[data-annotation-id]")) {
      const refabEvent = Object.assign({}, event, {
        currentTarget: event.target
      });
      dialog.show(refabEvent);
    }
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
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    overflow-x: hidden;
    z-index: 2;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Button,
  .Button:link {
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
    color: #002230;
    border-radius: 5px;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    /* transition: box-shadow 0.15s ease-in-out; */
    background-color: transparent;
    text-decoration: none !important;
    transition: background-color 250ms cubic-bezier(0.075, 0.82, 0.165, 1);
    border: none;
    line-height: 0.1;
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
  @media (max-width: 720px) {
    .Button {
      font-size: 0.7rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
</style>

<div class="ToolBar" hidden={hidden}>
  <ol style="transform: translateX(-10px);">
    <li>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect
          x="11.5"
          y="10"
          width="13"
          height="1.5"
          rx="0.75"
          fill="#002230" />
        <rect
          x="11.5"
          y="14"
          width="13"
          height="1.5"
          rx="0.75"
          fill="#002230" />
        <rect
          x="14.5"
          y="18"
          width="10"
          height="1.5"
          rx="0.75"
          fill="#002230" />
        <rect
          x="14.5"
          y="22"
          width="10"
          height="1.5"
          rx="0.75"
          fill="#002230" />
        <circle cx="9.25" cy="10.75" r="0.75" fill="#002230" />
        <circle cx="9.25" cy="14.75" r="0.75" fill="#002230" />
        <circle cx="12.25" cy="18.75" r="0.75" fill="#002230" />
        <circle cx="12.25" cy="22.75" r="0.75" fill="#002230" />
      </svg>
    </li>
    <li />
  </ol>
  <ol>
    <li>
      <button
        class="Button"
        on:click={async () => {
          if ($selection && root.contains($selection.commonAncestorContainer)) {
            const positions = highlightRange($selection, root);
            let path;
            if ($page.params.path) {
              path = $page.params.path.join('/');
            } else if ($chapter.resource && $chapter.resource.url) {
              path = $chapter.resource.url.replace('.json', '');
            }
            const annotation = positionToAnnotation(positions, root, $publication, `/${$page.params.publicationId}/${path}`);
            const saved = await saveNote(annotation);
            updateHighlight(positions.tempId, saved.id);
            window.getSelection().removeAllRanges();
          }
        }}>
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24.2105 12.708C24.1769 12.8086 24.1516 12.9092 24.1095
            12.9931C22.569 15.8946 21.02 18.796 19.4711 21.7059C19.3616 21.9155
            19.2101 22.0497 18.9575 22.0749C17.9642 22.1671 17.055 22.5025 16.23
            23.056C16.1122 23.1315 16.0112 23.2237 15.9017 23.3159C15.7081
            23.4837 15.4556 23.5088 15.2451 23.3746C14.3023 22.7709 13.3678
            22.1671 12.425 21.5549C12.1893 21.404 12.0967 21.1608 12.2061
            20.9176C12.6018 20.0707 12.5344 19.2153 12.3071 18.3432C12.2482
            18.1252 12.1977 17.9071 12.1135 17.7059C11.9957 17.4292 12.063
            17.2111 12.2314 16.9931C12.787 16.2887 13.3426 15.5759 13.8982
            14.8715C15.3461 13.0266 16.8025 11.1818 18.2504 9.33691C18.5619
            8.94278 18.7723 8.90085 19.1933 9.17758C20.7506 10.1839 22.3164
            11.1985 23.8738 12.2048C24.0674 12.3222 24.2021 12.4648 24.2105
            12.708ZM18.8902 10.2258C17.0298 12.5906 15.1946 14.9218 13.351
            17.2782C15.1693 18.4522 16.9624 19.6178 18.7808 20.7918C20.1866
            18.1503 21.5925 15.5172 22.9983 12.8841C21.6093 11.9868 20.2624
            11.1063 18.8902 10.2258Z"
            fill="currentColor" />
          <path
            d="M14.5212 23.8609C14.3108 24.2047 14.1256 24.5317 13.9067
            24.8336C13.8394 24.9259 13.671 24.993 13.5447 24.993C12.8376 25.0013
            12.1305 24.993 11.4233 24.9846C11.0698 24.9762 10.8846 24.6156
            11.0782 24.3053C11.3896 23.8022 11.7095 23.3074 12.0294
            22.8043C12.1052 22.6785 12.1894 22.5611 12.282 22.4102C13.0312
            22.8965 13.7552 23.3661 14.5212 23.8609Z"
            fill="currentColor" />
        </svg>
      </button>
      <!-- </li>
  <li><svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.9931 16.0298C10.6936 15.7304 10.6936 15.5262 11.0135 15.2472C11.9867 14.376 13.1437 14.131 14.4095 14.2808C15.0016 14.3488 15.5665 14.5326 16.1041 14.7912C16.2198 14.8456 16.2879 14.832 16.3763 14.7435C17.3427 13.7703 18.3091 12.8039 19.2823 11.8375C19.3844 11.7355 19.3844 11.6402 19.3572 11.5109C19.1802 10.7895 19.2075 10.0817 19.5205 9.39433C19.7383 8.92474 20.0173 8.8771 20.378 9.2378C21.8753 10.7418 23.3725 12.2459 24.8834 13.7363C25.1828 14.0358 25.1556 14.3965 24.7472 14.5802C24.0395 14.8933 23.3249 14.9341 22.5831 14.7572C22.4469 14.7231 22.3653 14.7435 22.2632 14.8456C21.3172 15.7984 20.3644 16.7512 19.4048 17.704C19.2891 17.8197 19.2687 17.9082 19.3368 18.0579C19.7111 18.8473 19.9084 19.6776 19.8744 20.5487C19.8336 21.5355 19.5205 22.4271 18.8332 23.1553C18.5814 23.4207 18.3704 23.4207 18.1118 23.1621C17.2066 22.2501 11.8846 16.9213 10.9931 16.0298Z" fill="#002230"/>
<path d="M15.0059 19.9309C13.8965 21.0334 12.1432 22.7675 12.1773 22.7471C11.4899 23.3936 10.7413 23.9789 10.0131 24.5778C9.85654 24.7071 9.66599 24.8092 9.47543 24.8977C9.34612 24.9589 9.18959 25.061 9.06709 24.9385C8.93098 24.8092 9.03306 24.6391 9.10112 24.5166C9.25084 24.2512 9.40737 23.9857 9.59112 23.7475C10.3874 22.6927 11.2925 21.7331 12.2249 20.8007C12.2725 20.7939 13.25 19.7335 14.019 18.9645L15.0059 19.9309Z" fill="#002230"/></svg>
</li>
  <li><svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="20.3157" y="9" width="2" height="16" rx="1" fill="#002230"/>
<rect x="11.3157" y="9" width="2" height="16" rx="1" fill="#002230"/>
<rect x="16.8567" y="18.2" width="2" height="8.2826" rx="1" transform="rotate(45 16.8567 18.2)" fill="#002230"/>
<rect width="2" height="8.20556" rx="1" transform="matrix(-0.707107 0.707107 0.707107 0.707107 16.8665 18.2)" fill="#002230"/>
<rect x="22.3157" y="9" width="2" height="11" rx="1" transform="rotate(90 22.3157 9)" fill="#002230"/>
</svg>
</li> -->
    </li>
  </ol>
  <ol style="transform: translateX(10px);">
    <li>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <mask id="path-2-inside-1" fill="white">
          <rect x="11" y="9" width="12" height="16" rx="1" />
        </mask>
        <rect
          x="11"
          y="9"
          width="12"
          height="16"
          rx="1"
          stroke="#002230"
          stroke-width="3"
          mask="url(#path-2-inside-1)" />
        <rect x="10" y="12" width="3.5" height="1.5" rx="0.75" fill="#002230" />
        <rect x="14.5" y="10" width="1.5" height="14" fill="#002230" />
        <rect
          x="10"
          y="16.25"
          width="3.5"
          height="1.5"
          rx="0.75"
          fill="#002230" />
        <rect
          x="10"
          y="20.5"
          width="3.5"
          height="1.5"
          rx="0.75"
          fill="#002230" />
      </svg>

    </li>
  </ol>
</div>
