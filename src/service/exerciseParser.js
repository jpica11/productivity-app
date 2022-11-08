import * as exercises from '../../assets/exercises.json'

export const getExercise = () => {
    let data = exercises.exercises
    console.log('data: ' + data)
    return new Map(
        data.map((exercise) => {
            return [exercise.name, exercise]
        })
    )
}
