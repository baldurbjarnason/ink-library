<script>
	import Nav from '../components/Nav.svelte';
	import Sidebar from '../components/Sidebar.svelte';
  import { stores } from "@sapper/app";
  const { page, session } = stores();

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
    grid-template-columns: calc(var(--base) * 4) calc(var(--base) * 12) 1fr;
    min-height: 100vh;
  }
</style>

<div class="grid">
<Nav {params} />
<Sidebar {query} {params} />

<main>
	<slot></slot>
</main>
</div>