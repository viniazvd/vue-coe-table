function removeGaps (array) {
  const props =
    Array.from(
      array.reduce((acc, item) => {
        Object.keys(item).forEach(key => acc.add(key))

        return acc
      }, new Set([]))
    )

  return array.map(item =>
    props.reduce((obj, key) => {
      obj[key] = item[key] || null
      return obj
    }, {})
  )
}

export default removeGaps
