import { writable } from 'svelte/store'

const TO_DO_DATA = 'TO_DO_DATA'

export const todo = writable(JSON.parse(localStorage.getItem(TO_DO_DATA)) || [])

todo.subscribe((value) => {
    localStorage.setItem(TO_DO_DATA, JSON.stringify(value))
})
