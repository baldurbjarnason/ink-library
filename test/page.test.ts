import { expect } from '@esm-bundle/chai';
import {page} from '../state/page'

// it('page store loads params from custom event', (done) => {
//   const page$ = page()
//   expect(page$.subscribe).to.be.a('function')
//   page$.subscribe({next (result) {
//     expect(result.params.one).to.equal("two")
//     done()
//   }})
//   document.dispatchEvent(new CustomEvent('synthetic-page-load', {detail: {params: {one: "two"}}}))
// })

it('page store loads params from custom event with bootstrap', (done) => {
  document.documentElement.dataset.page = JSON.stringify({params: {one: "two"}})
  const page$ = page()
  expect(page$.subscribe).to.be.a('function')
  let called = 0
  page$.subscribe({next (result) {
    console.log(result, called)
    called = called + 1
    if (called === 1) {
      expect(result.params.one).to.equal("two")
    } else if (called === 2) {
      expect(result.params.one).to.equal("three")
      done()
    }
  }})
  document.dispatchEvent(new CustomEvent('synthetic-page-load', {detail: {params: {one: "three"}}}))
})