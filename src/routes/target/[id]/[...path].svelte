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
    if (source.json.storageId) {
      return this.redirect(302, `/sources/${params.id}/${source.json.storageId}/${params.path.join("/")}`)
    } else {
      return this.redirect(302, `${path}/empty`)
    }
  }
</script>