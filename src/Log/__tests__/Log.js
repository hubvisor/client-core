import Log from '..'

describe('Log', () => {
  let consoleLog
  let consoleWarn
  let consoleError

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
    const log = Log.console()
    log.info(...logArgs)
    expect(consoleLog).toMatchSnapshot()
  })

  test('with name', () => {
    const log = Log.console({ name: 'TEST' })
    log.info(...logArgs)
    expect(consoleLog).toMatchSnapshot()
  })

  test('no tag', () => {
    const log = Log.console({ name: 'TEST' })
    log.info(...logArgs)
    expect(consoleLog).toMatchSnapshot()
  })

  test('one tag', () => {
    const log = Log.console({ name: 'TEST' })
    log.tag('tag').info(...logArgs)
    expect(consoleLog).toMatchSnapshot()
  })

  test('chain tag', () => {
    const log = Log.console({ name: 'TEST' })
    log.tag('tag1').tag('tag2').info(...logArgs)
    expect(consoleLog).toMatchSnapshot()
  })

  test('levels', () => {
    const log = Log.console()
    log.trace('test')
    log.debug('test')
    log.info('test')

    expect(consoleLog).toMatchSnapshot()
    expect(consoleWarn).toMatchSnapshot()
    expect(consoleError).toMatchSnapshot()
  })

  test('noop log', () => {
    const log = Log.noop()
    log.trace('test')
    log.debug('test')
    log.info('test')

    expect(consoleLog).toMatchSnapshot()
    expect(consoleWarn).toMatchSnapshot()
    expect(consoleError).toMatchSnapshot()
  })
})
