<script>
  import { onMount } from "svelte";
  let Source;
  console.log("in route");
  onMount(async () => {
    const module = await import("../../../../components/source/Source.svelte");
    Source = module.default;
  });
</script>

<svelte:component this={Source} />
