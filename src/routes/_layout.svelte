<script>
  import { library as libraryStore } from '../stores';
	import Nav from '../components/Nav.svelte';
	import Sidebar from '../components/Sidebar.svelte';
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  export let collections;
  export let library;
  export let segment;
  let query
  let params
  $: if ($page) {
    query = $page.query;
    params = Object.assign({}, $page.params);
    if (segment) {
      params.segment = segment
    } else {
      params.segment = 'front'
    }
  }
  $: if (library) {
    libraryStore.set(library)
  }
</script>

<script context="module">
	export async function preload(page, session) {
    let collections
    let library
    if (page.path.startsWith('/library')) {
      try {
        const res = await this.fetch(`/api/collections`);
        collections = await res.json();
        let url
        if (page.query) {
          url = `/api/library?${new URLSearchParams(page.query).toString()}`
        } else {
          url = `/api/library`
        }
        const libraryResult = await this.fetch(url)
        library = await libraryResult.json()
      } catch {
        collections = {}
        library = {}
      }
    }
		return { collections, library };
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

<main class="grid">
<Nav {params} />
<Sidebar {params} {collections} />

<div class="content {params.workspace}">
	<slot></slot>
</div>
</main>