<script>
  import {collections, addingWorkspace, addedCollections} from '../../stores'
  import Closer from '../Closer.svelte';
  import Input from './Input.svelte'
  export let dark = false;
  let currentCollections = []
  let filteredCollections = $collections.map(collection => collection.name)
  $: if ($addingWorkspace) {
    if ($addingWorkspace !== 'all') {
      filteredCollections = $collections.map(collection => collection.name)
        .filter(collection => collection.startsWith($addingWorkspace))
      currentCollections = currentCollections.filter(collection => collection.startsWith($addingWorkspace))
    } else {
      filteredCollections = $collections.map(collection => collection.name)
    }
  }
  function change (event) {
    if (filteredCollections.includes(event.target.value)) {
      currentCollections = Array.from(new Set(currentCollections.concat(event.target.value)))
      event.target.value = ""
      $addedCollections = currentCollections.map(name => collectionId(name))
    }
  }
  function removeTag (event) {
    const removedCollection = event.data.value
    currentCollections = currentCollections.filter(collection => collection !== removedCollection)
    $addedCollections = currentCollections.map(name => collectionId(name))
  }
  function collectionId (name) {
    return $collections.find(tag => tag.name === name).id
  }
</script>

<style>
  .Tag {
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
  }
  .Tags {
    display: grid;
    grid-gap: calc(var(--base) * 0.25);
    grid-template-columns: repeat(auto-fit,minmax(100px,max-content));
  }
  .dark .Tag{
    color: white;
    background-color: rgba(255,255,255, 0.2);
  }
</style>

<!-- markup (zero or more items) goes here -->
  <div><Input placeholder="Collection Name" {dark} name="new-collections" list="collections-datalist" {change}>Add collection:</Input>
  <datalist id="collections-datalist">
  {#each filteredCollections as collection}
    <option value="{collection}">
  {/each}
  </datalist>
  </div>
  <div class="Wide Tags" class:dark>
  {#each currentCollections as collection, i}
    <span class="Tag">
        {collection} <Closer {dark} value={collection} click={removeTag} small={true} />
    </span>
  {/each}
  </div>