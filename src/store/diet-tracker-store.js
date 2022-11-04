import { writable } from 'svelte/store'

const DIET_DATA = 'DIET_DATA'

const getDataFromStorage = () => {
    const storedData = JSON.parse(localStorage.getItem(DIET_DATA))
    return storedData &&
        storedData.currentDate === new Date().toLocaleDateString()
        ? storedData
        : {
              currentCalories: 0,
              totalProtein: 0,
              totalCarbs: 0,
              totalFat: 0,
              currentDate: new Date().toLocaleDateString(),
          }
}

export const dailyDietData = writable(getDataFromStorage())

dailyDietData.subscribe((value) => {
    localStorage.setItem(DIET_DATA, JSON.stringify(value))
})
