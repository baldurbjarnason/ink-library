<script>
  import NoteEditor from "../widgets/NoteEditor.svelte";
  export let text = "";
</script>

<style>
  .CreateNote {
    font-size: var(--item-font-size);
  }
  /* :global(#create-noteCard) {
    grid-column: 1 / -1;
  } */
  .CreateNote :global(.ql-editor) {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #f6f6f6;
    padding: 1rem;
  }
  .CreateNote :global(.Editor),
  .CreateNote :global(.ql-toolbar.ql-snow) {
    border: none;
  }
  .CreateNote :global(.ql-toolbar.ql-snow) {
    padding: 8px 0;
  }
  .CreateNote :global(.ql-toolbar.ql-snow .ql-formats) {
    margin-right: 0;
  }
  .CreateNote :global(p),
  .CreateNote :global(.ql-snow .ql-editor blockquote) {
    margin-bottom: 0.75rem;
  }
</style>

<div class="CreateNote">
  <NoteEditor bind:richtext={text} />
</div>
