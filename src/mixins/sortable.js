import toggleOrder from '../helpers/order'

const sortable = {
  props: {
    sortable: Boolean
  },

  watch: {
    page () {
      this.iconToSort = '▼'
    }
  },

  methods: {
    $handlerSort (row) {
      this.iconToSort === '▼' ? this.iconToSort = '▲' : this.iconToSort = '▼'

      return this._rows.sort(toggleOrder(row, this.iconToSort))
    }
  }
}

export default sortable
