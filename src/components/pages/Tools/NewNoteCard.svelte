<script>
  export let item;
</script>

<style>
  .Item,
  :global(#dnd-action-dragged-el.note) {
    background: var(--main-background-color);
    border-radius: 20px;
    padding: 16px !important;
    display: grid;
    position: relative;
    overflow: hidden;
    max-height: 230px;
  }
  :global(#dnd-action-dragged-el.Item.note),
  :global(#dnd-action-dragged-el.Card.note) {
    background: #ffffff !important;
    border-radius: 20px !important;
    overflow: hidden !important;
    max-height: 230px;
    min-height: 100px;
  }
  .Item :global(*),
  :global(#dnd-action-dragged-el.note *) {
    font-size: 0.75rem;
    line-height: 0.9rem;
    margin: 0;
    color: #333 !important;
    background: transparent !important;
  }
  .Item :global(strong),
  :global(#dnd-action-dragged-el.note strong) {
    font-weight: 700;
  }
</style>

<div class="Item">
  <p class="Note">
    {@html item.body[0].content}
  </p>
</div>
