import { expect } from '@esm-bundle/chai';
import {online} from '../state/online'

it('online store - are we online or not', (done) => {
  const online$ = online()
  expect(online$.subscribe).to.be.a('function')
  let called = 0
  online$.subscribe({next (result) {
    expect(result).to.be.true
    called = called + 1
    if (called === 2) {
      done()
    }
  }})
  window.dispatchEvent(new Event('online'))
})