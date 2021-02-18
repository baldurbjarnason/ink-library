<script>
  export let item;
</script>

<style>
  .Item {
    padding: 0;
  }
  .Item h3 {
    font-weight: 600;
    margin: 0;
  }
  :global(#dnd-action-dragged-el.header) {
    background: #ffffff !important;
    padding: 16px !important;
    border-radius: 20px !important;
  }
  :global(#dnd-action-dragged-el.Item.header),
  :global(#dnd-action-dragged-el.Card.header) {
    min-height: 60px;
    max-height: 230px;
    overflow: hidden;
    display: grid !important;
  }
</style>

<main class="Item NewHeader">
  <h3>{item.body[0].content}</h3>
</main>
