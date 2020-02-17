<script>
  export let item
</script>

<style>
  details {
    margin: 0;
    padding: 0;
  }
  details > summary {
    cursor: pointer;
    list-style: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22square%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M15%2018l-6-6%206-6%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%;
    background-size: 12px auto;
    border-radius: 8px;
    background-color: #f0f0f0;
  }
  details[open] > summary {
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22square%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 0.7em top 50%;
    background-size: 12px auto;
    background-color: transparent
  }
  details > summary::-webkit-details-marker {
    display: none;
  }
  li {
    padding: calc(var(--base) * 0.25) 0;
    margin: 0;
  }
  .Level {
    display: block;
    padding: 0.25rem;
  }
</style>

<li>
  {#if item.children}
    <details open>
      <summary><span class="Level">{item.name}</span></summary>
      <ol>
        {#each item.children as item}
           <svelte:self {item} />
        {/each}
      </ol>
    </details>
  {:else}
    <span class="Level">{item.name}</span>
  {/if}
</li>