<script context="module">
	export async function preload({params, query, path}, session) {
    console.log(session, process.browser)
    let res
    if (session.user.token) {
      console.log("server fetching")
      const fetch = require('node-fetch')
      res = await fetch(`${process.env.API_SERVER}sources/${params.id}`, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      }});
    }
    console.log(res)
    const source = await res.json()
    console.log(source)
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