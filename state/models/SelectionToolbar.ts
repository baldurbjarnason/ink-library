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
const positioner = document.getElementById("positioner");
class Toolbar {
  public range: Range;
  public selection: Selection;
  public root: Element;
  public positions: DOMRect;
  constructor(selection: Selection) {
    this.selection = selection;
    this.root = document.getElementById("reader-body");
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
      // So it turns out that getting the positions and sizes of text nodes and ranges in SVG that have been transformed in some way (which is 99% of the time in SVG) is underspecified in the standards. Which means that you get slightly different results for this in each of the major browser engines when dealing with PDFs as ink uses SVG to render PDFs.
      //
      // Chrome/Edge seems to mostly do what you'd expect. Firefox tends to be on the side to what you expect because most of the text transforms are width transforms. Safari, OTOH, gets the height wrong. So what needs to be done here is get the top position and bottom position of the first and last <text> element in the SVG and use those instead.
      //
      // Long term the best fix here would be to switch to HTML rendering for the text layer when rendering PDFs but, even though changing the text layer rendering itself shouldn't be too complicated, switching to it would mean that the project would have to start to manage page sizing in the reading UI using JS which might be a substantial change.
      //
      // In the meantime the positioning is adjusted based on estimates that approximate the transforms that the browsers should be doing.
      if (
        this.range.commonAncestorContainer.parentElement instanceof SVGElement
      ) {
        let startNode: any = this.range.startContainer;
        let start;
        if (!startNode.closest) {
          start = startNode.parentElement;
        }
        let endNode: any = this.range.endContainer;
        let end;
        if (!endNode.closest) {
          end = endNode.parentElement;
        }
        const top = start.getBoundingClientRect().top;
        const bottom = end.getBoundingClientRect().bottom;
        const parent: SVGTextElement = this.range.commonAncestorContainer
          .parentElement as any;
        const parentTextWidth = parent.getComputedTextLength();
        const parentWidth = parent.getBoundingClientRect().width;
        const ratio = parentTextWidth / parentWidth;
        const rect = this.range.getBoundingClientRect();
        const width = rect.width / ratio;
        const returnRect = {
          width,
          x: rect.x / ratio,
          y: rect.y,
          height: rect.height,
          right: rect.x / ratio + width,
          top,
          bottom,
          left: rect.left / ratio,
        };
        return returnRect;
      }
      this.positions = this.range.getBoundingClientRect();
      return this.positions;
    } else if (temporary) {
      return positioner.getBoundingClientRect();
    }
  }

  public setOldRange() {
    const positions = {
      left: window.scrollX + this.positions.left,
      top: window.scrollY + this.positions.top,
      width: this.positions.width,
      height: this.positions.height,
    };
    positioner.setAttribute(
      "style",
      `position: absolute;top: ${positions.top}px;left: ${positions.left}px;width: ${positions.width}px;height: ${positions.height}px;visibility: hidden;pointer-events:none;`
    );
    positioner.classList.remove("visually-hidden");
  }

  collapse() {
    this.selection.collapseToStart();
    positioner.classList.add("visually-hidden");
    positioner.setAttribute("style", "");
    if (temporary) {
      clearTemporaryHighlight();
      temporary = null;
      toolbar$.next(this);
    }
  }

  public tempHighlight(source, chapter) {
    if (temporary) return temporary;
    this.getBoundingClientRect();
    this.setOldRange();
    const highlightedRange = highlightRange(oldRange, this.root);
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
  // We need to add a way to cancel the highlight
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
