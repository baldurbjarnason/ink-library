import { expect } from '@esm-bundle/chai';
import {selection} from '../state/selection'

it('Selection', (done) => {
  const selection$ = selection()
  expect(selection$.subscribe).to.be.a('function')
  let called = 0
  selection$.subscribe({next (result) {
    expect(result.isCollapsed).to.be.true
    done()
  }})
  document.dispatchEvent(new Event('selectionchange'))
})