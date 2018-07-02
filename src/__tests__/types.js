import { isstring, isbool, isfunc, isarray, isobj } from '../types'

class TestClass {}

const Type = {
  bool: 'bool',
  string: 'string',
  func: 'func',
  array: 'array',
  object: 'object'
}

function buildSamples () {
  const samples = []
  const pushSample = (val, ...types) => {
    samples.push({ value: val, types: new Set(types) })
  }

  pushSample(true, Type.bool)
  pushSample(false, Type.bool)
  pushSample(new Boolean(false), Type.bool, Type.object)
  pushSample(new Boolean('true'), Type.bool, Type.object)
  pushSample(Object(true), Type.bool, Type.object)
  pushSample('', Type.string)
  pushSample('foobar', Type.string)
  pushSample(`Hello ${42}`, Type.string)
  pushSample('true', Type.string)
  pushSample('42', Type.string)
  pushSample(new String('hello'), Type.string, Type.object)
  pushSample(() => 42, Type.func)
  pushSample(function testFunc () {}, Type.func)
  pushSample(TestClass, Type.func)
  pushSample((new Date()).constructor, Type.func)
  pushSample([], Type.array, Type.object)
  pushSample([ 'foo', 'bar' ], Type.array, Type.object)
  pushSample(new Array(5), Type.array, Type.object)
  pushSample({ foo: 42, bar: 'baz' }, Type.object)
  pushSample(new TestClass(), Type.object)
  pushSample({}, Type.object)

  return samples
}

function testTypes (samples, testedType) {
  const testFuncs = {
    [Type.bool]: isbool,
    [Type.string]: isstring,
    [Type.func]: isfunc,
    [Type.array]: isarray,
    [Type.object]: isobj
  }

  const testedFunc = testFuncs[testedType]

  samples.forEach(({ value, types }) => {
    const kindOfTestedType = types.has(testedType)
    expect(testedFunc(value)).toBe(kindOfTestedType)
  })
}

// ---

describe('types', () => {
  const samples = buildSamples()

  test('isstring', () => {
    testTypes(samples, Type.string)
  })

  test('isbool', () => {
    testTypes(samples, Type.bool)
  })

  test('isfunc', () => {
    testTypes(samples, Type.func)
  })

  test('isarray', () => {
    testTypes(samples, Type.array)
  })

  test('isobj', () => {
    testTypes(samples, Type.object)
  })
})
