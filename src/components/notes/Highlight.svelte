<script>
  export let body = { content: "" };
  export let edit = false;
</script>

<style>
  blockquote {
    background-color: var(--highlight-color);
    padding: 0.5rem calc(var(--base) * 1);
    margin: 0;
    font-family: var(--old-style-fonts);
    font-size: calc(var(--base) * 0.8);
  }
  .edit {
    font-size: calc(var(--base) * 1.1);
  }
</style>

<blockquote class:edit>
  {@html body.content}
</blockquote>
