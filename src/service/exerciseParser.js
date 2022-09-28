import * as exercises from '../../public/exercises.json'

export const getExercise = (searchTerm) => {
    let data = exercises.exercises

    return new Map(
        data.map((exercise) => {
            return [exercise.name, exercise]
        })
    )
}
