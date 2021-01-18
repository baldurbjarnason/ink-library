import { fromEvent, noop } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export function page () {
  if (document.documentElement.dataset.page) {
    return fromEvent<CustomEvent>(document, 'synthetic-page-load')
    .pipe(map(function (ev: CustomEvent) {
      return ev.detail
    }),
    startWith(JSON.parse(document.documentElement.dataset.page)))
  } else {
    return fromEvent<CustomEvent>(document, 'synthetic-page-load')
    .pipe(map(function (ev: CustomEvent) {
      return ev.detail
    }))
  }
}