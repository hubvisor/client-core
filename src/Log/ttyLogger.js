import { hashCode } from '../util'
import chalk from 'chalk'

// ttyLogger can be used in tests !

// generates a unique color for each tag according to the string to quickly identify each sub-system tag
function colorFromTag (tag) {
  if (!tag) { return [ 200, 31, 55 ] }

  const angle = Math.PI // because why not
  // hue depend on tag hash, saturation and value are hand-picked from a flat color
  const hue = (hashCode(tag) * angle) % 360
  const saturation = 70
  const value = 53

  return [ hue, saturation, value ]
}

const levelColors = {
  debug: '#9C27B0',
  info: '#4CAF50',
  warn: '#FF9800',
  error: '#F44336'
}

function createBadge ({ level, name, tag }) {
  const tagColor = colorFromTag(tag)
  const levelColor = levelColors[level] || '#00000'
  const items = [
    {
      value: ` ${name} `,
      formatter: chalk.bold.hex('#ffffff').bgHex('#4D4D4D')
    }, {
      value: ` ${level.toUpperCase()} `,
      formatter: chalk.bold.hex('#ffffff').bgHex(levelColor)
    }, {
      value: ` ${tag} `,
      formatter: chalk.bold.hex('#ffffff').bgHsl(...tagColor)
    }
  ]
    .filter(item => item.value)
    .map(({ value, formatter }) => formatter(value))

  return [ items.join('') ]
}

export default function consoleLogger ({ level, name, tag, items }) {
  const consoleOutputs = {
    table: console.table
  }
  const badge = level === 'table' ? [] : createBadge({ name, level, tag })
  const output = consoleOutputs[level] || console.log
  return output(...badge, ...items)
}
