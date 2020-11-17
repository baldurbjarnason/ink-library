<script>
  import Workspace from "../../../../components/Workspace.svelte";
  import { stores } from "@sapper/app";
  const { page } = stores();
</script>

<Workspace workspace={$page.params.workspace} />
