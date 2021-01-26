<script>
  export let body = { content: "" };
  export let edit = false;
  export let colour = "Colour1";
</script>

<style>
  blockquote {
    margin: 0;
    font-family: var(--old-style-fonts);
    font-size: 0.9rem;
    line-height: 1.1rem;
  }
  .Colour1 {
    background-color: var(--highlight-color1);
  }
  .Colour2 {
    background-color: var(--highlight-color2);
  }
  .Colour3 {
    background-color: var(--highlight-color3);
  }
  .Colour4 {
    background-color: var(--highlight-color4);
  }
  .edit {
    font-size: 0.9rem;
  }
</style>

<blockquote class:edit class={colour}>
  {@html body.content || body.value}
</blockquote>
