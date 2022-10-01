export const toggleComplete = (calendarIndex, habitIndex, month, habit) => {
    habit.test = calendarIndex
    console.log(
        `index: ${calendarIndex}, habitIndex: ${habitIndex}, month: ${month}, habit: ${JSON.stringify(
            habit
        )}`
    )
    const element = document.querySelector(
        `#habit_${habitIndex} #day_${calendarIndex}`
    )
    if (element.classList.contains('completed')) {
        element.classList.remove('completed')
    } else {
        element.classList.add('completed')
    }
}
