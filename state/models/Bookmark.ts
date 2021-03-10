import { Base } from "./Base";
import { map, distinctUntilChanged, startWith } from "rxjs/operators";
// import { of, combineLatest, BehaviorSubject, interval, Observable } from 'rxjs';
import { page } from "../page";
import { web } from "../web";
import { refresh } from "../refresh";
import { getToken } from "../../src/getToken";

export class BookmarkModel {
  public id: string;
  public shortId: string;
  public subject: Bookmark;
  get url() {
    return `/api/note/${this.shortId}`;
  }
  public target: any;
  constructor(json) {
    Object.assign(this, json);
  }

  public async create(element, { chapter, source }) {
    const result = await BookmarkModel._create(element, { chapter, source });
    this.subject.next(new BookmarkModel(result));
  }

  private static async _create(element, { chapter, source }) {
    const target = {
      selector: { type: "", value: "" },
      source: `/${source.shortId}/${chapter.url.replace(".json", "")}`,
    };
    if (
      element.id &&
      document.querySelectorAll(`#${element.id}`).length === 1
    ) {
      target.selector = {
        type: "FragmentSelector",
        value: element.id,
      };
    } else {
      const elements = Array.from(
        document.querySelectorAll(element.tagName + ":not([data-ink-private])")
      );
      target.selector = {
        type: "CssSelector",
        value: `${element.tagName.toLowerCase()}:nth-of-type(${elements.indexOf(
          element
        ) + 1})`,
      };
    }
    const body = [
      {
        type: "TextualBody",
        value: element.textContent,
        content: element.textContent,
        format: "text/plain",
        motivation: "bookmarking",
      },
    ];
    const json = {
      type: "Annotation",
      sourceId: source.id,
      target,
      body,
      document: `/${source.shortId}/${chapter.url.replace(".json", "")}`,
    };
    const response = await window.fetch(`/api/notes`, {
      method: "POST",
      credentials: "include",
      headers: {
        "csrf-token": getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(response.status + body);
    }
    const result = await response.json();
    refresh(Bookmark._url);
    return result;
  }

  static async create(element, { chapter, source }) {
    const result = await BookmarkModel._create(element, { chapter, source });
    return new this(result);
  }

  public async delete(item) {
    this.subject.next({ deleted: true, target: {} });
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
      refresh(Bookmark._url);
      this.subject.next({ deleted: true });
      // this.refresh()
    } catch (err) {
      console.error(err);
    }
  }
}

export class Bookmark extends Base {
  static collectionName = "notes";
  static _url: string;
  public target: any;
  constructor(json) {
    const model = new BookmarkModel(json);
    super(model);
    model.subject = this;
    this.target = model.target;
  }
  get url() {
    return `/api/note/${this.shortId}`;
  }
  static bookmarksURL(id?: string) {
    if (id) {
      return `/api/notes?source=${id}&limit=100&motivation=bookmarking`;
    } else {
      return `/api/notes?limit=100&motivation=bookmarking`;
    }
  }

  static collection() {
    return bookmarks$;
  }

  public next(json) {
    const model = new BookmarkModel(json);
    model.subject = this;
    this.target = model.target;
    return super.next(model);
  }
}

const bookmarksURL$ = page().pipe(
  map(({ path, params = { id: "" } }) => {
    // if (path.startsWith('/sources') && params.id) {
    //   return Bookmark.url(params.id)
    // } else {
    //   return Bookmark.url()
    // }
    return Bookmark.bookmarksURL(params.id);
  }),
  startWith(Bookmark.bookmarksURL())
);

export const bookmarks$ = web(bookmarksURL$.pipe(distinctUntilChanged())).pipe(
  map((result = { items: [] }) => {
    const { items = [] } = result;
    const bookmarks = []
      .concat(items)
      .filter((item) => item)
      .map((item) => new Bookmark(item));
    return bookmarks;
  })
);

bookmarksURL$.subscribe({
  next(url) {
    Bookmark._url = url;
  },
});
