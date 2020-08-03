<script>
  export let body = { content: "" };
</script>

<style>
  .Comment {
    padding: 0.5rem calc(var(--base) * 1);
  }
</style>

<div class="Comment">
  {@html body.content}
</div>
