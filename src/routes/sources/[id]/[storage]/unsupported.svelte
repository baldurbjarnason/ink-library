<script>
  import TitleBar from "./_TitleBar.svelte"
  import {stores} from "@sapper/app";
  import {title} from '../../../../stores/title.js'
  const {page} = stores()
  let base
  let download
  let media
  $: if ($page.params.storage && $page.params.id) {
    base = `sources/${$page.params.id}/${$page.params.storage}`
    download = `/api/download/${$page.params.storage}`;
    media = `/api/stored/${$page.params.storage}`
  } else {
    base = ""
    download = "";
    media = ""
  }
  export let source
  if (source.name) {
    $title = source.name + " - Rebus Ink"
  }
</script>
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
    if (source.readingOrder[0] && source.readingOrder[0].url) {
      return this.redirect(302, `${path}/${source.readingOrder[0].url}`)
    } else if (source._processing) {
      return this.redirect(302, `${path}/processing`)
    } else if (source._unsupported) {
      return {source}
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


<div class="MainUnsupported">
  
  <TitleBar name={source.name} returnLink="/library/all/all" />
  <div class="Processing">
    <p>
      Ink doesn't support displaying this file but you can
      <a href={download}>download it.</a>.
    </p>
    <p>
      Or, you could <a href="/sources/{source.shortId}/replace">replace it with a different file.</a>
    </p>
  </div>
</div>