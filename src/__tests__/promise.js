import { pause, defer, poll } from '../promise'

describe('promise', () => {
  test('pause', async () => {
    jest.useFakeTimers()
    const callback = jest.fn()

    const pausePromise = pause(1.5).then(callback)

    // at 1sec callback should not yet be called
    jest.advanceTimersByTime(1000)
    expect(callback).not.toBeCalled()

    // after delay, callback should have been called
    jest.advanceTimersByTime(1600)
    await (() => pausePromise)() // we have to await because there is a run loop operation in 'resolve'

    expect(callback).toBeCalled()
  })

  describe('defer', () => {
    test('resolve', () => {
      const resolved = jest.fn()
      const { promise, resolve } = defer()

      expect(resolved).not.toHaveBeenCalled()

      const resolvedValue = 'foo'
      resolve(resolvedValue)

      return expect(promise).resolves.toEqual(resolvedValue)
    })

    test('reject', () => {
      const rejected = jest.fn()
      const { promise, reject } = defer()

      expect(rejected).not.toHaveBeenCalled()

      const rejectedValue = new Error('foo')
      reject(rejectedValue)

      return expect(promise).rejects.toEqual(rejectedValue)
    })
  })

  test('poll getting value within deadline', async () => {
    jest.useFakeTimers()

    let value
    const fetchValue = jest.fn(() => value)
    const checkValue = () => poll({ interval: 0.1, deadline: 1 }, fetchValue)
    const firstStep = checkValue()
    expect(fetchValue).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(100)
    await 'the next runloop'
    expect(fetchValue).toHaveBeenCalledTimes(2)

    jest.advanceTimersByTime(100)
    await 'the next runloop'

    value = 42

    jest.advanceTimersByTime(100)
    await 'the next runloop'
    expect(fetchValue).toHaveBeenCalledTimes(4)

    expect(await firstStep).toBe(42)
  })

  test('poll without value within deadline', async () => {
    jest.useFakeTimers()

    let value
    const fetchValue = jest.fn(() => value)
    const checkValue = () => poll({ interval: 0.1, deadline: 1 }, fetchValue)
    const firstStep = checkValue()
    expect(fetchValue).toHaveBeenCalledTimes(1)

    // Let's reach the deadline
    for (let i = 0; i < 10; ++i) {
      jest.advanceTimersByTime(100)
      await 'the next runloop'
    }
    expect(fetchValue).toHaveBeenCalledTimes(10)
    expect(await firstStep).toBeUndefined()

    // Let's go one second further than the deadline
    for (let i = 0; i < 10; ++i) {
      jest.advanceTimersByTime(100)
      await 'the next runloop'
    }
    expect(fetchValue).toHaveBeenCalledTimes(10)
  })
})
