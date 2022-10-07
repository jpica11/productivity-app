<script>
    import { getFactsByBarcode } from '../service/dietFetch'
    import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
    // TODO - remove default barcode
    let barcode = '012000206856'
    let foodData = ''
    const getData = async () => {
        window.event.preventDefault()
        foodData = await getFactsByBarcode(barcode)
        barcode = ''
    }

    const startScan = async () => {
        // Check camera permission
        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({ force: true })

        // make background of WebView transparent
        // note: if you are using ionic this might not be enough, check below
        BarcodeScanner.hideBackground()

        const result = await BarcodeScanner.startScan() // start scanning and wait for a result

        // if the result has content
        if (result.hasContent) {
            console.log(result.content) // log the raw scanned content
            barcode = result.content
        }
    }
</script>

<main>
    <h1>Diet Tracker Component</h1>

    <form>
        <input bind:value={barcode} type="text" placeholder="Barcode" />
        <button on:click={getData}>Get Data</button>
        <button on:click={startScan}>Scan for barcode</button>
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
