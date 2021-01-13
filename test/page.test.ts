import { expect } from '@esm-bundle/chai';
import {page} from '../state/page'

it('page store loads params from custom event', (done) => {
  const page$ = page()
  expect(page$.subscribe).to.be.a('function')
  page$.subscribe({next (result) {
    expect(result.params.one).to.equal("two")
    done()
  }})
  document.dispatchEvent(new CustomEvent('synthetic-page-load', {detail: {params: {one: "two"}}}))
})