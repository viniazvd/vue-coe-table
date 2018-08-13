import isNumber from './isNumber'

const toggleOrder = (row, icon) => (a, b) => {
  if (isNumber(a[row], b[row])) {
    return icon === '▲' ? b[row] - a[row] : a[row] - b[row]
  }

  return icon === '▲' ? a[row] < b[row] : a[row] > b[row]
}

export default toggleOrder
