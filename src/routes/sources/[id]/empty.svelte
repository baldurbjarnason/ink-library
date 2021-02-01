<script context="module">
	export async function preload({params, query, path}, session) {
    let res
    if (session.user.token) {
      const fetch = require('node-fetch')
      res = await fetch(`${process.env.URL}/api/sources/${params.id}`, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      }});
    } else if (!session.user) {
      return this.redirect(302, "/login")
    }
    const source = await res.json()
    console.log(source)
    if (source.json.storageId) {
      return this.redirect(302, `/sources/${params.id}/${source.json.storageId}`)
    } else {
      return {source}
    }
    // return {source}
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
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->
<EmptySource page={$page} {source} />