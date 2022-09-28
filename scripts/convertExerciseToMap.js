const fs = require('fs')

fs.readFile('./../public/exercises.json', (err, data) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`)
    }

    // parse JSON string to JSON object
    const json = JSON.parse(data)

    json.forEach((item) => {
        console.log(`${item.name}: ${item.equipment}`)
    })
})
