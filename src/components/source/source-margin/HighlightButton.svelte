<script>
	import { fly } from 'svelte/transition';
	import { bounceInOut } from 'svelte/easing';
  import {selection} from "../../../../state/selection.ts"
  import { highlightRange, updateHighlight } from "../../publication/reader/toolbar/highlightRange.js";
  import { positionToAnnotation } from "../../publication/reader/toolbar/positionToAnnotation.js";
  import { saveNote } from "../../publication/reader/toolbar/saveNote.js";
  import { onDestroy } from "svelte";
  import {chapter$, source$} from "../../../../state/state.ts"
  import {chapterURL$} from "../../../../state/state-urls.ts"
  import {refresh} from "../../../../state/refresh.ts"
export let root = null;
const selection$ = selection();
let range
let positions
$: if (range && $selection$.isCollapsed) {
  range = null
  positions = {}
} else if ($selection$) {
  range = $selection$.getRangeAt(0)
  positions = range.getBoundingClientRect()
}
$: if (root) {
  root.addEventListener("click", handleClick, false);
}
function getId (id) {
  const parts = id.split("/")
  return parts[parts.length - 1]
}
function handleClick(event) {
  if (event.target.matches("mark[data-annotation-id]") || event.target.matches("tspan[data-annotation-id]")) {
    document.getElementById(`id-${getId(event.target.dataset.annotationId)}`).open()
  }
}

function getStyle (positions) {
  return `position: absolute; left: -20px; top: ${window.scrollY + positions.top - 113}px;`
}
onDestroy(() => {
  root.removeEventListener("click", handleClick)
})
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
  border-radius: 100%;
  padding: 0.25rem;
  background-color: white;
  box-shadow: 0 0 5px 0px #ccc;
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
</style>

<div>
  <span>
    {#if $selection$ && !$selection$.isCollapsed}
    <button
      transition:fly|local="{{ y: 40, duration: 250, easing: bounceInOut }}"
      class="Button"
      style={getStyle(positions)}
      on:click={async () => {
        if (range && root.contains(range.commonAncestorContainer)) {
          try {
            const positions = highlightRange(range, root);
            let path;
            path = $chapter$.resource.url.replace('.json', '');
            const annotation = positionToAnnotation(positions, root, $source$, `/${$source$.shortId}/${path}`);
            const saved = await saveNote(annotation);
            refresh($chapterURL$);
            // Add a refresh annotation that temporarily adds the new annotation to the annotations collection.
            // Also render PDF highlights locally. Keep the tspan matching. Drop the rect creation.
            updateHighlight(positions.tempId, saved.id);
            window.getSelection().collapseToStart()
          } catch (err) {
            console.error(err)
          }
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
    {:else}
    <button
      transition:fly|local="{{ x: 20, duration: 250 }}"
      class="Button"
      hidden="true">
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
    {/if}</span>
</div>
