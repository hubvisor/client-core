import { hashCode } from '../util'

// generates a unique color for each tag according to the string to quickly identify each sub-system tag
function colorFromTag (tag) {
  if (!tag) { return '#607D8B' }

  const angle = Math.PI // because why not
  // hue depend on tag hash, saturation and value are hand-picked from a flat color
  const hue = (hashCode(tag) * angle) % 360
  const saturation = 70
  const value = 53
  return `hsl(${hue}, ${saturation}%, ${value}%)`
}

const levelColors = {
  debug: '#9C27B0',
  info: '#4CAF50',
  warn: '#FF9800',
  error: '#F44336'
}

function createBadge ({ level, name, tag }) {
  const tagColor = colorFromTag(tag)
  const levelColor = levelColors[level] || '#000'
  const badge = [
    {
      value: name,
      style: 'background: linear-gradient(#4D4D4D, #5D5D5D); color: #fff; padding: 2px 4px; border-top-left-radius: 4px; border-bottom-left-radius: 4px;'
    }, {
      value: level,
      style: `background: ${levelColor}; color: #fff; padding: 2px 4px;`
    }, {
      value: tag,
      style: `background: ${tagColor}; color: #fff; padding: 2px 2px; border-top-right-radius: 4px; border-bottom-right-radius: 4px;`
    }
  ].filter(item => item.value)

  const badgeFormatString = badge.map(item => `%c${item.value}`).join('')
  const badgeArgs = badge.map(item => item.style)
  return [ badgeFormatString, ...badgeArgs ]
}

export default function consoleLogger ({ level, name, tag, items }) {
  const consoleOutputs = {
    table: console.table,
    warn: console.warn,
    error: console.error
  }
  const badge = level === 'table' ? [] : createBadge({ name, level, tag })
  const output = consoleOutputs[level] || console.log

  return output(...badge, ...items)
}
