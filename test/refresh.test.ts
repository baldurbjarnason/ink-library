import { expect } from '@esm-bundle/chai';
import {refresh, refreshAll, refreshedPaths, createRefresher} from '../state/refresh'

it('Refresher', (done) => {
  const refresher$ = createRefresher()
  expect(refresher$.subscribe).to.be.a('function')
  let called = 0
  const subscription = refresher$.subscribe({next (result) {
    expect(result).to.equal("/sources/id-12345")
    called = called + 1
    if (called === 2) {
      done()
    }
  }})
  document.dispatchEvent(new CustomEvent('synthetic-page-load', {detail: {path: "/sources/id-12345", params: {id: "id-12345"}}}))
  document.dispatchEvent(new CustomEvent('synthetic-page-load', {detail: {path: "/sources/id-12345", params: {id: "id-12345"}}}))
  subscription.unsubscribe()
})
