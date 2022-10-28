<script>
    import { getFactsByBarcode } from '../service/dietFetch'
    import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
    import { Device } from '@capacitor/device'
    import { onDestroy } from 'svelte'

    // TODO - remove default barcode
    let barcode = '0711575102005'
    let foodData = {}
    let showForm = true

    // Prepares scanner to speed up load times
    BarcodeScanner.prepare()

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
            // TODO - remove show camera call and add error message for web instead
            showCamera()
            return
        }
        // Check camera permission
        // This is just a simple example, check out the better checks below
        await BarcodeScanner.checkPermission({ force: true })

        await showCamera()

        console.log('Camera overlay showing, about to scan')
        const result = await BarcodeScanner.startScan() // start scanning and wait for a result

        // if the result has content
        if (result.hasContent) {
            console.log(result.content) // log the raw scanned content
            barcode = result.content
            await closeCamera()
            getData()
        }
    }

    const stopScan = async () => {
        await BarcodeScanner.showBackground()
        BarcodeScanner.stopScan()
    }

    const showCamera = async () => {
        showForm = false
        console.log(
            '🚀 ~ file: DietTracker.svelte ~ line 62 ~ showCamera ~ showForm',
            showForm
        )
        await BarcodeScanner.hideBackground()
        document.getElementsByTagName('header')[0].style.visibility = 'hidden'
    }

    const closeCamera = () => {
        document.getElementsByTagName('header')[0].style.visibility = ''
        showForm = true
        stopScan()
    }

    onDestroy(() => BarcodeScanner.stopScan())
</script>

<main>
    {#if showForm}
        <form>
            <input bind:value={barcode} type="text" placeholder="Barcode" />
            <button on:click={getData}>Get Data</button>
            <button on:click={startScan}>Scan for barcode</button>
        </form>
        <div>
            <p>Data: {JSON.stringify(foodData)}</p>
        </div>
    {:else}
        <div class="scan-box" />
        <button class="close-button" on:click={closeCamera}
            >Stop scanning</button
        >
    {/if}
</main>

<style>
    .scan-box {
        border: 2px solid white;
        box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.5);
        content: '';
        display: block;
        left: 50%;
        height: 300px;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
    }

    .close-button {
        position: fixed;
        left: 0;
        bottom: 50px;
        width: 100%;
        background-color: white;
        color: black;
        text-align: center;
    }
</style>
