<script>
    import { getExercise } from '../service/exerciseParser'
    let exerciseMap = getExercise()

    console.log(exerciseMap)
</script>

<main>
    <h1>Exercise Tracker Component</h1>
    <div>{JSON.stringify(Object.fromEntries(exerciseMap))}</div>
</main>

<style>
</style>
