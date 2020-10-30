<script>
  import Profile from "../../components/reader/Profile.svelte";
  import { stores } from "@sapper/app";
  const { page, session } = stores();
</script>

<Profile />
