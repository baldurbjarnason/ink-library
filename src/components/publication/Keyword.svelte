<script>
  export let keyword;
</script>

<style>
  .Keyword {
    color: white;
    background-color: var(--workspace-color);
    border-radius: 50px;
    padding: calc(var(--base) * 0.25) calc(var(--base) * 0.5);
    font-size: 0.7rem;
    white-space: nowrap;
    display: inline-flex;
    margin-right: calc(var(--base) * 0.25);
    margin-bottom: calc(var(--base) * 0.25);
    height: calc(var(--base) * 0.5 + 1rem);
  }
</style>

<span class="Keyword">{keyword}</span>
