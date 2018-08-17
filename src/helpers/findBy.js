function findBy (
  list = [], 
  strings = '', 
  keys = [], 
  terms = strings.toLowerCase().split(' ')
) {
  return list
    .filter(el => terms
      .some(v => keys
        .some(k => el[ k ].toLowerCase().includes(v))))
}

export default findBy
