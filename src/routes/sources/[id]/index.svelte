<script context="module">
	export async function preload({params, query, path}) {
    const res = await this.fetch(`/api/sources/${params.id}`);
    const source = await res.json()
    console.log(source.json)
    return this.redirect(302, `${path}/${source.json.storageId}`)
		// ...
  }
  // sources/35h7hYmpcEEWy3Bki6SJGc-2668bcf447/5f8AUbc6ijW18A26oBijLM
  // http://localhost:3000/library/all/all/35h7hYmpcEEWy3Bki6SJGc-2668bcf447/OEBPS/front-matter-001-introduction.xhtml
</script>