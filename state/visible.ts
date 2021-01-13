import { fromEvent, combineLatest, interval} from 'rxjs';
import { map, throttleTime, filter, startWith } from 'rxjs/operators';

// If the value of the event observables actually mattered then I would have used combineLatest.


function isVisible() {
  return document.visibilityState !== "hidden";
}

function visibilityObserver () {
  const visibilityEvent$ = fromEvent(document, 'visibilitychange')
    .pipe(startWith(true))
  const focusEvent$ = fromEvent(document, 'focus')
    .pipe(startWith(true))
  return combineLatest([visibilityEvent$, focusEvent$])
  .pipe(map(function () {
    return isVisible()
  }),
  startWith(isVisible()))
}

export function throttledVisible (interval) {
  return visibilityObserver()
    .pipe(throttleTime(interval))
}
export function intervalWhenVisible (updateInterval) {
  const visibility$ = throttledVisible(updateInterval)
  return combineLatest([visibility$, interval(updateInterval)])
    .pipe(map(([visibility]) => {
      return visibility
    }),
    filter(visibility => visibility))
}

