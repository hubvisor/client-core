import debounce from '../debounce'

describe('debounce', () => {
  jest.useFakeTimers()

  test('debounce', () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 1)

    expect(fn).not.toHaveBeenCalled()

    debounced() // t = 0
    expect(fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(500)
    debounced() // should trigger at 1500
    jest.advanceTimersByTime(700) // t = 1200
    expect(fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(400) // t = 1600
    expect(fn).toHaveBeenCalled()

    // it should be able to re-debounce after first call

    debounced() // t = 0
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(1100) // t = 1100
    expect(fn).toHaveBeenCalledTimes(2)
  })

  test('arguments', () => {
    const fn = jest.fn()
    const debounced = debounce(fn, 1)

    expect(fn).not.toHaveBeenCalled()

    debounced(0)
    expect(fn).not.toHaveBeenCalled()

    debounced(2)
    expect(fn).not.toHaveBeenCalled()

    debounced(4)
    expect(fn).not.toHaveBeenCalled()

    debounced(42)
    expect(fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1100)
    expect(fn).toHaveBeenCalledWith(42)
  })
})
