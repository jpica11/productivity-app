<script>
    import { getExercise } from '../service/exerciseParser'
    let exerciseMap = getExercise()
    const exercises = [...exerciseMap.keys()]

    let singleExerciseData
</script>

<main>
    <h1>Exercise Tracker Component</h1>
    <select
        bind:value={singleExerciseData}
        class="form-control"
        name="frequency"
    >
        {#each exercises as key}
            <option value={key}>{key}</option>
        {/each}
    </select>

    <div>
        Exercise Data: {JSON.stringify(exerciseMap.get(singleExerciseData))}
    </div>
</main>

<style>
</style>
