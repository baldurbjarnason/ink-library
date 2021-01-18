<script>
  export let item;
</script>

<style>
  .Item {
    background: var(--main-background-color);
    border-radius: 20px;
    padding: 16px;
    display: grid;
    position: relative;
  }
  .Item :global(*) {
    font-size: 0.75rem;
    line-height: 0.9rem;
    margin: 0;
    color: #333 !important;
    background: transparent !important;
  }
  .Item :global(strong) {
    font-weight: 700;
  }
</style>

<div class="Item">
  <p class="Note">
    {@html item.body[0].content}
  </p>
</div>
