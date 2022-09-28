const OPEN_FOOD_FACTS_API = 'https://world.openfoodfacts.org/api/2'

export const getFactsByBarcode = async (barcode) => {
    const response = await fetch(
        `${OPEN_FOOD_FACTS_API}/product/${barcode}.json`
    )
    return response.json()
}

export const searchByCategory = async (category) => {
    const response = await fetch(`${OPEN_FOOD_FACTS_API}/${barcode}.json`)
}
