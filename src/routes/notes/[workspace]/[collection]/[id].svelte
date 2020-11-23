<script>
  import Notes from "../../../../components/Notes.svelte";
  import { stores } from "@sapper/app";
  const { page } = stores();
</script>

<Notes workspace={$page.params.workspace} id={$page.params.id} />
