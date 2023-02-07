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
    import GroceryList from './components/GroceryList.svelte'
    import Planner from './components/Planner.svelte'
    import Notes from './components/notes-component/Notes.svelte'
    import Note from './components/notes-component/Note.svelte'
    import NewNote from './components/notes-component/NewNote.svelte'

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
        <a href="{basepath}#/groceries">Grocery List</a>
        <a href="{basepath}#/notes">Notes</a>
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
        '/groceries': GroceryList,
        '/planner': Planner,
        '/notes': Notes,
        '/notes/new': NewNote,
        '/notes/:id': Note,
    }}
/>

<style>
    :global(body) {
        background-color: black;
        color: white;
    }
    h1 {
        color: #a1a1a1;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: bold;
    }
</style>
