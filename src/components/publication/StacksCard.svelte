<script>
  import Card from './Card.svelte'
  import ItemStacks from '../workspace/ItemStacks.svelte'
  import {publication} from '../../stores'
  let editing = false
</script>

<style>
</style>

  <Card id="Stacks" tab="Stacks" bind:editing={editing}>
    <h2>Stacks</h2>
    <ItemStacks item={$publication} />
  </Card>