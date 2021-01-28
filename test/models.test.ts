import { expect } from '@esm-bundle/chai';
import {Base} from '../state/models/Base'
import {refresh, refreshAll} from '../state/refresh'
import fetchMock from 'fetch-mock/esm/client.js'
import { of, BehaviorSubject } from 'rxjs';
import {Bookmark} from '../state/models/Bookmark'

fetchMock.config.sendAsJson = true
fetchMock.mock({url: '/api/notes', name: "id"}, {collection: true, items: [{instance: true, shortId: "id-123", id: "/api/model/id-123"}, {instance: true, shortId: "id-4556", id: "/api/model/id-4556"}]}, {query: {limit:100, motivation: "bookmarking", source: "id-12345"}})
fetchMock.mock({url: '/api/notes', name: "foo-id"}, {collection: true, items: [{instance: true, shortId: "foo-id", id: "/api/model/foo-id"}, {instance: true, shortId: "foo-id2", id: "/api/model/foo-id2"}]}, {query: {limit:100, motivation: "bookmarking", source: "foo"}})
fetchMock.mock({url: '/api/notes', name: "no-id"}, {collection: true, items: [{instance: true, shortId: "library", id: "/library"}]}, {query: {limit:100, motivation: "bookmarking"}})


// fetchMock.mock({url: '/api/COLLECTION?document=id-12345'}, {collection: true, items: [{instance: true, shortId: "id-4556", id: "/api/model/id-4556"}]})
// fetchMock.mock({url: '/api/COLLECTION/id-123'}, {instance: true})
// fetchMock.mock({url: '/library-not-ok'}, 500)
// fetchMock.mock({url: '/library-throws'}, {throws: new TypeError('Failed to fetch')})


it('Bookmark', (done) => {
  const collection$ = Bookmark.collection()
  let called = 0
  const subscription = collection$.subscribe({next (result) {
    called = called + 1
    if (called === 1) {
      expect(Bookmark._url).to.equal("/api/notes?limit=100&motivation=bookmarking")
    } else if (called === 2) {
      // console.log("dispatch 3")
      // console.log("test ", result, called, Bookmark._url)
      // console.log(fetchMock.calls())
      expect(result.length).to.equal(2)
      expect(Bookmark._url).to.equal("/api/notes?source=id-12345&limit=100&motivation=bookmarking")
      expect(result[0].subjectURL()).to.equal(`/api/note/id-123`)
      document.dispatchEvent(new CustomEvent('synthetic-page-load', {detail: {path: "/sources/id-12345"}}))
    } else if (called === 3) {
      // console.log("dispatch 4")
      // console.log("test ", result, called, Bookmark._url)
      // console.log(fetchMock.calls())
      expect(result.length).to.equal(1)
      expect(Bookmark._url).to.equal("/api/notes?limit=100&motivation=bookmarking")
      document.dispatchEvent(new CustomEvent('synthetic-page-load', {detail: {path: "/sources/id-12345", params: {id: "foo"}}}))
    } else if (called === 4) {
      expect(result.length).to.equal(2)
      expect(Bookmark._url).to.equal("/api/notes?source=foo&limit=100&motivation=bookmarking")
      // console.log(fetchMock.calls())
      done()
    }
  }})
  document.dispatchEvent(new CustomEvent('synthetic-page-load', {detail: {path: "/sources/id-12345", params: {id: "id-12345"}}}))
})