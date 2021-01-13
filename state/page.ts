import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export function page () {
  return fromEvent<CustomEvent>(document, 'synthetic-page-load')
  .pipe(map(function (ev: CustomEvent) {
    return ev.detail
  }))
}