<script>
  import Card from './Card.svelte'
  import Cover from './Cover.svelte'
  import ToC from './ToC.svelte'
  import {publication} from '../../stores'
  let editing = false
</script>

<style>
</style>


  <Card id="ToC" tab="ToC" bind:editing={editing}>
    <ToC />
  </Card>