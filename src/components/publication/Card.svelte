<script>
	import { scale } from 'svelte/transition';
  import { elasticInOut } from 'svelte/easing';
  import EditButton from './EditButton.svelte'
  import EditBar from './EditBar.svelte'
  export let id
  export let tab
  export let editing = false
  export let save = false
  export let saveLabel = 'Save'
  export let cancel = () => {
    editing = false
  }
</script>

<style>
  
  .Card {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: calc(var(--base)*1.5) var(--gap);
    box-shadow: 5px 5px 50px rgba(0, 0, 0, 0.05);
    border-radius: 15px;
    position: relative;
  }
  .Target {
    display: block;
    content: "";
    position: absolute;
    top:-4rem;
  }
  @media (max-width: 720px) {
    .Card {
      background-color: transparent;
      box-shadow: none;
    }
  }
</style>


<div class="Card {tab}Tab" transition:scale|local="{{delay: 250, duration: 350, easing: elasticInOut }}"  id="{id}Card">
<span class="Target" {id}></span>
{#if save}
  {#if editing}
    <EditBar label="{saveLabel}" {save} {cancel}/>
  {:else}
    <EditButton label="Edit {id}" click={event => {
      editing = true
    }} />
  {/if}
{/if}
  <slot></slot>
</div>