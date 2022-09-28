<script>
    import { journalList } from '../store/journal-list'

    let entry = ''
    let title = ''

    const addToList = () => {
        console.log(
            `addToList: ${JSON.stringify(entry)} ${JSON.stringify(title)}`
        )
        window.event.preventDefault()

        $journalList = [
            ...$journalList,
            { title: title, entry: entry, time: Date.now() },
        ]
    }

    const deleteEntry = (index) => {
        $journalList.splice(index, 1)
        $journalList = $journalList
    }
</script>

<main>
    <h1>Journal Component</h1>
    <form class="journal-form">
        <div class="form-group">
            <label>Title</label>
            <input
                bind:value={title}
                class="form-control"
                type="text"
                name="postName"
            />
            <label>Post</label>
            <textarea
                bind:value={entry}
                class="form-control"
                name="post"
                rows="5"
            />
        </div>
        <button
            on:click={addToList}
            class="btn btn-primary"
            type="submit"
            name="button">Publish</button
        >
    </form>

    <div class="prior-entries">
        {#each $journalList as entry, index}
            <div>
                {entry.title}: {entry.entry} : {entry.time}
                <span on:click={() => deleteEntry(index)}> X </span>
            </div>
        {/each}
    </div>
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
