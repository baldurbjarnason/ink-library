<script>
  import {library} from '../../stores'
  import Item from './Item.svelte'
  let items
  $: if ($library) {
    items = $library.items
  }
</script>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->
{#each items as item}
   <!-- content here -->
   <div><Item {item} /></div>
{/each}