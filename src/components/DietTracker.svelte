<script>
    import { getFactsByBarcode } from '../service/dietFetch'
    import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
    import { Device } from '@capacitor/device'
    // TODO - remove default barcode
    let barcode = '0711575102005'
    let foodData = {}

    const getData = async () => {
        window.event.preventDefault()
        const rawData = (await getFactsByBarcode(barcode)).product
        barcode = ''

        foodData.name = rawData.product_name
        foodData.servingSize = rawData.serving_size
        foodData.nutrients = {
            calories: rawData.nutriments['energy-kcal_serving'],
            carbs: rawData.nutriments.carbohydrates_serving,
            fat: rawData.nutriments.fat_serving,
            protein: rawData.nutriments.proteins_serving,
        }
    }

    const startScan = async () => {
        if ((await Device.getInfo()).platform === 'web') {
            stopScan()

            alert(
                'Barcode scan not available on web, type in 13 digit code and select get data'
            )
        }
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

    const stopScan = () => {
        BarcodeScanner.showBackground()
        BarcodeScanner.stopScan()
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
        {#if foodData}
            <p>Data: {JSON.stringify(foodData)}</p>
        {:else}
            <p>Add barcode</p>
        {/if}
    </div>
</main>

<style>
    :global(body.scanner-active) {
        --background: transparent;
        --ion-background-color: transparent;
    }
</style>
