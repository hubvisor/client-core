import { pause, defer } from '../promise'

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
})
