<script>
  import { getContext } from "svelte";

  export let path;
  export let item;
  let selected;
  $: if (path === item.url) {
    selected = true;
  } else {
    console.log(item)
    selected = false;
  }
  const url = getContext("url");
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
    background-color: transparent;
  }
  details > summary::-webkit-details-marker {
    display: none;
  }
  .ContentsItem {
    position: relative;
  }
  li {
    padding: calc(var(--base) * 0.25) 0;
    margin: 0;
  }
  .Level {
    display: block;
    padding: 0.25rem;
  }
  .selected::before {
    content: "";
    background-color: #005173;
    width: 6px;
    height: 6px;
    transform: rotate(45deg) translateY(-3px);
    position: absolute;
    top: 50%;
    left: 0;
  }
  .ContentsItem a {
    text-decoration: none;
    color: #333;
    padding-left: 1rem;
  }
  .ContentsItem a:hover,
  .ContentsItem a:focus {
    color: var(--link);
    text-decoration: underline;
  }
  .selected a {
    color: #005173;
  }
</style>

<li class:selected class="ContentsItem">
  {#if item.children && item.children.length}
    <details open>
      <summary>
        {#if item.children[0] && item.children[0].url}
        <span class="Level"><a href={item.url ? url(item.url) : url(item.children[0].url)}>
        {item.label}</a></span>
        {:else}
        <span class="Level">{item.label}</span>
        {/if}
      </summary>
      <ol>
        {#each item.children as item}
          <svelte:self {item} {path} />
        {/each}
      </ol>
    </details>
  {:else if item.url}
    <a href={url(item.url)} class="Level">{item.label}</a>
  {:else}
    <span class="Level">{item.label}</span>
  {/if}
</li>
