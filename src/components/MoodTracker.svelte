<script>
    let mood = ''
    let notes = ''
</script>

<main>
    <h1>Mood Tracker Component</h1>

    <div>
        <label>Current mood</label>
        <select bind:value={mood} class="form-control" name="frequency">
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="tired" selected>Tired</option>
        </select>

        <label>Notes</label>
        <textarea
            bind:value={notes}
            class="form-control"
            name="post"
            rows="5"
        />
    </div>
</main>

<style>
</style>
