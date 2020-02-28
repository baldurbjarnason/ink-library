<script>
  import Card from './Card.svelte'
  import Cover from './Cover.svelte'
  import Note from './Note.svelte'
  import {publication} from '../../stores'
  let editing = false
</script>

<style>
</style>


  <Card id="Notes" tab="Notes" bind:editing={editing}>
    <h2>Notes</h2>
    {#each $publication.replies as note}
      <Note {note} />
    {/each}
  </Card>