import { poll, constantInterval } from '../poll'

const next = () => new Promise((resolve) => setImmediate(resolve))

describe('poll', () => {
  test('poll getting value within deadline', async () => {
    jest.useFakeTimers()

    let value
    const fetchValue = jest.fn(() => value)
    const checkValue = () => poll(constantInterval({ interval: 0.1, maxTryCount: 10 }), fetchValue)
    const firstStep = checkValue()
    expect(fetchValue).toHaveBeenCalledTimes(1)

    await next()
    jest.advanceTimersByTime(110)
    await next()
    expect(fetchValue).toHaveBeenCalledTimes(2)

    jest.advanceTimersByTime(110)
    await next()

    value = 42

    jest.advanceTimersByTime(110)
    await next()
    expect(fetchValue).toHaveBeenCalledTimes(4)

    expect(await firstStep).toBe(42)
  })

  test('poll without value within deadline', async () => {
    jest.useFakeTimers()

    let value
    const fetchValue = jest.fn(() => value)
    const checkValue = () => poll(constantInterval({ interval: 0.1, maxTryCount: 10 }), fetchValue)
    const firstStep = checkValue()
    expect(fetchValue).toHaveBeenCalledTimes(1)

    // Let's reach the deadline
    for (let i = 0; i < 10; ++i) {
      jest.advanceTimersByTime(100)
      await next()
    }
    expect(fetchValue).toHaveBeenCalledTimes(10)
    expect(await firstStep).toBeUndefined()

    // Let's go one second further than the deadline
    for (let i = 0; i < 10; ++i) {
      jest.advanceTimersByTime(100)
      await next()
    }
    expect(fetchValue).toHaveBeenCalledTimes(10)
  })
})
