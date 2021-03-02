import { map } from "rxjs/operators";
import { selection } from "../selection";
import { clearTemporaryHighlight, highlightRange } from "./highlightRange";
import { highlightToAnnotation } from "./highlightToAnnotation";
import { Annotation } from "./Annotation";
import { BehaviorSubject } from "rxjs";

const selection$ = selection().pipe(
  map((selection) => {
    return new Toolbar(selection);
  })
);

let oldRange: Range = null;
let temporary: any;
class Toolbar {
  public range: Range;
  public selection: Selection;
  public root: Element;
  public positions: DOMRect;
  constructor(selection: Selection) {
    this.selection = selection;
    this.root = document.querySelector("ink-html");
    if (selection.isCollapsed) {
      this.range = null;
    } else if (
      this.root.contains(selection.focusNode) &&
      !selection.isCollapsed
    ) {
      this.range = selection.getRangeAt(0);
      oldRange = this.range;
      temporary = null;
      clearTemporaryHighlight();
      this.positions = this.range.getBoundingClientRect();
    }
  }
  get visible() {
    return temporary || this.range;
  }
  get temporary() {
    return temporary;
  }
  public getBoundingClientRect() {
    if (this.range) {
      // range.getBoundingClientRect() is wonky in SVG in Firefox. Seems to get the width wrong.
      // Probably doesn't take into account the transformations done to make text fit.
      if (
        this.range.commonAncestorContainer.parentElement instanceof SVGElement
      ) {
        return (this.range.startContainer
          .parentElement as HTMLElement).getBoundingClientRect();
      }
      return this.range.getBoundingClientRect();
    } else if (temporary) {
      return oldRange.getBoundingClientRect();
    }
  }

  public setOldRange() {
    const annotations = document.querySelectorAll(
      '[data-annotation-id="temporary-selection-highlight"]'
    );
    const first = annotations[0];
    const last = annotations[annotations.length - 1];
    const range = document.createRange();
    range.setStartBefore(first);
    range.setEndAfter(last);
    oldRange = range;
  }

  collapse() {
    oldRange = null;
    this.selection.collapseToStart();
    if (temporary) {
      clearTemporaryHighlight();
      temporary = null;
      toolbar$.next(this);
    }
  }

  public tempHighlight(source, chapter) {
    if (temporary) return temporary;
    const highlightedRange = highlightRange(oldRange, this.root);
    this.setOldRange();
    temporary = new Annotation(
      highlightToAnnotation(highlightedRange, this.root, source, chapter)
    );
    this.selection.collapseToStart();
    toolbar$.next(this);
    return temporary;
  }
  public clearTemporaryHighlight() {
    return clearTemporaryHighlight();
  }
  async highlight(source, chapter, json) {
    if (temporary) {
      temporary.create(json, "temporary-selection-highlight");
    } else {
      const highlightedRange = highlightRange(this.range, this.root);
      temporary = new Annotation(
        highlightToAnnotation(highlightedRange, this.root, source, chapter)
      );
      temporary.create(json, "temporary-selection-highlight");
    }
    oldRange = null;
    this.selection.collapseToStart();
    temporary = null;
    toolbar$.next(this);
  }
}
export const toolbar$ = new BehaviorSubject(new Toolbar(window.getSelection()));
selection$.subscribe(toolbar$);

// Toolbar listens to selection change event. On change and if existing highlight json and if selection collapsed: save highlight.

// Create a Highlight class that takes a range and a root and has methods for highlighting the range, turning the range into an annotation object, and creating it.

// That class should have a common ancestor with the RenderedHighlight class which has the update, create, delete methods.

// Or use a single class that takes a config object with id, annotation, range, temporary, and root properties.
