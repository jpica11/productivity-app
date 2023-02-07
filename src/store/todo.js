import { writable } from 'svelte/store'

const TO_DO_DATA = 'TO_DO_DATA'

export function getData(url) {
    const store = writable(new Promise(() => {}))
    const load = async () => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()

        store.set(Promise.resolve(data))
    }

    load()

    return store
}

export const todo = writable(JSON.parse(localStorage.getItem(TO_DO_DATA)) || [])

todo.subscribe((value) => {
    localStorage.setItem(TO_DO_DATA, JSON.stringify(value))
})
