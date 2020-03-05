<script>
  import Card from './Card.svelte'
  import CreateNoteCard from './CreateNoteCard.svelte'
  import Cover from './Cover.svelte'
  import Note from './Note.svelte'
  import {getToken} from '../../getToken'
  import {publication, refreshPublication} from '../../stores'
  let editing = false
  let text
  async function save () {
    const note = {
      publicationId: $publication.id,
      body: {
        motivation: "commenting",
        "type" : "TextualBody",
        "value" : text,
        "format" : "text/html"
      },
      target: { id: $publication.id }
    }
    await window.fetch(`/api/note`, {
      method: 'POST',
      credentials: "include",
      headers: {
        "csrf-token": getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note),
    })
    editing = false
    $refreshPublication = {id: $publication.shortId, time: Date.now()}
  }
</script>

<style>
</style>


  <Card id="Notes" tab="Notes" bind:editing={editing} {save} saveLabel="Add Note">
    <h2>Notes</h2>
  {#if editing}
    <CreateNoteCard bind:text={text} />
  {/if}
    {#each $publication.replies as note}
      <Note {note} />
    {/each}
  </Card>