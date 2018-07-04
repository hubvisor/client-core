import once from '../once'

describe('once', () => {
  test('calls once', () => {
    const tested = jest.fn()
    const callOnce = once(tested)

    expect(tested).not.toBeCalled()

    callOnce()
    expect(tested).toBeCalled()

    callOnce()
    expect(tested).toHaveBeenCalledTimes(1)
  })

  test('forwards arguments', () => {
    const tested = jest.fn()
    const callOnce = once(tested)

    const args = [ { foo: 'bar' }, 42 ]
    callOnce(...args)
    expect(tested).toBeCalledWith(...args)
  })

  test('memoize result', () => {
    let unique = 0
    const tested = jest.fn(() => unique++)
    const callOnce = once(tested)

    const first = callOnce()
    const second = callOnce()
    expect(first).toBe(second)
  })
})
