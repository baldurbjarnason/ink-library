<script>
  import Notes from '../../../../components/Notes.svelte';
  import { library } from '../../../../stores';
  import { stores } from "@sapper/app";
  const { page, session } = stores();
</script>

<Notes workspace={$page.params.workspace} id={$page.params.id}></Notes>