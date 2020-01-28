<script>
  import { library as libraryStore, page as pageStore } from '../stores';
	import Nav from '../components/Nav.svelte';
	import Sidebar from '../components/Sidebar.svelte';
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  let collections;
  export let segment;
  let query
  let params
  $: if ($session && process.browser) {
    const res = fetch(`/api/collections`)
      .then(res => res.json())
      .then(result => {
        collections = result
      })
      .catch(err => {
        console.error(err)
        collections = []
      })
  }
  $: if ($page) {
    pageStore.set($page)
    query = $page.query;
    params = Object.assign({}, $page.params);
    if (segment) {
      params.segment = segment
    } else {
      params.segment = 'front'
    }
  }
</script>

<style global>
  @import '../../styles/**/*.css';
	main, .content {
		position: relative;
		padding: 0;
		margin: 0;
		box-sizing: border-box;
  }
  .content {
    padding: calc(var(--base) * 2);
    padding-top: 0;
  }
  .grid {
    display: grid;
    grid-template-columns: calc(var(--base) * 4) calc(var(--base) * 14) 1fr;
    min-height: 100vh;
  }
  :root {
    --workspace-color: var(--all-workspace);
  }
  .content.personal {
    --workspace-color: var(--personal-workspace);
  }
  .content.public {
    --workspace-color: var(--public-workspace);
  }
  .content.teaching {
    --workspace-color: var(--teaching-workspace);
  }
  .content.research {
    --workspace-color: var(--research-workspace);
  }
</style>


<svelte:head>
  <title>Library – {params.workspace || 'all'} – Rebus Ink</title>
</svelte:head>

<main class="grid">
<Nav {params} />
<Sidebar {params} {collections} />

<div class="content {params.workspace}">
	<slot></slot>
</div>
</main>