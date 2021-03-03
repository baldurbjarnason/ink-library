<script context="module">
  export async function preload({ params, query, path }) {
    const res = await this.fetch(`/api/sources/${params.id}`);
    const source = await res.json();
    if (source.readingOrder[0] && source.readingOrder[0].url) {
      return this.redirect(302, `${path}/${source.readingOrder[0].url}`);
    } else if (source._processing) {
      return { source };
    } else if (source._unsupported) {
      return this.redirect(302, `${path}/unsupported`);
    } else {
      this.error(501, "Not Implemented");
    }
  }
</script>

<script>
  import { get } from "../../../../../state/web";
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import { title } from "../../../../stores/title.js";
  export let source;
  let updated;
  onMount(() => {
    updated = get(`/api/sources/${source.shortId}`, { refreshInterval: 2000 });
  });
  $: if ($updated && !$updated._processing && $updated.readingOrder[0].url) {
    goto(
      `/sources/${source.shortId}/${source.json.storageId}/${$updated.readingOrder[0].url}`,
      { replaceState: true }
    );
  }
  if (source.name) {
    $title = source.name + " - Rebus Ink";
  }
</script>

<style>
  .Processing {
    grid-row: 2 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 25%;
    min-height: 100vh;
  }
</style>

<div class="Processing">Processing...</div>

<!-- <pre><code>
  {JSON.stringify($updated, null, 4)}
</code></pre> -->
