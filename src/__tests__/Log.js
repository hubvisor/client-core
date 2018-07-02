import Log from '../log'

describe('Log', () => {
  let consoleLog
  let consoleWarn
  let consoleError
  let log

  beforeEach (() => {
    consoleLog = jest.spyOn(console, 'log')
    consoleWarn = jest.spyOn(console, 'warn')
    consoleError = jest.spyOn(console, 'error')
    const mocks = [ consoleLog, consoleWarn, consoleError ]

    // hide logs while running these tests
    mocks.forEach(mock => mock.mockImplementation(() => { /* do nothing */ }))
  })

  afterEach (() => {
    [ consoleLog, consoleWarn, consoleError ].forEach(mock => {
      mock.mockReset()
      mock.mockRestore()
    })
  })

  const logArgs = [ 'foo', 'bar', 42, { foo: 'bar' } ]
  const badge = 1
  const nameColor = 1
  const levelColor = 1
  const tagColor = 1

  test('without name', () => {
    const log = new Log()
    log.info(...logArgs)
    const callArgs = consoleLog.mock.calls[0]
    expect(callArgs[0]).toBe('%cinfo')
    expect(callArgs.length).toBe(logArgs.length + badge + levelColor)
  })

  test('with name', () => {
    const log = new Log({ name: 'TEST' })
    log.info(...logArgs)
    const callArgs = consoleLog.mock.calls[0]
    expect(callArgs[0]).toBe('%cTEST%cinfo')
    expect(callArgs.length).toBe(logArgs.length + badge + nameColor + levelColor)
  })

  test('no tag', () => {
    const log = new Log({ name: 'TEST' })
    log.info(...logArgs)
    const callArgs = consoleLog.mock.calls[0]
    expect(callArgs[0]).toBe('%cTEST%cinfo')
    expect(callArgs.length).toBe(logArgs.length + badge + nameColor + levelColor)
  })

  test('one tag', () => {
    const log = new Log({ name: 'TEST' })
    log.tag('tag').info(...logArgs)
    const callArgs = consoleLog.mock.calls[0]
    expect(callArgs[0]).toBe('%cTEST%cinfo%ctag')
    expect(callArgs.length).toBe(logArgs.length + badge + nameColor + levelColor + tagColor)
  })

  test('chain tag', () => {
    const log = new Log({ name: 'TEST' })
    log.tag('tag1').tag('tag2').info(...logArgs)
    const callArgs = consoleLog.mock.calls[0]
    expect(callArgs[0]).toBe('%cTEST%cinfo%ctag2')
    expect(callArgs.length).toBe(logArgs.length + badge + nameColor + levelColor + tagColor)
  })

  test('levels', () => {
    const log = new Log()
    log.trace('test')
    log.debug('test')
    log.info('test')

    expect(consoleLog.mock.calls.length).toBe(3)

    log.warn('test')

    expect(consoleWarn.mock.calls.length).toBe(1)

    log.error('test')

    expect(consoleError.mock.calls.length).toBe(1)
  })
})
