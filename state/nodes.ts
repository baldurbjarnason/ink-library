import QSAO from "qsa-observer";
import ResizeObserver from "resize-observer-polyfill";
import { Observable, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

// Use scan with handle here. Handle pushes a {element, connected, selector} object, accumulator builds up list and runs the disconnected function
// Use new Observer() instead
interface ElementNotification {
  element: Element;
  connected: boolean;
}

function nodeStream (query: string, root: Element): Observable<ElementNotification> {
  return new Observable(function subscribe (subscriber) {
    const observer = QSAO({ query: [].concat(query), root, handle }).observer;
    function handle(element: Element, connected) {
      subscriber.next({element, connected: Boolean(connected)})
    }
    return function unsubscribe () {
      observer.disconnect()
    }
  })
}

export function nodes (query: string, root: Element): Observable<Set<Element>> {
  const elements: Set<Element> = new Set();
  const nodes$: Observable<ElementNotification> = nodeStream(query, root)
  return nodes$
    .pipe(
      scan((elements, notification) => {
        if (notification.connected) {
          elements.add(notification.element)
        } else {
          elements.delete(notification.element)
        }
        return elements
      }, elements)
    )
}

// Query. Use nodestream.

interface ElementEntry {
  element: Element;
  left: number;
  top: number;
  width: number;
  height: number;
}

export function intersections (query: string, config = {root: document.documentElement}) {
  const nodes$: Observable<ElementNotification> = nodeStream(query, config.root)

  const intersections$: Observable<Set<ElementEntry>> = new Observable(function subscribe (subscriber) {
    const intersecting: Set<ElementEntry> = new Set();
    let observed: Set<Element> = new Set();
    function handle(entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          intersecting.add({
            element: entry.target,
            left: window.scrollX + entry.boundingClientRect.left,
            top: window.scrollY + entry.boundingClientRect.top,
            width: entry.boundingClientRect.width,
            height: entry.boundingClientRect.height
          });
        }
      }
      subscriber.next(new Set(intersecting))
    }
    function handleResize () {
      observer.disconnect()
      for (const element of observed) {
        observer.observe(element)
      }
    }
    const ro = new ResizeObserver(handleResize);
    ro.observe(config.root);
    const observer = new window.IntersectionObserver(handle, config);
    nodes$.subscribe(function (notification) {
      if (notification.connected) {
        observer.observe(notification.element)
        observed.add(notification.element)
      } else {
        observer.unobserve(notification.element)
        observed.delete(notification.element)
      }
    })
    return function unsubscribe () {
      ro.disconnect()
      observer.disconnect()
    }
  })
  return intersections$
}

// For positions we need to use a switchmap that switches to a new intersections observable when the root resizes