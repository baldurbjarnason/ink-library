<script>
  export let item = {}
</script>

<style>
  /* your styles go here */
  .Item {
    background-color: white;
    min-height: calc(var(--base) * 4);
    display: grid;
    grid-template-columns: 80px 1fr 0.75fr 0.5fr 0.5fr 0.5fr;
    grid-gap: calc(var(--base) * 0.25);
    margin: 2px;
    border-radius: 15px;
    padding: calc(var(--base) * 0.25);
    min-width: 600px;
  }
  .Image {
    padding: calc(var(--base) * 0.25) 0;
  }
  .Name {
    font-size: 0.75rem;
    font-weight: 600;
    padding: calc(var(--base) * 0.5) 0;
  }
</style>

<div class="Item">
  <div class="Image">&nbsp;</div>
  <div class="Name">{item.name}</div>
  <div class="Stacks">&nbsp;</div>
  <div class="Type">&nbsp;</div>
  <div class="Modified">&nbsp;</div>
  <div class="Final">&nbsp;</div>
</div>