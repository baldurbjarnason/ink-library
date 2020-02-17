<script>
  import { library as libraryStore, page as pageStore } from '../stores';
	import Nav from '../components/Nav.svelte';
	import Sidebar from '../components/Sidebar.svelte';
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  export let segment;
  let query
  let params
  let publication = false
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
  $: if ($page.params && $page.params.publicationId) {
      publication = true
    } else {
      publication = false
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
  .content.Personal {
    --workspace-color: var(--personal-workspace);
  }
  .content.Public_Scholarships {
    --workspace-color: var(--public-workspace);
  }
  .content.Teaching {
    --workspace-color: var(--teaching-workspace);
  }
  .content.Research {
    --workspace-color: var(--research-workspace);
  }
  .content.publication {
    grid-column: 2 / -1;
  }
</style>


<svelte:head>
  <title>Library – {params.workspace || 'all'} – Rebus Ink</title>
    <meta name="csrftoken" content={$session.csrfToken}>
</svelte:head>

<main class="grid" class:publication>
<Nav {params} />
<Sidebar {params} />

<div class="content {params.workspace}" class:publication>
	<slot></slot>
</div>
</main>