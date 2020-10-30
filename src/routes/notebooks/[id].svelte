<script>
  import Notebooks from "../../components/Notebooks.svelte";
  import { library } from "../../stores";
  import { stores } from "@sapper/app";
  const { page, session } = stores();
</script>

<Notebooks id={$page.params.id} />
