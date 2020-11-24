<script>
  import Pages from "../../components/Pages.svelte";
  import { stores } from "@sapper/app";
  const { page } = stores();
</script>

<Pages id={$page.params.id} />
