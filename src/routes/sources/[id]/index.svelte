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
    // need to fall back to the old method here
    const source = await res.json()
    console.log(source)
    if (source.json.storageId) {
      return this.redirect(302, `${path}/${source.json.storageId}`)
    } else {
      return this.redirect(302, `${path}/empty`)
    }
  }
</script>