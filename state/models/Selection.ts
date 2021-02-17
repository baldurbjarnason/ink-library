import { map } from "rxjs/operators";
import { selection } from "../selection";
import { clearTemporaryHighlight, highlightRange } from "./highlightRange";
import { highlightToAnnotation } from "./highlightToAnnotation";
import { Annotation } from "./Annotation";

export const selectionHighlight$ = selection().pipe(
  map((selection) => {
    return new SelectionHighlight(selection);
  })
);

class SelectionHighlight {
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
      this.positions = this.range.getBoundingClientRect();
    }
  }
  public getBoundingClientRect() {
    this.positions = this.range.getBoundingClientRect();
    return this.positions;
  }
  public tempHighlightObject: any;
  public tempHighlight(range, source, chapter) {
    const highlightedRange = highlightRange(range, this.root);
    this.tempHighlightObject = new Annotation(
      highlightToAnnotation(highlightedRange, this.root, source, chapter)
    );
    return this.highlight;
  }
  public clearTemporaryHighlight() {
    return clearTemporaryHighlight();
  }
  async highlight(source, chapter, json) {
    console.log(this);
    if (this.tempHighlightObject) {
      this.tempHighlightObject.create(json, "temporary-selection-highlight");
    } else {
      const highlightedRange = highlightRange(this.range, this.root);
      this.tempHighlightObject = new Annotation(
        highlightToAnnotation(highlightedRange, this.root, source, chapter)
      );
      this.tempHighlightObject.create(json, "temporary-selection-highlight");
    }
  }
}

// Toolbar listens to selection change event. On change and if existing highlight json and if selection collapsed: save highlight.

// Create a Highlight class that takes a range and a root and has methods for highlighting the range, turning the range into an annotation object, and creating it.

// That class should have a common ancestor with the RenderedHighlight class which has the update, create, delete methods.

// Or use a single class that takes a config object with id, annotation, range, temporary, and root properties.
