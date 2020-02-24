<script>
  import Card from './Card.svelte'
  import Cover from './Cover.svelte'
  import Metadata from './Metadata.svelte'
  import {publication} from '../../stores'
  let editing = false
</script>

<style>
</style>

  <Card id="About" tab="About" bind:editing={editing}>
    <h2>About</h2>
    <Cover />
    <Metadata />
  </Card>