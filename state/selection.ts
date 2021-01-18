import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

function getSelection() {
  return window.document.getSelection();
}

export function selection () {
  const selection$ = fromEvent(document, "selectionchange").pipe(
    map(() => {
      return getSelection()
    })
  )
  return selection$
}