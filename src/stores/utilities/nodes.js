import QSAO from "qsa-observer/esm";
import ResizeObserver from "resize-observer-polyfill";
import { writable, derived } from "svelte/store";

export function nodes(query, root) {
  const elements = new Set();
  const { subscribe, set } = writable(new Set(elements));
  function handle(element, connected, selector) {
    if (connected) {
      elements.add(element);
    } else {
      elements.delete(element);
    }
    set(new Set(elements));
  }
  const observer = QSAO({ query: [].concat(query), root, handle }).observer;
  return { subscribe, observer };
}

export function intersecting(nodeStore, config) {
  const elements = new Set();
  const observed = new Set();
  return derived(
    nodeStore,
    ($nodeStore, set) => {
      function handle(entries, observer) {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            elements.add(entry.target);
            set(new Set(elements));
          } else {
            elements.delete(entry.target);
            set(new Set(elements));
          }
        }
      }
      const observer = new window.IntersectionObserver(handle, config);
      const discarded = Array.from(observed).filter(
        node => !$nodeStore.has(node)
      );
      for (const node of $nodeStore) {
        if (!observed.has(node)) {
          observer.observe(node);
          observed.add(node);
        }
      }
      for (const node of discarded) {
        observer.unobserve(node);
      }
      set(new Set(elements));
    },
    new Set(elements)
  );
}

// We need another store that maps from a set of positions to a map of annotation ids -> topmost el of that id with positions
// We use a root id -> set a resize observer on that root, should work as odds are pretty good that restyling will resize the root.
export function positions(nodeStore, config) {
  let elements = new Set();
  let observed = new Set();
  return derived(
    nodeStore,
    ($nodeStore, set) => {
      const observer = new window.IntersectionObserver(handle, config);
      let ro;
      function handle(entries, observer) {
        function handleResize(entries) {
          elements = new Set();
          observed = new Set();
          for (const node of $nodeStore) {
            if (!observed.has(node)) {
              observer.observe(node);
              observed.add(node);
            }
          }
          set(new Set(elements));
        }
        if (!ro) {
          ro = new ResizeObserver(handleResize);
          ro.observe(document.getElementById("reader-body"));
        }
        for (const entry of entries) {
          observer.unobserve(entry.target);
          elements.add({
            target: entry.target,
            id: entry.target.dataset.annotationId,
            left: window.scrollX + entry.boundingClientRect.left,
            top: window.scrollY + entry.boundingClientRect.top,
            width: entry.boundingClientRect.width,
            height: entry.boundingClientRect.height
          });
        }
        set(new Set(elements));
      }
      const discarded = Array.from(observed).filter(
        node => !$nodeStore.has(node)
      );
      for (const node of $nodeStore) {
        if (!observed.has(node)) {
          observer.observe(node);
          observed.add(node);
        }
      }
      for (const node of discarded) {
        observer.unobserve(node);
      }
      set(new Set(elements));
    },
    new Set(elements)
  );
}

export const annotations = function(positions) {
  return derived(
    positions,
    ($positions, set) => {
      const sorted = Array.from($positions).sort((a, b) => {
        if (a.top < b.top) {
          return -1;
        } else if (a.top > b.top) {
          return 1;
        } else {
          return 0;
        }
      });
      const ids = new Set(sorted.map(entry => entry.id));
      const result = Array.from(ids).map(entry => {
        return sorted.find(annotation => annotation.id === entry);
      });
      set(result);
    },
    []
  );
};
