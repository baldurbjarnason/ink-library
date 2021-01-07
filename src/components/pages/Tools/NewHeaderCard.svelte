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
</style>

<main class="Item">
  <h3>{item.body[0].content}</h3>
</main>
