<script context="module">
  export async function preload({ params, query, path }) {
    const res = await this.fetch(`/api/sources/${params.id}`);
    const source = await res.json();
    if (!source || source.statusCode === 404) {
      return this.error(404, "This source doesn't exist or has been deleted");
    } else if (source.json.storageId) {
      return this.redirect(
        302,
        `/sources/${params.id}/${source.json.storageId}/${params.path.join(
          "/"
        )}`
      );
    } else {
      return this.redirect(302, `${path}/empty`);
    }
  }
</script>
