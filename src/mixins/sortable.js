import { iconOrderOne, iconOrderAll } from '../helpers/iconOrder'

const sortable = {
  methods: {
    $handlerSortOne (row, index) {
      this._cols.map((_col, _index) => {
        _index === index && _col.iconToSort === '▼'
          ? _col.iconToSort = '▲'
          : _col.iconToSort = '▼'

        return _col
      })

      const ordered = this._rows
        .map(_row => _row[row])
        .sort(iconOrderOne(this._cols, index))

      return this.rows.forEach((_row, index) => (_row[row] = ordered[index]))
    },

    $handlerSortAll (row) {
      this.iconToSortAll === '▼' ? this.iconToSortAll = '▲' : this.iconToSortAll = '▼'

      const ordered = this._rows.sort(iconOrderAll(this.iconToSortAll, row))
      const sameIndex = (_, _index) => indexRow => _index === indexRow
      const changeOrder = (_row, indexRow) => ordered.find(sameIndex(indexRow))

      return this.rows.forEach(changeOrder)
    }
  }
}

export default sortable
