<script context="module">
import Image from "../../../../components/source/source-multimedia/Image.svelte"
//import { source$, chapter$, sourceNotes$ } from "../../../../../state/state";
import { publication } from "../../../../stores";

</script>

  <div>
    <Image {$publication} />
  </div>
  
  