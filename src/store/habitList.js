import { writable } from 'svelte/store'

const HABIT_DATA = 'HABIT_DATA'

const checkDailyTasksComplete = (habit, habitDate, currentDate) => {
    if (
        habitDate.getMonth() !== currentDate.getMonth() ||
        habitDate.getDate() !== currentDate.getDate()
    ) {
        console.log(habitDate)

        habit.achieved = false
        habit.achievedDate = undefined
    }

    console.log(`${habitDate.getMonth()} ${habitDate.getDate()} `)

    return habit
}

const checkWeeklyTasksComplete = (habit, habitDate, currentDate) => {
    // Get first day of week for habit:
    let firstDay = new Date(
        habitDate.setDate(habitDate.getDate() - habitDate.getDay())
    )
    // Get last day of week:
    const lastDay = new Date(firstDay)
    lastDay.setDate(lastDay.getDate() + 6)

    if (habitDate > lastDay) {
        habit.achieved = false
        habit.achievedDate = undefined
    }

    return habit
}

const checkMonthlyTasksComplete = (habit, habitDate, currentDate) => {
    if (habitDate.getMonth() !== currentDate.getMonth()) {
        habit.achieved = false
        habit.achievedDate = undefined
    }

    return habit
}
const getHabitList = () => {
    const currentDate = new Date()

    let list = JSON.parse(localStorage.getItem(HABIT_DATA))
    list.forEach((habit) => {
        const habitDate = new Date(habit.achievedDate)

        if (!habit.achieved || !habitDate || habitDate === 'Invalid Date') {
            return list
        }

        switch (habit.frequency) {
            case 'daily':
                habit = checkDailyTasksComplete(habit, habitDate, currentDate)
                break
            case 'weekly':
                habit = checkWeeklyTasksComplete(habit, habitDate, currentDate)
                break
            case 'monthly':
                habit = checkMonthlyTasksComplete(habit, habitDate, currentDate)
                break
            default:
        }
    })
    return writable(list || [])
}
export const habitList = getHabitList()

habitList.subscribe((value) => {
    localStorage.setItem(HABIT_DATA, JSON.stringify(value))
})
