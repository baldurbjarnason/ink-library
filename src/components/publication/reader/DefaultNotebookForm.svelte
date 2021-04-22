<script>
    import {
      defaultNotebook
    } from "../../../stores/notebooks";
    import { notebooks$ } from "../../../../state/state";

    import AutocompleteInput from "../../widgets/AutocompleteInput.svelte";
    export let dark = false;
    let items;
    $: items = $notebooks$ ? $notebooks$.items : [];
    function change(input, value) {
        const newNotebook = items.find(notebook => notebook.name === value.value)
        $defaultNotebook = newNotebook
    }

  </script>
  
  <style>
    div {
      position: relative;
    }
    .DefaultNotebook {
      z-index: 300;
    }

  </style>
  
  <!-- markup (zero or more items) goes here -->
  <div class="DefaultNotebook">
      <div>
        <AutocompleteInput
          placeholder="Default notebook"
          {dark}
          name="new-notebooks"
          value={$defaultNotebook ? $defaultNotebook.name : ''}
          list={items.map(item => item.name)}
          {change}>
        </AutocompleteInput>
      </div>
  </div>
  
  