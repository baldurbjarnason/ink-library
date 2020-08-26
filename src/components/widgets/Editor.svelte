<script>
  import { onMount, tick } from "svelte";
  let Quill;
  if (process.browser) {
    import("quill").then(module => {
      Quill = module.default;
    });
  }
  export let richtext = "";
  export let autofocus = false;
  let container;
  let editor;
  let hasFocus;
  $: if (container && process.browser && Quill) {
    editor = new Quill(container, {
      modules: {
        toolbar: [["bold", "italic"], ["link", "blockquote"], ["clean"]]
      },
      theme: "snow"
    });
  }
  $: if (editor) {
    if (autofocus) {
      editor.focus()
      autofocus = false
    }
    editor.on("selection-change", (range, oldRange, source) => {
      if (range) {
        hasFocus = true;
      } else {
        hasFocus = false;
        richtext = content();
      }
    });
    editor.on("text-change", () => {
      richtext = content();
    });
  }
  function content() {
    return container.querySelector(".ql-editor").innerHTML;
  }
</script>

<style>
  .Editor :global(.ql-editor) {
    height: auto;
  }
  .Editor.hasFocus :global(.ql-editor), .Editor.hasFocus {
    background-color: #fefefe;
  }
  :global(#sapper .ql-snow.ql-toolbar button),
  :global(#sapper .ql-snow .ql-toolbar button) {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 0.25rem;
  }
  :global(#sapper button.ql-active) {
    background-color: #f0f0f0;
  }
</style>

<!-- markup (zero or more items) goes here -->
<div class="Editor" class:hasFocus bind:this={container}>
  <slot />
</div>
