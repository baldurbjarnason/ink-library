import { expect } from '@esm-bundle/chai';
import {web, get} from '../state/web'
import {refresh, refreshAll} from '../state/refresh'
import fetchMock from 'fetch-mock/esm/client.js'
import { of, BehaviorSubject } from 'rxjs';
fetchMock.config.sendAsJson = true
fetchMock.mock({url: '/library'}, {library: true})
fetchMock.mock({url: '/library-not-ok'}, 500)
fetchMock.mock({url: '/library-throws'}, {throws: new TypeError('Failed to fetch')})

it('Get', (done) => {
  const get$ = get('/library')
  let called = 0
  const subscription = get$.subscribe({next (result) {
    expect(result.library).to.be.true
    called = called + 1
    if (called === 2) {
      done()
    } else {
      refresh("/library")
    }
  }})
})
it('Get with interval', (done) => {
  const get$ = get('/library', {refreshInterval: 100})
  let called = 0
  const subscription = get$.subscribe({next (result) {
    expect(result.library).to.be.true
    called = called + 1
    if (called === 3) {
      done()
    }
  }})
})
it('Get with interval', (done) => {
  const get$ = get('/library', {refreshInterval: 100, refreshWhenHidden: true})
  let called = 0
  const subscription = get$.subscribe({next (result) {
    expect(result.library).to.be.true
    called = called + 1
    if (called === 3) {
      done()
    }
  }})
})


it('Web', (done) => {
  const urls$ = new BehaviorSubject("/library")
  const web$ = web(urls$, {initialData: {library: false, initial: true}, resetData: {library: false, reset: true}})
  let called = 0
  const subscription = web$.subscribe({next (result) {
    called = called + 1
    if (called === 1) {
      expect(result.library).to.be.false
    } else if (called === 2) {
      expect(result.library).to.be.true
      urls$.next(null)
    } else if (called === 3) {
      expect(result.library).to.be.false
      urls$.next("/library")
    } else if (called === 4) {
      expect(result.library).to.be.true
      done()
    }
  }})
})
it('Get with server error', (done) => {
  const get$ = get('/library-not-ok')
  const subscription = get$.subscribe({next (result) {
    expect(result.message).to.equal("Error 500")
    expect(result.error).to.be.true
    done()
  }})
})
it('Get with fetch error', (done) => {
  const get$ = get('/library-throws')
  const subscription = get$.subscribe({next (result) {
    expect(result.message).to.equal('Failed to fetch')
    expect(result.error).to.be.true
    done()
  }})
})
// it('Web', (done) => {
//   fetchMock.mock({url: '/library'}, {library: true})
//   const get$ = get('/library')
//   const subscription = get$.subscribe({next (result) {
//     console.log(result)
//     expect(result.library).to.be.true
//     done()
//   }})
// })