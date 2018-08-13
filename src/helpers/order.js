import isNumber from './isNumber'

const toggleOrder = (row, icon) => (a, b) => {
  const typeOfNumber = isNumber(a[row], b[row])

  if (icon === '▼' && typeOfNumber) return a[row] - b[row]
  if (icon === '▲' && typeOfNumber) return b[row] - a[row]
  if (icon === '▲' && !typeOfNumber) return a[row] < b[row]
  if (icon === '▼' && !typeOfNumber) return a[row] > b[row]
}

export default toggleOrder
