import { BehaviorSubject, Observable } from "rxjs";
import { map, distinctUntilChanged, startWith } from "rxjs/operators"
import {page} from "../page"
import {web, get} from '../web'
import {refresh} from '../refresh'
import { getToken } from "../../src/getToken";

// Each instance has a url observable with a date stamp in the hash.


export class Base extends BehaviorSubject<any> {
  public id: string;
  public shortId: string;
  static collectionName = "COLLECTION"
  static url (id?: string) {
    return `/api/${this.collectionName}`
  }
  subjectURL () {
    return `${(this.constructor as typeof Base).url()}/${this.shortId}`
  }

  static config = {}

  web$: Observable<any>;

  constructor (json) {
    super(json)
    this.shortId = json.shortId
    this.id = json.id
  }

  public refresh() {
    if (this.web$) {
      refresh(this.subjectURL())
    } else {      
      this.web$ = get(this.subjectURL(), (this.constructor as typeof Base).config)
      this.web$.subscribe(this)
    }
  }

  public async delete () {
    try {
      await fetch(
        this.subjectURL(),
        {
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify(this),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "csrf-token": getToken(),
          },
        }
      );
      refresh((this.constructor as typeof Base).url())
    } catch (err) {
      console.error(err);
    }
  }
  static async beforeCreate (json) {
    return json
  }
  static async afterCreate (json) {
    return json
  }
  static async create (json, options?) {
    json = this.beforeCreate(json)
    const response = await window.fetch(`/api/notes`, {
      method: "POST",
      credentials: "include",
      headers: {
        "csrf-token": getToken(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json)
    });
    const result = await response.json();
    refresh(this.url())
    return new this(this.afterCreate(result));
  }

  static async get (shortId) {
    const url = `${this.url()}/${shortId}`
    const response = await window.fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        "csrf-token": getToken(),
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    return new this(json);
  }

  // beforeUpdate and afterUpdate
  public beforeUpdate (json) {
    return json
  }
  public afterUpdate (json) {
    return json
  }
  public async update (json) {
    json = this.beforeUpdate(json)
    this.next(json)
    const result = await fetch(this.subjectURL(), {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(json),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "csrf-token": getToken()
      }
    });
    if (result.ok) {
      this.refresh()
      const json = await result.json()
      return this.afterUpdate(json)
    } else {
      const body = await result.text()
      console.error(result.status, body)
    }
  }
}