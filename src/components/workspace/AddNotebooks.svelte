<script>
    import {
      addedCollections,
      notebooks,
      addedNotebooks,
      //addingNotebooks
    } from "../../stores";
    import Closer from "../widgets/Closer.svelte";
    import AutocompleteInput from "../widgets/AutocompleteInput.svelte";
    export let dark = false;
    let items;
    $: items = $notebooks ? $notebooks.items : [];


    function change(input, value) {
        const newNotebook = items.find(notebook => notebook.name === value.value)
        $addedNotebooks = Array.from(new Set($addedNotebooks.concat(newNotebook)));
        input.value = "";
    }
    function removeTag(event) {
      const removedNotebook = event.data.value;
      $addedNotebooks = $addedCollections.filter(
        (notebook) => notebook.name !== removedNotebook
      );
    }

  </script>
  
  <style>
    div {
      position: relative;
    }
    .Collection {
      width: auto;
      float: left;
      font-size: 0.7rem;
      padding: calc(var(--base) * 0.25);
      margin-right: calc(var(--base) * 0.25);
      margin-bottom: calc(var(--base) * 0.25);
      border-radius: 5px;
      color: black;
      background-color: white;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
    }
    .Tags {
      grid-column: 1;
      grid-gap: calc(var(--base) * 0.25);
      grid-template-columns: repeat(auto-fit, minmax(100px, max-content));
    }
    .dark .Collection {
      color: white;
      background-color: rgba(255, 255, 255, 0.2);
    }
  </style>
  
  <!-- markup (zero or more items) goes here -->

  <div>
    {#if $notebooks.type === 'loading'}
        <div class="Loading" >loading????</div>
    {:else}
    {#if $addedNotebooks.length < 1}
    <div>
        <AutocompleteInput
          placeholder="Notebook Name"
          {dark}
          name="new-notebooks"
          list={items.map(item => item.name)}
          {change}>
          Assign notebooks
        </AutocompleteInput>
      </div>
      {:else}
      <div class="Wide Tags" class:dark>
        <div class="LabelText svelte-rmvtnc">Assign notebooks</div>
        {#each $addedNotebooks as notebook}
          <span class="Collection">
            {notebook.name}
            <Closer
              {dark}
              value={notebook.value}
              click={removeTag}
              small={true} />
          </span>
        {/each}
      </div>
        {/if}
    {/if}
  </div>
  
  