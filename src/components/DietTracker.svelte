<script>
    import { getFactsByBarcode } from '../service/dietFetch'
    import { BarcodeScanner } from '@capacitor-community/barcode-scanner'
    import { Device } from '@capacitor/device'
    import { onDestroy } from 'svelte'
    import { dailyDietData } from '../store/diet-tracker-store'

    const getPlatform = async () => (await Device.getInfo()).platform

    let platform = getPlatform()

    // Prepares scanner to speed up load times
    BarcodeScanner.prepare()

    // Test barcode: 052000047066
    let barcode = ''
    let foodData = {}
    let showForm = true

    // Handle calorie data
    let calorieGoal = 2000
    let currentCalories = 0

    // Handle Macro Data
    let totalProtein = 0
    let totalCarbs = 0
    let totalFat = 0

    //
    // Component functions
    //

    /**
     * Call API to get food data from barcode
     */
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

        processData(foodData)
    }

    /**
     * Scan for barcode
     */
    const startScan = async () => {
        window.event.preventDefault()
        if ((await Device.getInfo.platform) === 'web') {
            // TODO - add error message for web instead
            return
        }

        // Check camera permission
        // TODO - Add more inclusive permission check
        await BarcodeScanner.checkPermission({ force: true })

        await showCamera()
        console.log('Camera overlay showing, starting scanner...')

        const result = await BarcodeScanner.startScan()

        if (result && result.hasContent) {
            console.log(result.content) // log the raw scanned content
            barcode = result.content
            closeCamera()
            getData()
        }
    }

    const stopScan = async () => {
        await BarcodeScanner.showBackground()
        BarcodeScanner.stopScan()
    }

    const showCamera = async () => {
        showForm = false

        await BarcodeScanner.hideBackground()
        document.getElementsByTagName('header')[0].style.visibility = 'hidden'
    }

    const closeCamera = () => {
        document.getElementsByTagName('header')[0].style.visibility = ''
        showForm = true
        stopScan()
    }

    /**
     * Update total daily data with new ingested data
     * @param foodData 040000422082
     */
    const processData = (foodData) => {
        if (!foodData || !foodData.nutrients) {
            return
        }

        $dailyDietData.currentCalories += foodData.nutrients.calories || 0

        $dailyDietData.totalProtein += foodData.nutrients.protein || 0
        $dailyDietData.totalCarbs += foodData.nutrients.carbs || 0
        $dailyDietData.totalFat += foodData.nutrients.fat || 0

        $dailyDietData.currentDate = new Date().toLocaleDateString()
    }

    /**
     * Check if daily data has expired
     */
    setInterval(() => {
        if (
            localStorage.getItem('DIET_DATA') &&
            JSON.parse(localStorage.getItem('DIET_DATA')).currentDate !=
                new Date().toLocaleDateString()
        ) {
            console.log('Daily session expired, reloading page...')
            $dailyDietData = {
                currentCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFat: 0,
                currentDate: new Date().toLocaleDateString(),
            }
            foodData = {}
        }
    }, 60000)

    /**
     * Stop scanner when component is destroyed
     */
    onDestroy(() => BarcodeScanner.stopScan())
</script>

<main>
    <!-- TODO - Move camera to separate component -->
    {#if showForm}
        <div class="daily-progress">
            Calories: {`${$dailyDietData.currentCalories}/${calorieGoal}`}

            <b>Macros: </b>
            Carbohydrates: {`${$dailyDietData.totalCarbs}`}
            Protein: {`${$dailyDietData.totalProtein}`}
            Fat: {`${$dailyDietData.totalFat}`}

            <form>
                <input
                    bind:value={calorieGoal}
                    type="text"
                    placeholder="Barcode"
                />
            </form>
        </div>

        <form>
            {#await platform then devicePlatform}
                {#if devicePlatform === 'web'}
                    <label>
                        Barcode scanner not available on web, please enter
                        barcode manually:
                    </label>
                    <input
                        bind:value={barcode}
                        type="text"
                        placeholder="Barcode"
                    />
                    <button on:click={getData}>Get Data</button>
                {:else}
                    <button on:click={startScan}>Scan for barcode</button>
                {/if}
            {/await}
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
