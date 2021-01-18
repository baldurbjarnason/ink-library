import { expect, fixture, html, fixtureCleanup } from '@open-wc/testing';
import {nodes, intersections} from '../state/nodes'

it('Nodes', (done) => {
  const nodes$ = nodes("p", document.documentElement)
  let called = 0
  const subscription = nodes$.subscribe({next (els) {
    called = called + 1
    if (called === 1) {
      expect(els.size).to.equal(1)
    } else if (called === 2) {
      expect(els.size).to.equal(2)
    } else if (called === 3) {
      expect(els.size).to.equal(3)
    } else if (called === 4) {
      expect(els.size).to.equal(2)
    } else if (called === 5) {
      expect(els.size).to.equal(1)
    } else if (called === 6) {
      expect(els.size).to.equal(0)
      subscription.unsubscribe()
      done()
    }
  }})
  
  fixture(html` <p></p> <p></p> <p></p> `)
    .then(() => {
      return fixtureCleanup()
    })
})
it('Intersections', (done) => {
  const intersections$ = intersections("p")
  const subscription = intersections$.subscribe({next (els) {
    expect(els.size).to.equal(3)
    subscription.unsubscribe()
    done()
  }})
  
  fixture(html`<div id="maindiv"> <p style="margin-top: 1000px; padding: 10px;"></p> <p style="padding: 10px;"></p> <p style="padding: 10px;"></p> </div>`)
    .then(() => {
      window.scrollBy(0, 1000)
    })
})