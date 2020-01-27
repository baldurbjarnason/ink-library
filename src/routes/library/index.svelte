<script>
  import Workspace from '../../components/Workspace.svelte';
  import { library } from '../../stores';
  import { stores } from "@sapper/app";
  const { page, session } = stores();
</script>

<Workspace></Workspace>