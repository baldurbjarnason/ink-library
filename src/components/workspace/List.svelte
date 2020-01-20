<script>
  import {library} from '../../stores'
  import Item from './Item.svelte'
</script>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->
{#each $library.items as item,i (item.id)}
   <!-- content here -->
   <div><Item {item} /></div>
{/each}