
import { page } from './page'
import { derived, writable } from 'svelte/store';
import { error } from './error.js'
import { fetch } from './fetch.js'

export const refreshInNtbk = writable(Date.now())

export const inntbk = derived([page, refreshInNtbk], ([$page, $refreshInNtbk], set) => {
    if (!process.browser) return
    if (!$page.path || $page.path !== '/') return
    if ($page.query.returnTo) return
    set({ type: 'loading', items: [] })

    return fetch(`/api/notebooks`)
        .then(acc => {
            set(acc)
        })
        .catch(err => {
            set({ type: 'failed', items: [] })
            error.set(err)
            console.error(err)
        })

}, { type: 'loading', items: [] })