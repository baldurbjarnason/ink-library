<script context="module">
	export async function preload({params, query, path}) {
    const res = await this.fetch(`/api/sources/${params.id}`);
    const source = await res.json()
    // if (source.json.storageId) {
    //   return this.redirect(302, `/sources/${params.id}/${source.json.storageId}`)
    // } else {
    //   return {source}
    // }
    return {source}
  }
</script>

<script>
  import EmptySource from '../../../components/source/source-empty/Empty.svelte'
  import {stores} from "@sapper/app";
  export let source
  const {page} = stores()
</script>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->
<EmptySource page={$page} {source} />