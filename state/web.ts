
import { online } from './online'
import { refreshAll, refreshedPaths } from './refresh'
import {intervalWhenVisible} from './visible'
import { of, combineLatest, BehaviorSubject, interval, Observable } from 'rxjs';
import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

interface WebStoreConfig {
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  refreshInterval?: number;
  refreshWhenHidden?: boolean;
  refreshWhenOffline?: boolean;
  initialData?: any;
  resetData?: any;
}

// Maybe instead of using an observable path we could use a higher order observable to manage paths that switches between web stores.
// Then this observable doesn't need to be multicast, that's done by the higher order observable. 
export function get (path: string, config: WebStoreConfig = {}): Observable<any> {
  const {
    // revalidateOnFocus = true,
    // revalidateOnReconnect = true,
    refreshInterval = 0,
    refreshWhenHidden = false,
    // refreshWhenOffline = false,
  } = config;

  let interval$
  if (refreshInterval !== 0 && refreshWhenHidden) {
    interval$ = interval(refreshInterval)
  } else if (refreshInterval !== 0) {
    interval$ = intervalWhenVisible(refreshInterval)
  } else {
    interval$ = of(true)
  }
  const stores = [online(), interval$, refreshedPaths(path)]
  const get$ = combineLatest(stores)
    .pipe(map(function ([online, interval, refreshPath]) {
      if (refreshPath && new URL(String(refreshPath), window.location.href).pathname === new URL(path, window.location.href).pathname && online && interval) return path
    }),
    filter((path) => {
      if (path) {
        return true
      }
    }),
    switchMap(url => fromFetch(url)),
    switchMap(response => {
      if (response.ok) {
        return response.json();
      } else {
        return of({ error: true, message: `Error ${response.status}` });
      }
    }),
    catchError(err => {
      console.error(err);
      return of({ error: true, message: err.message })
    }))
  return get$
}

// web$ is the higher order obs that switches between get$ observables based on the current url.
export function web (path: Observable<string | null>, config: WebStoreConfig = {}): BehaviorSubject<any> {
  const {
    resetData,
    initialData
  } = config;
  const web$ = path.pipe(
    switchMap(url => {
      if (url) {
        return get(url, config)
      } else {
        return of(resetData)
      }
    })
  )
  const subject = new BehaviorSubject(initialData)
  web$.subscribe(subject)
  return subject
}