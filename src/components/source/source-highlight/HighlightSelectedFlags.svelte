<script>
  import { assignIco } from "../source-margin/assignIco.js";
  import IcoNotebook from "../../img/IcoNotebook.svelte";
  export let notebooks;
  export let flags;
</script>

<style>
  /* your styles go here */
  .Flags {
    display: flex;
    flex-direction: row;
    padding-top: 0.5rem;
    flex-wrap: wrap;
  }
  .Flag {
    margin-right: 0.25rem;
    margin-top: 0.5rem;
    background: var(--toolbar-colour, #ddd);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0.125rem 0.5rem;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
  .Flag :global(svg) {
    color: var(--toolbar-text, #000);
    margin-right: 0.5rem;
    width: 16px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 100%;
    height: 16px;
    padding: 3px;
  }
</style>

<div class="Flags">
  {#if notebooks}
    {#each notebooks as notebook}
      <div class="Flag Item">
        <IcoNotebook />
        <span class={notebook.name}>{notebook.name}</span>
      </div>
    {/each}
  {/if}
  {#if flags}
    {#each flags as flag}
      <div class="Flag Item">
        <svelte:component this={assignIco(flag.name)} />
        <span class={flag.name}>
          {flag.name[0].toUpperCase()}{flag.name.slice(1)}
        </span>
      </div>
    {/each}
  {/if}
</div>
