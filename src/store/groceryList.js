import { writable } from 'svelte/store'

const GROCERY_LIST = 'GROCERY_LIST'

export const groceries = writable(
    JSON.parse(localStorage.getItem(GROCERY_LIST)) || []
)

groceries.subscribe((value) => {
    localStorage.setItem(GROCERY_LIST, JSON.stringify(value))
})
