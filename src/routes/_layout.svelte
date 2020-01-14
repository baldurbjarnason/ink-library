<script>
	import Nav from '../components/Nav.svelte';
	import Sidebar from '../components/Sidebar.svelte';
  import { stores } from "@sapper/app";
  const { page, session } = stores();

  export let segment;
  $: console.log('segment is: ', segment)
  let query
  let params
  $: if ($page) {
    query = $page.query;
    params = $page.params;
  }
</script>

<style global>
  @import '../../styles/**/*.css';
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {query} {params} />
<Sidebar {query} {params} />

<main>
	<slot></slot>
</main>