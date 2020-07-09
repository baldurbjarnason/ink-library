<script>
  import {onMount} from 'svelte'
  import Card from './Card.svelte'
  import CreateNoteCard from './CreateNoteCard.svelte'
  import Cover from './Cover.svelte'
  import Note from './Note.svelte'
  import NotesSearch from './NotesSearch.svelte'
  import {getToken} from '../../getToken'
  import {publication, refreshPublication, publicationNotes, notesSearch, page, workspaces, collections} from '../../stores'
  let editing = false
  let text
  async function save () {
    let workspace
    if ($page.params.workspace && $page.params.workspace !== 'all') {
      workspace = $workspaces.find(space => space.name === $page.params.workspace).id
    }
    // Need to do the same for stack
    let collection
    if ($page.params.collection && $page.params.collection !== 'all') {
      collection = $collections.find(space => space.name === $page.params.collection).id
    }
    const note = {
      sourceId: $publication.id,
      body: [{
        motivation: "commenting",
        content : text
      }],
      target: { id: $publication.id },
      _workspace: workspace,
      _collection: collection
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
  onMount(() => {
    $refreshPublication = {id: $publication.shortId, time: Date.now()}
  });
</script>

<style>
</style>


  <Card id="Notes" tab="Notes" bind:editing={editing} {save} saveLabel="Add Note">
    <h2>Notes</h2>
  {#if editing}
    <CreateNoteCard bind:text={text} />
    {:else}
      <NotesSearch />
  {/if}
    {#each $publicationNotes as note}
      <Note {note} />
    {/each}
  </Card>