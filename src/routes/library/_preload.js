export async function preload(page, session) {
  let library
  try {
    const query = Object.assign({}, page.query)
    if (page.params.collection) {
      query.stack = page.params.collection
    } else if (page.params.workspace && page.params.workspace !== 'all') {
      query.workspace = page.params.workspace
    }
    let url
    if (query) {
      url = `/api/library?${new URLSearchParams(query).toString()}`
    } else {
      url = `/api/library`
    }
    const libraryResult = await this.fetch(url)
    library = await libraryResult.json()
  } catch {
    library = {}
  }
  return { library };
}