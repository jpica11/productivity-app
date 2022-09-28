<script>
    import { getFactsByBarcode } from '../service/dietFetch'

    // TODO - remove default barcode
    let barcode = '012000206856'
    let foodData = ''
    const getData = async () => {
        window.event.preventDefault()
        foodData = await getFactsByBarcode(barcode)
        barcode = ''
    }
</script>

<main>
    <h1>Diet Tracker Component</h1>

    <form>
        <input bind:value={barcode} type="text" placeholder="Barcode" />
        <button on:click={getData}>Get Data</button>
    </form>
    <div>
        {#if foodData && foodData.product}
            <p>Data: {JSON.stringify(foodData.product.product_name)}</p>
        {:else}
            <p>Add barcode</p>
        {/if}
    </div>
</main>

<style>
</style>
