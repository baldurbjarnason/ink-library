<script>
	import { scale } from 'svelte/transition';
  import { elasticInOut } from 'svelte/easing';
</script>

<style>
  
  .Card {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: calc(var(--base)*1.5) var(--gap);
    box-shadow: 5px 5px 50px rgba(0, 0, 0, 0.05);
    border-radius: 15px;
    margin: var(--base) 0;
  }
</style>


<div class="Card">
  <slot></slot>
</div>