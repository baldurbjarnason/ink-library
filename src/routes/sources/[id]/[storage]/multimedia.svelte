<script context="module">
import Multimedia from "../../../../components/source/source-multimedia/Multimedia.svelte"
//import { source$, chapter$, sourceNotes$ } from "../../../../../state/state";
import { publication } from "../../../../stores";

</script>

  <div>
    <Multimedia {$publication} />
  </div>
  
  