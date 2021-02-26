<script context="module">
  export async function preload({ params, query, path }) {
    const requests = await Promise.all([
      this.fetch(
        `/api/read/${params.id}/${params.storage}/${params.chapter.join("/")}`
      ),
      this.fetch(`/api/sources/${params.id}?skipStorage=true`),
    ]);
    if (!requests[0].ok) {
      return this.error(requests[0].status, requests[0].statusText);
    }
    if (!requests[1].ok) {
      return this.error(requests[1].status, requests[1].statusText);
    }
    const [chapter, source] = await Promise.all([
      requests[0].json(),
      requests[1].json(),
    ]);
    return { chapter, source };
  }
</script>

<script>
  import { onMount } from "svelte";
  export let chapter;
  export let source;
  let Source;
  // console.log("in route");
  onMount(async () => {
    const module = await import("../../../../components/source/Source.svelte");
    Source = module.default;
  });
</script>

<svelte:component this={Source} {chapter} {source} />
