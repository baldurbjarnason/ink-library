<script>
  export let body = { content: "" };
  export let edit = false;
  export let colour = "Colour1"
</script>

<style>
  blockquote {
    background-color: var(--highlight-color);
    padding: 0.5rem calc(var(--base) * 1);
    margin: 0;
    font-family: var(--old-style-fonts);
    font-size: calc(var(--base) * 0.8);
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
    font-size: calc(var(--base) * 1.1);
  }
</style>

<blockquote class:edit class="{colour}">
  {@html body.content}
</blockquote>
