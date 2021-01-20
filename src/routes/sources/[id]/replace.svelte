<script context="module">
	export async function preload({params, query, path}) {
    const res = await this.fetch(`/api/sources/${params.id}`);
    const source = await res.json()
    return {source}
  }
</script>

<script>
  import EmptySource from '../../../components/source/source-empty/Empty.svelte'
  import {title} from '../../../stores/title.js'
  import {stores} from "@sapper/app";
  export let source
  const {page} = stores()
  if (source.name) {
    $title = source.name + " - Rebus Ink"
  }
</script>

<style>
</style>

<EmptySource page={$page} {source} />