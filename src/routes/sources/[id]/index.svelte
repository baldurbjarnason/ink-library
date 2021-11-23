<script context="module">
  export async function preload({ params, query, path }) {
    const res = await this.fetch(`/api/sources/${params.id}`);
    const source = await res.json();
    if (!source || source.statusCode === 404) {
      return this.error(404, "This source doesn't exist or has been deleted");
    } else if (source.json.storageId) {
      return this.redirect(302, `${path}/${source.json.storageId}`);
    } else if (source.links && source.links[0] && source.links[0].url && 
    (source.links[0].url.startsWith('https://youtu') || source.links[0].url.startsWith('https://www.youtu'))) {
      return this.redirect(302, `${path}/multimedia`)
    } else {
      return this.redirect(302, `${path}/empty`);
    }
  }
</script>
