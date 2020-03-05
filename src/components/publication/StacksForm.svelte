

<script>
  import {publication, refreshPublication, collections, addingStacks, availableStacks, workingStacks, removingStacks} from '../../stores'
  import Closer from '../widgets/Closer.svelte';
  import Input from '../workspace/Input.svelte'
  export let form = undefined
  const spaces = ['Research', 'Public_Scholarships', 'Teaching', 'Personal']
  function getName (name) {
    const space = name.split('/')[0].replace(' ', '_')
    if (spaces.includes(space)) {
      return name.replace(space + '/', '')
    } else {
      return name
    }
  }
  let filteredCollections = []
  $: if ($availableStacks) {
    filteredCollections = Array.from($availableStacks).map(tag => tag.name)
  }
  function removeTag (event) {
    const removed = Array.from($workingStacks).find(tag => tag.name === event.data.value.name)
    if ($addingStacks.has(removed)) {
      const removedSet = new Set($addingStacks)
      removedSet.delete(removed)
      $addingStacks = removedSet
    } else {
      $removingStacks = $removingStacks.add(removed)
    }
  }
  function addTag (addedCollection) {
    if ($removingStacks.has(addedCollection)) {
      const removed = new Set($removingStacks)
      removed.delete(addedCollection)
      $removingStacks = removed
    } else {
      $addingStacks = $addingStacks.add(addedCollection)
    }
  }
  function change (event) {
    if (filteredCollections.includes(event.target.value)) {
      const tag = Array.from($availableStacks).find(tag => tag.name === event.target.value)
      event.target.value = ""
      return addTag(tag)
    }
  }
  function submit (event) {
    event.preventDefault();
  }
</script>

<style>
  .Collection {
    width: 100%;
    font-size: 0.7rem;
    padding: calc(var(--base) * 0.25);
    margin-right: calc(var(--base) * 0.25);
    border-radius: 5px;
    color: black;
    background-color: white;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

<!-- What this needs to do:
Present a list of existing components in the same style as the add components widget.

Followed by an add component form.

Then when you hit save, it compares the list in the widget with the the pre-existing list of stacks to generate an edit list: stacks to add, stacks to remove. Then it makes a request for each one to add or remove.
 -->

<form id="stacksform" class="StacksForm" on:submit={submit} bind:this={form}>
  <Input placeholder="Collection Name" name="new-collections" list="collections-datalist" {change}><span class="visually-hidden">Add collection:</span></Input>
    <datalist id="collections-datalist">
      {#each filteredCollections as collection}
        <option value="{collection}">
      {/each}
    </datalist>
  {#each Array.from($workingStacks) as tag, index}
    <span class="Collection"><span class="linkText">
      {getName(tag.name)}
      <input type="hidden" value={tag.id} name="stack[{index}]">
      <Closer value={tag} click={removeTag} small={true} />
    </span></span>
  {/each}
  {#each Array.from($removingStacks) as tag, index}
      <input type="hidden" value={tag.id} name="removedStack[{index}]">
  {/each}
  
  
</form>