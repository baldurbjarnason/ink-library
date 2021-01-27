import { fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {page} from './page'

// These modules are _only_ for client side use. They need to be set up in an onMount somewhere (possibly added to the context) and should not be used for server side rendering.


// We need to make sure that, when we navigate, the library, notes, and notebooks stores are all refreshed when appropriate. So we call refreshAll on every navigation. That function should then conditionally refresh the collection stores as needed.
export function createRefresher () {
  return page().pipe(
    map(({path}) => {
      refreshAll(path)
      return path
    })
  )
}
export function refresh(path) {
  const refreshPathEvent = new window.CustomEvent(
    "refresh-path", 
    {
      detail: {
        path
      },
      bubbles: true,
      cancelable: true
    }
  );
  document.dispatchEvent(refreshPathEvent)
}

export function refreshedPaths (path: string): Observable<string> {
  return fromEvent<CustomEvent>(document, "refresh-path")
  .pipe(map(function (ev: CustomEvent) {
    return ev.detail.path
  }),
  startWith(path))
}

// This needs to be conditional on the path so we don't refresh everything on every nav. Reader only needs to be updated when specifically refreshed.
// Ideally the state urls should match the front end routes, just with an 'api' prefix: /source/id/storage/path -> /api/source/id/storage/path, /library -> /api/library, /notes -> /api/notes
export function refreshAll(path) {
  const paths = ["/api/library", "/api/notebooks", "/api/notes", "/api/tags"]
  for (const url of paths) {
    refresh(url)
  }
  return refresh(path)
}