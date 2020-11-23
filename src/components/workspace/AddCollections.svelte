<script>
  import {
    collections,
    addingWorkspace,
    addedCollections,
    addedWorkspaces,
    workspaces
  } from "../../stores";
  import Closer from "../widgets/Closer.svelte";
  import AutocompleteInput from "../widgets/AutocompleteInput.svelte";
  export let dark = false;
  let filteredCollections = $collections.map(collection => collection.name);
  $: if ($addingWorkspace) {
    if ($addingWorkspace !== "all") {
      filteredCollections = $collections.map(collection => {
        return {
          label: getName(collection.name),
          value: collection.id
        };
      });
    } else {
      filteredCollections = $collections.map(collection => {
        return {
          label: getName(collection.name),
          value: collection.id
        };
      });
    }
  }
  $: if ($addedCollections) {
    filteredCollections = filteredCollections.filter(collection => {
      return !$addedCollections
        .map(coll => coll.value)
        .includes(collection.value);
    });
  }
  const spaces = ["Research", "Public_Scholarships", "Teaching", "Personal"];
  function getWorkspace(name) {
    const space = name.split("/")[0].replace(" ", "_");
    if (spaces.includes(space)) {
      return space.toLowerCase();
    } else {
      return "";
    }
  }
  function getName(label) {
    const space = getWorkspace(label);
    if (space) {
      return label.split("/")[1];
    } else {
      return label;
    }
  }
  // When addedCollections changes, need to update addedWorkspaces which is added to the request later on.
  function ids(arr) {
    return arr.map(item => item.value);
  }
  function change(input, value) {
    if (value && ids(filteredCollections).includes(value.value)) {
      $addedCollections = Array.from(new Set($addedCollections.concat(value)));
      input.value = "";
      $addedWorkspaces = getWorkspaces();
    }
  }
  function removeTag(event) {
    const removedCollection = event.data.value;
    $addedCollections = $addedCollections.filter(
      collection => collection.value !== removedCollection
    );
    $addedWorkspaces = getWorkspaces();
  }
  function getCollection(suggestion) {
    return $collections.find(collection => collection.id === suggestion.value);
  }
  function mapCollections(item) {
    const collection = getCollection(item);
    const workspace = getWorkspace(collection.name);
    return $workspaces.find(item => getWorkspace(item.name) === workspace);
  }
  function getWorkspaces() {
    return Array.from(
      new Set($addedCollections.map(mapCollections).filter(item => item))
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
{#if $addedCollections.length < 1}
  <div>
    <AutocompleteInput
      placeholder="Stack Name"
      {dark}
      name="new-collections"
      list={filteredCollections}
      {change}>
      Assign stacks
    </AutocompleteInput>
  </div>
{:else}
  <div class="Wide Tags" class:dark>
    <div class="LabelText svelte-rmvtnc">Assign stacks</div>
    {#each $addedCollections as collection}
      <span class="Collection">
        {collection.label}
        <Closer
          {dark}
          value={collection.value}
          click={removeTag}
          small={true} />
      </span>
    {/each}
  </div>
{/if}
