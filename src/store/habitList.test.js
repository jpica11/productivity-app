import { checkDailyTasksComplete } from './habitList'

beforeEach(() => {
    jest.spyOn(window.localStorage.__proto__, 'setItem')
})

test('', () => {
    console.log('test')
})
