import { fromEvent, of } from 'rxjs';
import { map, mergeAll, startWith } from 'rxjs/operators';

export function online () {
  const onlineObservable = fromEvent(window, 'online')
  const offlineObservable = fromEvent(window, 'offline')

  // If the value of the event observables actually mattered then I would have used combineLatest.
  const onlineState = of(onlineObservable, offlineObservable)
    .pipe(mergeAll(), map(function () {
      return isOnline()
    }),
    startWith(isOnline()))
  return onlineState

  function isOnline () {
    return window.navigator.onLine
  }
}
