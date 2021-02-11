import { BehaviorSubject } from "rxjs";
import { getToken } from "../../src/getToken";
import { updateHighlight } from "./highlightRange";
import { getIdsFromNames } from "../tags";
import DOMPurify from "dompurify";
const commentConfig = {
  ALLOWED_TAGS: [
    "p",
    "i",
    "em",
    "strong",
    "a",
    "b",
    "ul",
    "li",
    "ol",
    "blockquote",
    "img",
    "pre",
    "code",
  ],
  FORBID_ATTR: ["style"],
};

function clean(body) {
  if (body.content) {
    body.content = DOMPurify.sanitize(body.content, commentConfig);
  }

  if (body.value) {
    body.value = DOMPurify.sanitize(body.value, commentConfig);
  }

  return body;
}

const notes: Set<Annotation$> = new Set();
class Notes extends BehaviorSubject<Set<Annotation$>> {
  add(note: Annotation$) {
    notes.add(note);
    this.next(notes);
  }
}
export const createdNotes$ = new Notes(notes);

interface AnnotationJSON {
  id: string;
  shortId: string;
  target: object;
  sourceId: string;
  body: Array<any>;
}

export class Annotation {
  public annotation: AnnotationJSON;
  public root: Element;
  public subject: Annotation$;
  public target: object;
  constructor(annotation: AnnotationJSON) {
    this.root = document.querySelector("ink-html");
    this.annotation = annotation;
  }

  public next(json) {
    if (this.subject) {
      this.subject.next(json);
    }
    this.annotation = json;
  }

  public async create(json, tempId?: string) {
    const updated = await this.update(json);
    if (tempId) updateHighlight(tempId, this.id);
    const annotationSubject = new Annotation$(updated);
    createdNotes$.add(annotationSubject);
    return annotationSubject;
  }

  public async update(json) {
    // Should take flags, colours and note as a second config object. Then merge the two into one json object
    const payload = Object.assign({}, this.annotation, json);
    // We need to make sure we don't overwrite existing bodies.
    payload.body = payload.body.map((body) => {
      if (body.motivation === "commenting") {
        return clean(body);
      } else {
        return body;
      }
    });
    for (const body of this.annotation.body) {
      if (
        !payload.body.find((current) => current.motivation === body.motivation)
      ) {
        payload.body = payload.body.concat(body);
      }
    }
    this.next(json);
    const result = await fetch(this.url, {
      method: this.method,
      credentials: "include",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "csrf-token": getToken(),
      },
    });
    if (result.ok) {
      const json = await result.json();
      this.next(json);
      return json;
    } else {
      // Should we update the annotation object with an error object
      const body = await result.text();
      console.error(result.status, body);
      const annotation = Object.assign({}, this.annotation, {
        _error: { status: result.status, message: body },
      });
      this.next(annotation);
      return annotation;
    }
  }

  get id() {
    return this.annotation.id;
  }

  get sourceShortId() {
    const items = this.annotation.sourceId.split("/").filter((item) => item);
    return items[items.length - 1];
  }

  get method() {
    if (this.annotation.id) {
      return "PUT";
    } else {
      return "POST";
    }
  }

  get url() {
    if (this.annotation.id) {
      return `/api/note/${this.annotation.shortId}`;
    } else {
      return this.createURL;
    }
  }
  get createURL() {
    return `/api/notes/${this.sourceShortId}`;
  }

  public async delete(item) {
    this.next({ deleted: true, target: {} });
    try {
      await fetch(this.url, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/ld+json",
          Accept: "application/ld+json",
          "csrf-token": getToken(),
        },
      });
      this.next({ deleted: true });
      // this.refresh()
    } catch (err) {
      console.error(err);
    }
  }
}

export class Annotation$ extends BehaviorSubject<any> {
  public target: any;
  public shortId: string;
  public id: string;
  constructor(json) {
    const model = new Annotation(json);
    super(model);
    this.shortId = json.shortId;
    this.id = json.id;
    model.subject = this;
    this.target = model.target;
  }

  public next(json) {
    const model = new Annotation(json);
    model.subject = this;
    this.target = model.target;
    return super.next(model);
  }
}
