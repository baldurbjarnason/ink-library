import { interval } from "./interval.js";
import { online } from "./online.js";
import { throttledVisible } from "./visible.js";
import { writable, derived } from "svelte/store";
import { paths } from "./refresh.js";

export function web(pathOrStore, config = {}) {
  const fetchUtility = url => window.fetch(url).then(r => r.json());
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
  let stores = [getPathStore(pathOrStore), online];
  // Check focus
  if (!revalidateOnFocus) {
    stores = stores.concat(writable(true));
  } else {
    stores = stores.concat(throttledVisible(focusThrottleInterval));
  }
  // Check reconnect
  if (!revalidateOnReconnect) {
    stores = stores.concat(writable(true));
  } else {
    stores = stores.concat(online);
  }
  // check refresh
  if (refreshInterval !== 0) {
    stores = stores.concat(interval(refreshInterval));
  } else {
    stores = stores.concat(writable(true));
  }
  return derived(
    stores,
    ([$path, $visible, $online, $refresh], set) => {
      // If we don't have a path, return and leave the store unchanged.
      if (!$path.path) return
      if (($visible || refreshWhenHidden) && ($online || refreshWhenOffline)) {
        // Todo: Links support. Default fetcher should return a {data, links} object.
        // Todo: Should prime with cached data if that is provided and delay first fetch.
        fetcher($path.path)
          .then(data => {
            set({
              data,
              error: null
            });
          })
          .catch(error => {
            set({
              data: null,
              error
            });
          });
      }
    },
    {data: initialData, error: null}
  );
}

const cache = new Map()
export function cachedWeb (pathOrStore, config) {
  if (cache.get(pathOrStore)) {
    return cache.get(pathOrStore)
  } else {
    const store = web(pathOrStore, config)
    cache.set(pathOrStore, store)
    return store
  }
}

function getPathStore(pathOrStore) {
  let path;
  if (pathOrStore.subscribe) {
    path = pathOrStore;
  } else {
    path = writable(pathOrStore);
  }
  return derived([path, paths], ([$path, $paths]) => {
    const update = $paths.get($path) || Date.now();
    return { path: $path, update };
  });
}
