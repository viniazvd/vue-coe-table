import isNumber from './isNumber'

export const iconOrderOne = (cols, index) => (a, b) => {
  const rowIsNumber = isNumber(a, b)
  const icon = cols[index].iconToSort

  if (icon === '▼' && rowIsNumber) return a - b

  if (icon === '▲' && rowIsNumber) return b - a

  if (icon === '▲' && !rowIsNumber) return a > b

  if (icon === '▼' && !rowIsNumber) return a < b
}

export const iconOrderAll = (icon, row) => (a, b) => {
  const rowIsNumber = isNumber(a[row], b[row])

  if (icon === '▼' && rowIsNumber) return a[row] - b[row]

  if (icon === '▲' && rowIsNumber) return b[row] - a[row]

  if (icon === '▲' && !rowIsNumber) return a[row] < b[row]

  if (icon === '▼' && !rowIsNumber) return a[row] > b[row]
}