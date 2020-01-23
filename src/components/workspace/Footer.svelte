<script>
  import {library, selectedItems} from '../../stores'
  import RiskyButton from '../RiskyButton.svelte'
  import SecondaryButton from '../SecondaryButton.svelte'
  import Button from '../Button.svelte'
  import TypeSelect from './TypeSelect.svelte'
  import ChooseWorkspaces from './ChooseWorkspaces.svelte'
  import Input from './Input.svelte'
  let editing = false
</script>

<style>
  .FooterButtons {
    display: grid;
    grid-gap: calc(var(--base)* 2);
    grid-template-columns: 1fr 1fr;
  }
  .FooterNumber {
    font-size: 1rem;
    font-style: italic;
    color: var(--medium);
    font-weight: 300;
  }
  .Footer {
    display: flex;
    justify-content: space-between;
    padding: var(--base) calc(var(--base)* 2);
    align-items: center;
    font-size: var(--item-font-size);
    position: sticky;
    bottom: 0;
    background-color: var(--main-background-color);
    margin: 0 calc(var(--base)* -2);
    box-shadow: 0px -7px 15px rgba(0, 0, 0, 0.1);
  }
  .Footer.editing {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--base);
  }
</style>

<div class="Footer" class:editing>
  {#if editing}
    <div><Input placeholder="#collection01, #collection02">Add collections:</Input></div>
    <div><Input placeholder="First Author, Second Author">Add authors:</Input></div>
    <div><TypeSelect>Change type:</TypeSelect></div>
    <div><ChooseWorkspaces>Change workspace:</ChooseWorkspaces></div>
      <span class="FooterNumber">
        {$selectedItems.size} {#if $selectedItems.size === 1}
           item
        {:else}
          items
        {/if} selected
      </span> <span class="FooterButtons"><SecondaryButton click={() => {
        editing = false
      }}>Cancel</SecondaryButton> <Button click={() => {
        editing = false
      }}>Save</Button></span>
  {:else}
      <span class="FooterNumber">
        {$selectedItems.size} {#if $selectedItems.size === 1}
           item
        {:else}
          items
        {/if} selected
      </span> <span class="FooterButtons"><RiskyButton>Delete</RiskyButton> <Button click={() => {
        editing = true
      }}>Edit</Button></span>
  {/if}
</div>