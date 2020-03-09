<script>
  import Card from './Card.svelte'
  import StacksForm from './StacksForm.svelte'
  import StacksCardItems from './StacksCardItems.svelte'
  import {publication, addedCollections, refreshPublication, addingStacks, removingStacks} from '../../stores'
  import {getToken} from '../../getToken'
  let editing = false
  let form
  async function save () {
    // Make an add collection request for each in $addingStack and a remove collection request for each in $removingStacks
    for (const tag of $addingStacks) {
      try {
        await fetch(`/api/publication/${$publication.shortId}/${tag.id}`, {
          method: "PUT",
          credentials: "include",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "csrf-token": getToken()
            }
        })
      } catch (err) {
        console.error(err)
      }
    }
    for (const tag of $removingStacks) {
      try {
        await fetch(`/api/publication/${$publication.shortId}/${tag.id}`, {
          method: "DELETE",
          credentials: "include",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "csrf-token": getToken()
            }
        })
      } catch (err) {
        console.error(err)
      }
    }
    editing = false
    $refreshPublication = {id: $publication.shortId, time: Date.now()}
  }
</script>

<style>
</style>

  <Card id="Stacks" tab="Stacks" bind:editing={editing} {save}>
    <h2>Stacks</h2>
    {#if editing}
      <StacksForm bind:form={form} />
    {:else}
      <StacksCardItems item={$publication} />
    {/if}
  </Card>