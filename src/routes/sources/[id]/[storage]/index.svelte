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
      return this.redirect(302, `${path}/unsupported`)
    } else {
      this.error(501, "Not Implemented")  
    }
  }
  // sources/35h7hYmpcEEWy3Bki6SJGc-2668bcf447/5f8AUbc6ijW18A26oBijLM
  // http://localhost:3000/library/all/all/35h7hYmpcEEWy3Bki6SJGc-2668bcf447/OEBPS/front-matter-001-introduction.xhtml
</script>