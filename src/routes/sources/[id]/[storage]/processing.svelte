<script>
  import {get} from '../../../../../state/web.ts'
  import {onMount} from 'svelte';
  import { goto } from "@sapper/app";
  export let source
  let updated
  onMount(() => {
    updated = get(`/api/sources/${source.shortId}`, {refreshInterval: 2000})
  });
  $: if ($updated && !$updated._processing && $updated.readingOrder[0].url) {
    goto(`/sources/${source.shortId}/${source.json.storageId}/${$updated.readingOrder[0].url}`)
  }
</script>


<script context="module">
	export async function preload({params, query, path}) {
    const res = await this.fetch(`/api/sources/${params.id}`);
    const source = await res.json()
    if (source.readingOrder[0] && source.readingOrder[0].url) {
      return this.redirect(302, `${path}/${source.readingOrder[0].url}`)
    } else if (source._processing) {
      return {source}
    } else if (source._unsupported) {
      return this.redirect(302, `${path}/unsupported`)
    } else {
      this.error(501, "Not Implemented")  
    }
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