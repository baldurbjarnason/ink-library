<script>
  import Card from './Card.svelte'
  import CreateNoteCard from './CreateNoteCard.svelte'
  import Cover from './Cover.svelte'
  import Note from './Note.svelte'
  import {getToken} from '../../getToken'
  import {publication, refreshPublication, publicationNotes} from '../../stores'
  let editing = false
  let text
  async function save () {
    const note = {
      publicationId: $publication.id,
      body: [{
        motivation: "commenting",
        content : text
      }],
      target: { id: $publication.id }
    }
    await window.fetch(`/api/notes`, {
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
  $: console.log($publicationNotes)
</script>

<style>
</style>


  <Card id="Notes" tab="Notes" bind:editing={editing} {save} saveLabel="Add Note">
    <h2>Notes</h2>
  {#if editing}
    <CreateNoteCard bind:text={text} />
  {/if}
    {#each $publicationNotes as note}
      <Note {note} />
    {/each}
  </Card>