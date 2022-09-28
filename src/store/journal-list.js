import { writable } from 'svelte/store'

const JOURNAL_DATA = 'JOURNAL_DATA'

export const journalList = writable(
    JSON.parse(localStorage.getItem(JOURNAL_DATA)) || []
)

journalList.subscribe((value) => {
    localStorage.setItem(JOURNAL_DATA, JSON.stringify(value))
})
