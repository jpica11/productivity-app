import { render, screen } from '@testing-library/svelte'
import ExerciseTracker from '../../components/ExerciseTracker.svelte'

describe('ExerhciseTracker', () => {
    test('should render the component', () => {
        render(ExerciseTracker)

        const header = screen.getByText(/Exercise Tracker Component/)

        expect(header).toBeTruthy()
    })
})
