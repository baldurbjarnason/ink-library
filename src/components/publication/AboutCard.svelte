<script>
  import Card from './Card.svelte'
  import Cover from './Cover.svelte'
  import Metadata from './Metadata.svelte'
  import MetadataForm from './MetadataForm.svelte'
  import {publication, refreshPublication} from '../../stores'
  import {getToken} from '../../getToken'
  let editing = false
  let formElement
  async function save () {
    const entries = Array.from(new URLSearchParams(new FormData(formElement)).entries()).filter(entry => entry[1])
    if (entries.length !== 0) {
      const body = Object.fromEntries(entries)
      let inLanguage = []
      for (const prop in body) {
        if (prop === 'wordCount' || prop === 'numberOfPages') {
          body[prop] = parseInt(body[prop], 10)
        } else if (prop.startsWith('inLanguage')) {
          inLanguage = inLanguage.concat(body[prop])
        }
      }
      body.inLanguage = inLanguage
      const pub = Object.assign({}, $publication, body)
      await window.fetch(`/api/publication/${$publication.shortId}`, {
        method: 'PUT',
        credentials: "include",
        headers: {
          "csrf-token": getToken(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pub),
      })
    }
    editing = false
    $refreshPublication = {id: $publication.shortId, time: Date.now()}
  }
</script>

<style>
</style>

  <Card id="About" tab="About" bind:editing={editing} {save}>
    <h2>About</h2>
    <Cover />
    {#if !editing}
      <Metadata />
    {:else}
      <MetadataForm bind:form={formElement} />
    {/if}
  </Card>