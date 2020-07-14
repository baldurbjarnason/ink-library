
import position from "dom-anchor-text-position";
import seek from "dom-seek";
import { encode } from "universal-base64url";

const whitespace = /^\s+$/

export function highlightRange(range, root) {
  const tempId = "temp-" + Math.floor(Math.random() * 10000000000000);
  const seeker = document.createNodeIterator(root, window.NodeFilter.SHOW_TEXT);
  function split(where) {
    const count = seek(seeker, where);
    if (count !== where) {
      // Split the text at the offset
      seeker.referenceNode.splitText(where - count);

      // Seek to the exact offset.
      seek(seeker, where - count);
    }
    return seeker.referenceNode;
  }
  const positions = position.fromRange(root, range);
  const start = split(positions.start);
  split(positions.end - positions.start);
  var nodes = [];
  while (seeker.referenceNode !== start) {
    const node = seeker.previousNode();
    nodes.push(node);
  }
  for (var i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!node.parentElement.closest(".Highlight") && !whitespace.test(node.textContent)) {
      const highlight = document.createElement("mark");
      highlight.dataset.annotationId = tempId;
      highlight.classList.add("Highlight");
      highlight.root = root;
      // highlight.addEventListener('click', event => {
      //   console.log('highlight clicked', highlight.dataset.href)
      //   event.preventDefault();
      //   event.stopPropagation();
      //   return goto(highlight.dataset.href);
      // });
      node.parentNode.replaceChild(highlight, node);
      highlight.appendChild(node);
      if (i === nodes.length - 1) {
        const span = document.createElement("span");
        span.id = "highlight-" + encode(tempId);
        span.classList.add("Highlight-anchor");
        highlight.insertAdjacentElement("afterbegin", span);
      }
      if (i === 0) {
        const a = document.createElement("a");
        a.href = `${window.location.pathname}#note-${encode(tempId)}`;
        a.dataset.highlightId = `${encode(tempId)}`;
        a.classList.add("Highlight-return-link");
        a.classList.add('visually-hidden')
        a.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;
        a.setAttribute("aria-label", "Go to note in sidebar");
        highlight.insertAdjacentElement("afterend", a);
      }
    }
  }
  return {tempId, ...positions}
}

// Update highlight - takes an (temp)Id and an annotation object -> updates mark and links to match.

export function updateHighlight (oldId, newId) {
  console.log(oldId, newId)
  document.querySelectorAll(`[data-annotation-id="${oldId}"]`).forEach(node => {
    node.dataset.annotationId = newId;
  });
}