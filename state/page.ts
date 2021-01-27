import { fromEvent, noop, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

let pageSubject$
export function page () {
  if (pageSubject$) return pageSubject$
  const page$ = fromEvent<CustomEvent>(document, 'synthetic-page-load')
  .pipe(map(function (ev: CustomEvent) {
    return ev.detail
  }))
  if (document.documentElement.dataset.page) {
    pageSubject$ = new BehaviorSubject(JSON.parse(document.documentElement.dataset.page))
  } else {
    pageSubject$ = new BehaviorSubject({params: {}, query: {}, path: ""})
  }
  page$.subscribe(pageSubject$)
  return pageSubject$
}

export function clearPage () {
  if (pageSubject$) {
    pageSubject$ = null
  }
}