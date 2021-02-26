<script>
  import { assignIco } from "../source-margin/assignIco.js";
  import IcoNotebook from "../../img/IcoNotebook.svelte";
  import CloseIcon from "./CloseIcon.svelte";
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
    background: var(--toolbar-background, #ddd);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0.25rem 0.25rem;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    display: grid;
    grid-template-columns: 24px 1fr 24px;
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
        <CloseIcon
          click={() => {
            const index = notebooks.indexOf(notebook);
            if (index !== -1) {
              notebooks = notebooks.filter((old) => {
                return old !== notebook;
              });
            }
          }} />
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
        <CloseIcon
          click={() => {
            const index = flags.indexOf(flag);
            if (index !== -1) {
              flags = flags.filter((old) => {
                return old !== flag;
              });
            }
          }} />
      </div>
    {/each}
  {/if}
</div>
