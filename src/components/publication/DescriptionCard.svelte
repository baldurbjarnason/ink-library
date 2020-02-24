<script>
  import Card from './Card.svelte'
  import Cover from './Cover.svelte'
  import {publication, refreshPublication} from '../../stores'
  import {getToken} from '../../getToken'
  let editing = false
  let text = $publication.description || ""
  async function save () {
    const pub = Object.assign({}, $publication, {description: text})
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
  let textarea
  $: if (editing && textarea) {
    textarea.focus()
  }
</script>

<style>
  .Description {
    font-size:  var(--item-font-size);
  }
  textarea {
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ddd;
    background-color: #f6f6f6;
    padding: 1rem;
  }
</style>

  <Card id="Description" tab="About" bind:editing={editing} {save}>
    <Cover />
    <h2>Description</h2>
    <div class="Description">
      {#if editing}
         <textarea name="DescriptionEdit" id="PublicationDescriptionEdit" cols="30" rows="10" bind:value={text} bind:this={textarea}></textarea>
      {:else}
        <p>{$publication.description || ""}</p>
      {/if}
    </div>
  </Card>