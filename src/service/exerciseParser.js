import * as exercises from '../../assets/exercises.json'

export const getExercise = () => {
    let data = exercises.exercises

    let map = new Map()
    data.forEach((exercise) => {
        map.set(exercise.name, exercise)
    })
    return map
}
