<script>
    import { groceries } from '../store/groceryList'
    let newTask = ''

    function addToList() {
        $groceries = [
            ...$groceries,
            { name: newTask, completed: false, subtask: [] },
        ]
        window.event.preventDefault()
        newTask = ''
    }

    function addSubtaskToList(item, index) {
        item.subtask = [
            ...item.subtask,
            { name: item.placeholder, completed: false, subtask: [] },
        ]
        $groceries.splice(index, 1, item)
        $groceries = $groceries

        window.event.preventDefault()
    }

    function removeFromList(index) {
        $groceries.splice(index, 1)
        $groceries = $groceries
    }

    function removeSubtaskFromList(item, index, subIndex) {
        item.subtask.splice(subIndex, 1)

        $groceries.splice(index, 1, item)
        $groceries = $groceries
    }

    function showSubtaskForm() {
        ;[...document.getElementsByClassName('subtask-form')].forEach(
            (element) => {
                element.style.display === 'none'
                    ? (element.style.display = 'inline')
                    : (element.style.display = 'none')
            }
        )
    }
</script>

<h1>Grocery List</h1>
<div class="component">
    <form>
        <input
            class="todo-enter-input"
            bind:value={newTask}
            type="text"
            placeholder="Grocery Item"
        />
        <button class="todo-enter-button" on:click={addToList}>Add</button>
    </form>

    <br />
    {#each $groceries as item, index}
        <div class="task-container">
            <input bind:checked={item.completed} type="checkbox" />
            <h2 class:checked={item.completed}>{item.name}</h2>
            <span
                class="task-remove-button"
                on:click={() => removeFromList(index)}>❌</span
            >
        </div>
        {#each item.subtask as subtask, subIndex}
            <div class="subtask-container">
                <input
                    bind:checked={item.subtask[subIndex].completed}
                    type="checkbox"
                />
                <span
                    class:checked={item.subtask[subIndex].completed ||
                        item.completed}>{subtask.name}</span
                >
                <span
                    on:click={() =>
                        removeSubtaskFromList(item, index, subIndex)}>❌</span
                >
            </div>
            <br />
        {/each}
        <div class="subtask-form-container">
            <h3 on:click={showSubtaskForm}>+</h3>
            <br />
            <form class="subtask-form">
                <input
                    bind:value={item.placeholder}
                    type="text"
                    placeholder="new subtask.."
                />
                <button on:click={() => addSubtaskToList(item, index)}
                    >Add</button
                >
            </form>
        </div>
    {/each}
</div>

<style>
    .component {
        display: flex;
        text-align: center;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        width: 75%;
        padding-left: 12.5%;
        padding-right: 12.5%;
    }

    .todo-enter-input {
        width: 50vw;
        height: 7.5vh;
    }
    .todo-enter-button {
        width: 10vw;
        height: 7.5vh;
    }

    .task-container {
        display: flex;
        text-align: center;
        justify-content: left;
        align-items: center;

        width: 60vw;
    }

    input[type='checkbox'] {
        margin: 0 1vw 0 0;
    }
    .checked {
        text-decoration: line-through;
    }

    .task-remove-button {
        margin-left: 1vw;
    }

    .subtask-form-container {
        display: flex;
        text-align: center;
        justify-content: left;
        align-items: center;

        width: 55vw;
    }

    .subtask-form {
        display: none;
    }

    .subtask-container {
        display: flex;
        justify-content: left;
        align-items: center;
        margin: 0 1vw 0 0;
        width: 55vw;
    }

    .plus-button {
    }
</style>
