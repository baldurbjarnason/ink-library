<script>
  import Card from './Card.svelte'
  import Cover from './Cover.svelte'
  import Keyword from './Keyword.svelte'
  import KeywordInput from './KeywordInput.svelte'
  import {publication, refreshPublication} from '../../stores'
  let editing = false
  let form
  async function save () {
    const entries = Array.from(new URLSearchParams(new FormData(form)).entries()).filter(entry => entry[1])
    if (entries.length !== 0) {
      const body = Object.fromEntries(entries)
      for (const prop in body) {
        if (prop === 'wordCount' || prop === 'numberOfPages') {
          body[prop] = parseInt(body[prop], 10)
        }
      }
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
  function submit (event) {
    event.preventDefault();
  }
</script>

<style>
.KeywordsForm, .Keywords {
  display: flex;
  flex-wrap: wrap;
}
</style>


  <Card id="Keywords" tab="About" bind:editing={editing} {save}>
    <h2>Keywords</h2>
    <div class="Keywords">
    {#if !editing}
      {#each ['keyword1', 'keyword2', 'keyword3', 'keyword4'] as keyword}
          <Keyword {keyword} />
      {:else}
        No Keywords
      {/each}
    {:else}
      <form id="newform" class="KeywordsForm" action="/api/publication/{$publication.shortId}" on:submit={submit} bind:this={form}>
      {#each ['keyword1', 'keyword2', 'keyword3', 'keyword4'] as keyword, index}
          <KeywordInput {keyword} {index} />
      {:else}
        No Keywords
      {/each}
      </form>
    {/if}
    </div>
  </Card>