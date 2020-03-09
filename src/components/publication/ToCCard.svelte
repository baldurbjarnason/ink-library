<script>
  import Card from './Card.svelte'
  import Cover from './Cover.svelte'
  import ToC from './ToC.svelte'
  import ToCEdit from './ToCEdit.svelte'
  import {publication, refreshPublication, contents} from '../../stores'
  import {getToken} from '../../getToken'
  let editing = false
  let text
  async function save () {
    const contents = processText(text)
    const json = Object.assign({}, $publication.json, {contents})
    const pub = Object.assign({}, $publication, {json})
    await window.fetch(`/api/publication/${$publication.shortId}`, {
      method: 'PUT',
      credentials: "include",
      headers: {
        "csrf-token": getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pub),
    })
    editing = false
    $refreshPublication = {id: $publication.shortId, time: Date.now()}
  }
  function processText (text) {
    const children = text.split('\n').map(label => {
      return {
        label
      }
    })
    return {
      type: 'custom',
      children,
      heading: "Table of Contents"
    }
  }
</script>

<style>
</style>


  <Card id="ToC" tab="ToC" bind:editing={editing} save={$contents.type === 404 ? save: 404}>
  {#if editing}
      <ToCEdit bind:text={text} />
  {:else}
    <ToC />
  {/if}
  </Card>