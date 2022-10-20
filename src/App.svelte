<script>
    import Router from 'svelte-spa-router'

    import DietTracker from './components/DietTracker.svelte'
    import ExerciseTracker from './components/ExerciseTracker.svelte'
    import HabitBuilder from './components/HabitBuilder.svelte'
    import Journal from './components/Journal.svelte'
    import MoodTracker from './components/MoodTracker.svelte'
    import SleepTracker from './components/SleepTracker.svelte'
    import ToDoList from './components/ToDoList.svelte'
    import Calendar from './components/Planner.svelte'

    const basepath = window.location.href.includes('github.io')
        ? '/productivity-app/'
        : '/'
    export let name
</script>

<header>
    <h1>Health and Productivity</h1>

    <nav>
        <a href="{basepath}#/todo">Home</a>
        <a href="{basepath}#/diet">Diet</a>
        <a href="{basepath}#/exercise">Exercise</a>
        <a href="{basepath}#/habit">Habits</a>
        <a href="{basepath}#/journal">Journal</a>
        <a href="{basepath}#/mood">Mood</a>
        <a href="{basepath}#/sleep">Sleep</a>
        <a href="{basepath}#/todo">To-Do</a>
        <a href="{basepath}#/planner">Planner</a>
    </nav>
</header>
<Router
    routes={{
        '/': ToDoList,
        '/diet': DietTracker,
        '/exercise': ExerciseTracker,
        '/habit': HabitBuilder,
        '/journal': Journal,
        '/mood': MoodTracker,
        '/sleep': SleepTracker,
        '/todo': ToDoList,
        '/calendar': Calendar,
    }}
/>

<style>
    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
</style>
