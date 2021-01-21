<!-- <script context="module">
	export async function preload({params, query, path}) {
    const res = await this.fetch(`/api/read/${params.id}/${params.storage}/${params.chapter.join("/")}`);
    const {annotations, contents, resource, toc, book} = await res.json()
    
		return {annotations, contents, resource, toc, source: book, path}
  }
  // sources/35h7hYmpcEEWy3Bki6SJGc-2668bcf447/5f8AUbc6ijW18A26oBijLM
  // http://localhost:3000/library/all/all/35h7hYmpcEEWy3Bki6SJGc-2668bcf447/OEBPS/front-matter-001-introduction.xhtml
</script> -->

<script>
	import { onMount } from 'svelte';
  let Source;

  onMount(async () => {
    const module = await import('../../../../components/source/Source.svelte');
    Source = module.default;
  });
  // export let annotations = []
  // export let contents = {}
  // export let resource = {}
  // export let toc = {}
  // export let source = {}
  // export let path = ""
</script>

<svelte:component this={Source} />