import { _reduce } from '../collection'

const sum = (memo, current) => memo + current

describe('_reduce', () => {
  describe('Array', () => {
    test('without initial value', () => {
      expect(_reduce([ 1, 2, 3 ], sum)).toEqual([ 1, 2, 3 ].reduce(sum))
    })

    test('with initial value', () => {
      expect(_reduce([ 1, 2, 3 ], sum, 10)).toEqual([ 1, 2, 3 ].reduce(sum, 10))
    })

    test('empty without initial value', () => {
      expect(() => {
        _reduce([], sum)
      }).toThrow()
    })
  })

  describe('Object', () => {

  })
})
