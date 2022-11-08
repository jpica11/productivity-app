import DietTracker from '../../components/DietTracker.svelte'

describe('DietTracker', () => {
    test('should render the component', () => {
        const host = document.createElement('div')

        // Append the new container in the HTML body
        document.body.appendChild(host)

        // Create an instance of the vertical tab
        const instance = new DietTracker({ target: host })

        // Check if the instance has value
        expect(instance).toBeTruthy()
    })
})
