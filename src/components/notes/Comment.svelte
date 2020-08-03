<script>
  export let body = { content: "" };
</script>

<style>
  .Comment {
    padding: calc(var(--base) * 1);
  }
</style>

<div class="Comment">
  {@html body.content}
</div>
