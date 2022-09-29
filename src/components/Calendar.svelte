<script>
    export let frequency
    export let habitIndex

    const days = ['S', 'M', 'T', 'W', 'Th', 'F', 'S']

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const currentDate = new Date()
    let currentMonth = months[currentDate.getMonth()]
    let numberOfDays = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDate()

    let currentDay = currentDate.getDate()
    let firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay()

    let lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
    ).getDay()

    let trailingDays = 6 - (lastDayOfMonth % 7)

    const toggleComplete = (i) => {
        const element = document.querySelector(`#habit_${habitIndex} #day_${i}`)
        if (element.classList.contains('completed')) {
            element.classList.remove('completed')
        } else {
            element.classList.add('completed')
        }
    }
</script>

<main>
    <div class="calendar-dates">
        <h1 class="month">{currentMonth}</h1>
        <div class="day-labels">
            {#each days as day}
                <div class="day-label">{day}</div>
            {/each}
        </div>
        <div class="calendar-days">
            <!-- Blank days before month -->
            {#each { length: firstDayOfMonth } as _, i}
                <div class="day blank" />
            {/each}
            {#each { length: numberOfDays } as _, i}
                <div
                    on:click={() => toggleComplete(i + 1)}
                    id="day_{i + 1}"
                    class="day"
                    class:current-day={currentDay === i + 1}
                >
                    {i + 1}
                </div>
            {/each}
            <!-- Blank days after month -->
            {#each { length: trailingDays } as _, i}
                <div class="day blank" />
            {/each}
        </div>
    </div>
</main>

<style>
    .day-labels {
        display: flex;
        flex-wrap: wrap;
        border: solid #000;
    }
    .day-label {
        width: 11%;
        margin: 1%;
        font-size: 13pt;
        text-align: center;
        border-radius: 10px;
        border: solid 1px #ddd;
    }

    .calendar-days {
        display: flex;
        flex-wrap: wrap;
        border: solid #000;
    }
    .day {
        width: 11%;
        padding: 1%;
        font-size: 13pt;
        text-align: center;
        border-radius: 10px;
        border: solid 1px #ddd;
    }

    .current-day {
        border: solid darkblue;
    }

    :global(.completed) {
        background-color: lightblue;
    }
</style>
