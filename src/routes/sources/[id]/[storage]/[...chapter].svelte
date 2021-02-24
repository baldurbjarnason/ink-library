<script context="module">
  export async function preload({ params, query, path }) {
    const res = await this.fetch(
      `/api/read/${params.id}/${params.storage}/${params.chapter.join("/")}`
    );
    if (!res.ok) {
      return this.error(res.status, res.statusText);
    }
    const chapter = await res.json();
    const sourceRes = await this.fetch(`/api/sources/${params.id}`);
    const source = await sourceRes.json();
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
