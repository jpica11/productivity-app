<script>
    import { todo, getData } from '../store/todo'
    let newTask = ''

    const test = getData(
        'https://3f9bwbv068.execute-api.us-east-1.amazonaws.com/prod/productivity-app/test?id=test1&type=test&amount=test'
    )

    function addToList() {
        $todo = [...$todo, { name: newTask, completed: false, subtask: [] }]
        window.event.preventDefault()
        newTask = ''
    }

    function addSubtaskToList(item, index) {
        item.subtask = [
            ...item.subtask,
            { name: item.placeholder, completed: false, subtask: [] },
        ]
        $todo.splice(index, 1, item)
        $todo = $todo

        window.event.preventDefault()
    }

    function removeFromList(index) {
        $todo.splice(index, 1)
        $todo = $todo
    }

    function removeSubtaskFromList(item, index, subIndex) {
        item.subtask.splice(subIndex, 1)

        $todo.splice(index, 1, item)
        $todo = $todo
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

<h1>TO-DO LIST COMPONENT</h1>
{#await $test}
    {JSON.stringify($test)}
{/await}

<div class="component">
    <form>
        <input
            class="todo-enter-input"
            bind:value={newTask}
            type="text"
            placeholder="New TODO Item..."
        />
        <button class="todo-enter-button" on:click={addToList}>Add</button>
    </form>

    <br />
    {#each $todo as item, index}
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
