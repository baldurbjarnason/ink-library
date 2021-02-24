<script>
  import IcoNotebook from "../../img/IcoNotebook.svelte";
  import HighlightSearch from "./HighlightSearch.svelte";
  import HighlightTextButton from "./HighlightTextButton.svelte";
  export let notebooks = [];
  export let selectedNotebooks = [];
  export let colour = { name: "colour1" };
  export let noteBookMenu;
  export let create = () => {};
  let term = "";
  let availableNotebooks = notebooks;
  $: if (term) {
    availableNotebooks = notebooks.filter((notebook) =>
      notebook.name.includes(term.toLowerCase())
    );
  } else {
    availableNotebooks = notebooks;
  }
</script>

<style>
  details {
    position: relative;
    margin: 0;
    display: flex;
    align-items: center;
  }
  details-menu {
    display: grid;
    position: absolute;
    right: 0;
    border-radius: 10px;
    background-color: white;
    padding: 0.25rem;
    border: 0.698246px solid var(--toolbar-colour, #dddddd);
    box-sizing: border-box;
    box-shadow: 2.09474px 1.39649px 6.98246px rgba(0, 0, 0, 0.1);
    border-radius: 10.4737px 3.49123px 10.4737px 10.4737px;
    grid-template-columns: max-content;
  }
  label {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 12px;
    padding: 0.25rem 1rem;
    font-weight: 600;
    position: relative;
  }
  label :global(svg) {
    color: var(--toolbar-text, #000);
    margin-right: 0.5rem;
    width: 16px;
    background-color: var(--toolbar-colour);
    border-radius: 100%;
    height: 16px;
    padding: 3px;
  }
  label,
  input,
  summary {
    pointer-events: all;
  }
  summary {
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: inline-block;
    background-color: white;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2213%22%20height%3D%228%22%20viewBox%3D%220%200%2013%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6.5%208L0.00480908%200.5L12.9952%200.500001L6.5%208Z%22%20fill%3D%22%23002230%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(180deg, transparent 0, transparent);
    background-repeat: no-repeat, repeat;
    background-position: right 0.125em top 60%, 0 0;
    background-size: 8px auto, 100%;
    padding-right: 1rem;
  }
  summary:hover,
  summary:link:hover,
  summary:link:visited:hover,
  summary:visited:hover,
  summary:link:visited:hover {
    color: var(--hover) !important;
  }
  label span {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
  }
  label input[type="checkbox"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    padding: 0;
    margin: 0;
  }
  .Search {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding: 0.45rem 1rem 0.25rem;
  }
</style>

<svelte:window
  on:click={(event) => {
    if (!event.target.closest('details.notebooks') || event.target.closest('label[role="menuitemcheckbox"]')) {
      noteBookMenu.open = false;
    }
  }} />

<details class="notebooks {colour.name}" bind:this={noteBookMenu}>
  <summary>Notebooks</summary>
  <details-menu role="menu">
    <HighlightSearch bind:term />
    {#if term}
      <div class="Search">
        <span>&ldquo;{term}&rdquo;</span>
        {#if !availableNotebooks.find((item) => item.name === term.toLowerCase())}
          <HighlightTextButton
            click={() => {
              create(term);
              term = '';
              noteBookMenu.open = false;
            }}>
            Create
          </HighlightTextButton>
        {:else}
          <span>&nbsp;</span>
        {/if}
      </div>
    {/if}
    {#if availableNotebooks && selectedNotebooks}
      {#each availableNotebooks as notebook}
        <label tabindex="0" role="menuitemcheckbox">
          <input
            bind:group={selectedNotebooks}
            type="checkbox"
            value={notebook}
            class="visually-hidden" />
          <span class={notebook.name}>
            <IcoNotebook />
            {notebook.name}
          </span>
        </label>
      {/each}
    {/if}
  </details-menu>
</details>
