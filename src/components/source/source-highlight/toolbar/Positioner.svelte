<script>
  import { onMount, onDestroy } from "svelte";
  import { source$, chapter$ } from "../../../../../state/state.ts";
  import { createPopper } from "@popperjs/core";
  import { toolbar$ } from "../../../../../state/models/SelectionToolbar.ts";

  export let toolbar;
  export let hidden;
  export let colour;
  const virtual = {
    getBoundingClientRect() {
      if ($toolbar$) {
        if ($toolbar$.visible) {
          return $toolbar$.getBoundingClientRect();
        } else {
          return document.body.getBoundingClientRect();
        }
      } else {
        return document.body.getBoundingClientRect();
      }
    },
  };
  let popperInstance;
  $: if (toolbar) {
    popperInstance = createPopper(virtual, toolbar, {
      placement: "top",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 15],
          },
        },
        {
          name: "flip",
          options: {
            padding: { top: 50 },
          },
        },
      ],
    });
  }
  $: if ($toolbar$ && $toolbar$.visible) {
    hidden = false;
    popperInstance.update();
  } else {
    hidden = true;
  }
  function handleClick() {
    $toolbar$.tempHighlight(
      $source$.id,
      `/${$source$.shortId}/${$chapter$.resource.url.replace(".json", "")}`
    );
  }
  $: if (toolbar) {
    toolbar.addEventListener("click", handleClick);
  }
  onDestroy(() => {
    if (popperInstance) {
      popperInstance.destroy();
    }
  });
</script>

<style>
  .HighlightToolbar {
    padding: 0;
    margin: 0;
    background-color: white;
    padding: 0.5rem 0.65rem;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--toolbar-colour, #dddddd);
  }
  :global(#sapper
      .Chapter
      .Highlight[data-annotation-id="temporary-selection-highlight"]) {
    background-color: rgba(120, 120, 120, 0.2);
  }
</style>

<svelte:body
  on:click={(event) => {
    if (toolbar.contains(event.target) || toolbar === event.target || event.target.closest('[data-highlight-toolbar]')) return;
  }} />

<nav
  class="HighlightToolbar"
  class:colour
  bind:this={toolbar}
  class:visually-hidden={hidden}
  on:mousedown={(event) => {
    if (event.target.matches('details *:not(label):not(input)') || event.target === event.currentTarget) {
      event.preventDefault();
    }
  }}
  on:click={(event) => {
    if (event.target.matches('input')) {
    }
  }}>
  <slot />
</nav>
