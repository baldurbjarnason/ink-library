import position from "dom-anchor-text-position";
import seek from "dom-seek";
import { encode } from "universal-base64url";

const whitespace = /^\s+$/;

export function highlightRange(range, root) {
  const positions = position.fromRange(root, range);
  console.log(positions);
  let svg = false;
  // const tempId = "temp-" + Math.floor(Math.random() * 10000000000000);
  const tempId = "temporary-selection-highlight";
  const seeker = document.createNodeIterator(root, window.NodeFilter.SHOW_TEXT);
  function split(where) {
    const count = seek(seeker, where);
    if (count !== where) {
      // Split the text at the offset
      const referenceNode = seeker.referenceNode;
      (referenceNode as Text).splitText(where - count);
      // Seek to the exact offset.
      seek(seeker, where - count);
    }
    return seeker.referenceNode;
  }
  const start = split(positions.start);
  split(positions.end - positions.start);
  var nodes = [];
  while (seeker.referenceNode !== start) {
    const node = seeker.previousNode();
    nodes.push(node);
  }
  for (var i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (
      !node.parentElement.closest(".Highlight") &&
      !whitespace.test(node.textContent)
    ) {
      const highlight = document.createElement("mark");
      highlight.dataset.annotationId = tempId;
      highlight.classList.add("Highlight");
      // highlight.addEventListener('click', event => {
      //   console.log('highlight clicked', highlight.dataset.href)
      //   event.preventDefault();
      //   event.stopPropagation();
      //   return goto(highlight.dataset.href);
      // });
      if (node.parentElement instanceof SVGElement) {
        // The issue here is that we are highlighting the text element not the text nodes
        // Should get the startposition and endposition of the character in the text node from the parent node
        svg = true;
        const parent = node.parentElement;
        const box = parent.getBBox();
        const svgDocument = parent.ownerDocument;
        const rect = svgDocument.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rect.dataset.annotationHighlightBox = tempId;
        rect.dataset.annotationId = tempId;
        const width = parent.getSubStringLength(
          parent.textContent.indexOf(node.textContent),
          node.textContent.length
        );
        const x = parent.getStartPositionOfChar(
          parent.textContent.indexOf(node.textContent)
        ).x;
        rect.setAttributeNS(null, "x", x);
        rect.setAttributeNS(null, "y", Number.parseInt(box.y, 10));
        rect.setAttributeNS(null, "width", width);
        rect.setAttributeNS(null, "height", Number.parseInt(box.height, 10));
        rect.classList.add("Highlight");
        rect.classList.add("Colour1");
        parent.insertAdjacentElement("afterend", rect);
        // Need to add a tspan with the annotation data
      } else {
        node.parentNode.replaceChild(highlight, node);
        highlight.appendChild(node);
      }
      // if (i === nodes.length - 1) {
      //   const span = document.createElement("span");
      //   span.id = "highlight-" + encode(tempId);
      //   span.classList.add("Highlight-anchor");
      //   highlight.insertAdjacentElement("afterbegin", span);
      // }
      // if (i === 0) {
      //   const a = document.createElement("a");
      //   a.href = `${window.location.pathname}#note-${encode(tempId)}`;
      //   a.dataset.highlightId = `${encode(tempId)}`;
      //   a.classList.add("Highlight-return-link");
      //   a.classList.add("visually-hidden");
      //   a.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;
      //   a.setAttribute("aria-label", "Go to note in sidebar");
      //   highlight.insertAdjacentElement("afterend", a);
      // }
    }
  }
  return { tempId, ...positions, svg };
}

// Update highlight - takes an (temp)Id and an annotation object -> updates mark and links to match.

export function updateHighlight(oldId, newId, colour) {
  // console.log(oldId, newId);
  document
    .querySelectorAll(`[data-annotation-id="${oldId}"]`)
    .forEach((node) => {
      (node as HTMLElement).dataset.annotationId = newId;
      if (colour) {
        (node as HTMLElement).classList.add(colour);
      }
      const changeEvent = new CustomEvent("annotation-id-change", {
        detail: {
          id: newId,
        },
        bubbles: true,
        cancelable: true,
      });
      (node as HTMLElement).dispatchEvent(changeEvent);
    });
}
export function clearTemporaryHighlight() {
  // console.log(oldId, newId);
  document
    .querySelectorAll(`[data-annotation-id="temporary-selection-highlight"]`)
    .forEach((node) => {
      (node as HTMLElement).replaceWith(...Array.from(node.childNodes));
    });
}
