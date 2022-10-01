<script>
    import { habitList } from '../store/habitList'
    import Calendar from './children/Calendar.svelte'

    let habit = {
        name: '',
        description: '',
        frequency: '',
        achieved: false,
        achievedDate: undefined,
        completedDates: [],
    }

    const addToList = () => {
        window.event.preventDefault()

        $habitList = [
            ...$habitList,
            {
                name: habit.name,
                description: habit.description,
                frequency: habit.frequency,
            },
        ]
    }

    const deleteEntry = (index) => {
        $habitList.splice(index, 1)
        $habitList = $habitList
    }

    const handleHabitCheck = (habit, index) => {
        if (habit.achieved) {
            habit.achievedDate = new Date()
        } else {
            habit.achievedDate = undefined
        }
        $habitList.splice(index, 1, habit)
        $habitList = $habitList
    }
</script>

<main>
    <h1>Habits</h1>

    <div class="prior-entries">
        {#each $habitList as habit, index}
            <div id="habit_{index}">
                <h4>{habit.name}:</h4>
                <input
                    type="checkbox"
                    bind:checked={habit.achieved}
                    on:change={() => handleHabitCheck(habit, index)}
                />
                {habit.description} | {habit.frequency} |
                <span on:click={() => deleteEntry(index)}>
                    Remove habit: &#10060;
                </span>

                Calendar:
                <Calendar
                    bind:habit
                    habitIndex={index}
                    calendarType={'HABIT'}
                />
            </div>
        {/each}
    </div>
    <form class="journal-form">
        <div class="form-group">
            <h2>Add new habit:</h2>
            <label>Habit Name</label>
            <input
                bind:value={habit.name}
                class="form-control"
                type="text"
                name="postName"
            />
            <label>Description</label>
            <textarea
                bind:value={habit.description}
                class="form-control"
                name="post"
                rows="5"
            />
            <label>Frequency</label>
            <select
                bind:value={habit.frequency}
                class="form-control"
                name="frequency"
            >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly" selected>Yearly</option>
            </select>
        </div>
        <button
            on:click={addToList}
            class="btn btn-primary"
            type="submit"
            name="button">Add</button
        >
    </form>
</main>

<style>
    .journal-form {
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 75%;
        margin-left: 12.5%;
    }

    .form-control {
        width: 50vw;
    }
</style>
