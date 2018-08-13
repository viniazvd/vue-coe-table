import isNumber from './isNumber'

// const toggleOrder = (row, icon) => (a, b) => {
//   const typeOfNumber = isNumber(a[row], b[row])

//   if (icon === '▼' && typeOfNumber) return a[row] - b[row]
//   if (icon === '▲' && typeOfNumber) return b[row] - a[row]
//   if (icon === '▲' && !typeOfNumber) return a[row] < b[row]
//   if (icon === '▼' && !typeOfNumber) return a[row] > b[row]
// }

const condition = (isA, a, b) => isA ? a : b

const toggleOrder = (row, icon) => (a, b) => {
  return condition(
    isNumber(a[row], b[row]),
    condition(icon === '▲', a[row] - b[row], b[row] - a[row]),
    condition(icon === '▲', a[row] < b[row], a[row] > b[row])
  )
}

export default toggleOrder
