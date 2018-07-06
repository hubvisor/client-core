import forEach from '../forEach'

describe('reduce', () => {
  describe('Array', () => {
    test('empty', () => {
      const cb1 = jest.fn()
      const cb2 = jest.fn()
      const empty = []

      forEach(empty, cb1)
      empty.forEach(cb2)

      expect(cb1.mock.calls).toEqual(cb2.mock.calls)
    })

    test('non-empty', () => {
      const cb1 = jest.fn()
      const cb2 = jest.fn()
      const array = [ 1, 2, 3 ]

      forEach(array, cb1)
      array.forEach(cb2)

      expect(cb1.mock.calls).toEqual(cb2.mock.calls)
    })
  })

  describe('Object', () => {
    const object = { foo: 42, bar: 10 }

    test('empty', () => {
      const empty = {}
      const cb = jest.fn()

      forEach(empty, cb)

      expect(cb.mock.calls).toEqual([])
    })

    test('non-empty', () => {
      const empty = {}
      const cb = jest.fn()

      forEach(empty, cb)

      expect(cb).toMatchSnapshot()
    })
  })
})
