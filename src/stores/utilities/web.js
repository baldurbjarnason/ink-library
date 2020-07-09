import {interval} from './interval.js';
import {online} from './online.js';
import {throttledVisible} from './visible.js';
import { writable, derived } from 'svelte/store';
import {paths} from './refresh.js';

export function web (pathOrStore, config) {
  const {
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    refreshInterval = 0,
    refreshWhenHidden = false,
    refreshWhenOffline = false,
    focusThrottleInterval = 5000,
    fetcher = fetchUtility,
    initialData
  } = config;
  let stores = [
    getPathStore(pathOrStore),
    online
  ]
  // Check focus
  if (!revalidateOnFocus) {
    stores = stores.concat(writable(true))
  } else {
    stores = stores.concat(throttledVisible(focusThrottleInterval))
  }
  // Check reconnect
  if (!revalidateOnReconnect) {
    stores = stores.concat(writable(true))
  } else {
    stores = stores.concat(online)
  }
  // check refresh
  if (refreshInterval !== 0) {
    stores = stores.concat(interval(refreshInterval))
  } else {
    stores = stores.concat(writable(true))
  }
  return derived(stores, ([$path, $visible, $online, $refresh], set) => {
    if (($visible || refreshWhenHidden) && ($online || refreshWhenOffline)) {
      // Default fetcher should return a {data, links} object.
      // TODO: if `links: true` then you expect either a links prop or a HAL+JSON `data._links` prop. Then we could do a `rel` utility that creates a derived web store for a particular rel link from a resource. -> Turns the web store into a path store.
      // rel utility can also take a `document` object as a link rel source.
      return fetcher($path.path)
        .then(data => {
          set({
            data,
            error: null
          })
        })
        .catch(error => {
          set({
            data: null,
            error
          })
        })
    }
  }, initialData)
}

const fetchUtility = url => window.fetch(url).then(r => r.json())

function getPathStore (pathOrStore) {
  let path
  if (pathOrStore.subscribe) {
    path = pathOrStore
  } else {
    path = writable(pathOrStore)
  }
  return derived([path, paths], ([$path, $paths]) => {
    const update = $paths.get($path) || Date.now()
    return {path: $path, update}
  })
}