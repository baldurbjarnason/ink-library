import { expect } from '@esm-bundle/chai';
import {Base} from '../state/models/Base'
import {Bookmark, bookmarks$} from '../state/models/Bookmark'
import {refresh, refreshAll} from '../state/refresh'
import fetchMock from 'fetch-mock/esm/client.js'
import { of, BehaviorSubject } from 'rxjs';
fetchMock.config.sendAsJson = true
fetchMock.mock({url: '/api/COLLECTION'}, {collection: true, items: [{instance: true, shortId: "id-123", id: "/api/model/id-123"}, {instance: true, shortId: "id-4556", id: "/api/model/id-4556"}]})
fetchMock.mock({url: '/api/COLLECTION?document=id-12345'}, {collection: true, items: [{instance: true, shortId: "id-4556", id: "/api/model/id-4556"}]})
fetchMock.mock({url: '/api/COLLECTION/id-123'}, {instance: true})
fetchMock.mock({url: '/library-not-ok'}, 500)
fetchMock.mock({url: '/library-throws'}, {throws: new TypeError('Failed to fetch')})


// it('Bookmark', (done) => {
//   const collection$ = Bookmark.collection()
//   let called = 0
//   const subscription = collection$.subscribe({next (result) {
//     called = called + 1
//     console.log(result.length, called)
//     if (called > 2) {
//       return done()
//     }
//     if (called === 1) {
//       refresh(Base.url())
//     } else if (called === 2) {
//       expect(result.length).to.equal(2)
//     }
//   }})
// })