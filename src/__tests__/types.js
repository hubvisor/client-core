import { isString, isBool, isFunc, isArray, isObj } from '../types'

// we WANT to test functions against boxed values
/* eslint-disable no-new-wrappers */

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

  pushSample(undefined)
  pushSample(null)
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
    [Type.bool]: isBool,
    [Type.string]: isString,
    [Type.func]: isFunc,
    [Type.array]: isArray,
    [Type.object]: isObj
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

  test('isString', () => {
    testTypes(samples, Type.string)
  })

  test('isBool', () => {
    testTypes(samples, Type.bool)
  })

  test('isFunc', () => {
    testTypes(samples, Type.func)
  })

  test('isArray', () => {
    testTypes(samples, Type.array)
  })

  test('isObj', () => {
    testTypes(samples, Type.object)
  })
})
