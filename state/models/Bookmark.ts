import {Base} from "./Base"
import type { Observable } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators"
import {page} from "../page"
import {web} from '../web'
import {refresh} from '../refresh'
import { getToken } from "../../src/getToken";

const bookmarksURL$ = page().pipe(
  map(({path, params}) => {
    if (path.startsWith('/sources') && params.id) {
      return `/api/notes?source=${params.id}&limit=100&motivation=bookmarking`
    } else {
      return null
    }
  })
)


export const bookmarks$ = web(bookmarksURL$.pipe(distinctUntilChanged())).pipe(
  map((result = {items: []}) => {
    const {items} = result
    return [].concat(items).map(item => new Bookmark(item))
  })
)

export class Bookmark extends Base {
  static collectionName = "notes"
  static _url : string
  subjectURL () {
    return `/api/note/${this.shortId}`
  }
  static url (id?: string) {
    if (id) {
      return `api/notes?source=${id}&limit=100&motivation=bookmarking`
    } else {
      return `api/notes?limit=100&motivation=bookmarking`
    }
  }
  public target: any
  constructor (json) {
    super(json)
    this.target = json.target
  }

  static async create (element, {chapter, source}) {
    const target = {
      selector: {type: "", value: ""},
      source: `${source.shortId}/${chapter.url}`
    }
    if (element.id) {
      target.selector = {
        type: "FragmentSelector",
        value: element.id
      }
    } else {
      const elements = Array.from(document.querySelectorAll(element.tagName + ":not([data-ink-private])"))
      target.selector = {
        type: "CSSSelector",
        value: `${element.tagName}:nth-of-type(${elements.indexOf(element) + 1})`
      }
    }
    const body = [{
      type: "TextualBody",
      value: element.textContent,
      content: element.textContent,
      format: "text/plain",
      motivation: "bookmarking"
    }]
    const json = {
      type:	"Annotation",
      sourceId: source.id,
      target,
      body,
      document: `${source.shortId}/${chapter.url}`
    }
    console.log(json)
    const response = await window.fetch(`/api/notes`, {
      method: "POST",
      credentials: "include",
      headers: {
        "csrf-token": getToken(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    });
    if (!response.ok) {
      const body = await response.text()
      throw new Error(response.status + body)
    }
    const result = await response.json();
    refresh(Bookmark._url)
    return new this(this.afterCreate(result));
  }


  public async delete () {
    try {
      await fetch(
        this.subjectURL(),
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "csrf-token": getToken(),
          },
        }
      );
      refresh(Bookmark._url)
      this.refresh()
    } catch (err) {
      console.error(err);
    }
  }
}


bookmarksURL$.subscribe({next (url) {
  Bookmark._url = url
}})