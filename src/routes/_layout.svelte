<script>
	import Nav from '../components/Nav.svelte';
	import Sidebar from '../components/Sidebar.svelte';
  import { stores } from "@sapper/app";
  const { page, session } = stores();
  export let data;
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
</script>

<script context="module">
	export async function preload(page, session) {
    let data
    if (page.path.startsWith('/library')) {
      try {
        const res = await this.fetch(`/api/collections`);
        data = await res.json();
      } catch {
        data = {}
      }
    }
		return { data };
	}
</script>
<style global>
  @import '../../styles/**/*.css';
	main {
		position: relative;
		background-color: white;
		padding: 2em;
		margin: 0;
		box-sizing: border-box;
  }
  .grid {
    display: grid;
    grid-template-columns: calc(var(--base) * 4) calc(var(--base) * 14) 1fr;
    min-height: 100vh;
  }
</style>

<div class="grid">
<Nav {params} />
<Sidebar {params} {data} />

<main>
	<slot></slot>
</main>
</div>