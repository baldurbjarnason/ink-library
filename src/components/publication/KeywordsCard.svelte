<script>
  import Card from './Card.svelte'
  import Cover from './Cover.svelte'
  import Keyword from './Keyword.svelte'
  import {publication} from '../../stores'
  let editing = false
</script>

<style>
</style>


  <Card id="Keywords" tab="About" bind:editing={editing}>
    <h2>Keywords</h2>
    <div class="Keywords">
    {#each $publication.keywords as keyword}
        <Keyword {keyword} />
    {:else}
      No Keywords
    {/each}
    </div>
  </Card>