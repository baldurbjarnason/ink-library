<script>
  import Notebooks from "../../components/Notebooks.svelte";
  import { stores } from "@sapper/app";
  const { page } = stores();
</script>

<Notebooks id={$page.params.id} />
