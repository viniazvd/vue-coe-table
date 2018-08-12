import isNumber from '../helpers/isNumber'

const sortable = {
  methods: {
    handlerSortOne (row, index) {
      this._cols.map((_col, _index) => {
        _index === index && _col.iconToSort === '▼'
          ? _col.iconToSort = '▲'
          : _col.iconToSort = '▼'

        return _col
      })

      const ordered = this._rows
        .map(_row => _row[row])
        .sort((a, b) => {
          const operator = isNumber(a, b)
          const iconToSort = this._cols[index].iconToSort

          if (iconToSort === '▼' && operator === true) return a - b

          if (iconToSort === '▲' && operator === true) return b - a

          if (iconToSort === '▲' && operator === false) return a < b

          if (iconToSort === '▼' && operator === false) return a > b
        })

      return this.rows.map((_row, index) => {
        _row[row] = ordered[index]

        return _row
      })
    },

    handlerSortAll (row) {
      this.iconToSortAll === '▼' ? this.iconToSortAll = '▲' : this.iconToSortAll = '▼'

      const newOrder = this._rows
        .sort((a, b) => {
          const operator = isNumber(a[row], b[row])

          if (this.iconToSortAll === '▼' && operator === true) return a[row] - b[row]

          if (this.iconToSortAll === '▲' && operator === true) return b[row] - a[row]

          if (this.iconToSortAll === '▲' && operator === false) return a[row] < b[row]

          if (this.iconToSortAll === '▼' && operator === false) return a[row] > b[row]
        })

      return this.rows.map((_row, index) => {
        _row = newOrder.find((__row, _index) => _index === index)

        return _row
      })
    }
  }
}

export default sortable
