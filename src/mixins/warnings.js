const warnings = {
  created () {
    this.cols.forEach(col => {
      if (typeof col !== 'object') {
        console.error('the array of columns must contain only objects')
      }
    })

    this.rows.forEach(row => {
      if (typeof row !== 'object') {
        console.error('the array of rows must contain only objects')
      }
    })

    if (this.paginable && !!this.maxHeight) {
      console.warn('pagination can not have a maxHeight property')
    }
  },

  computed: {
    hasValid () {
      if (!(this.cols || this.$scopedSlots.col) && !(this.dataTable || this.$scopedSlots.row)) {
        console.error('you must set the array of columns and rows')

        return false
      }

      if (!(this.cols || this.$scopedSlots.col)) {
        console.error('you must set the array of columns')

        return false
      }

      if (!(this.dataTable || this.$scopedSlots.row)) {
        console.error('you must set the array of rows')

        return false
      }

      return true
    }
  }
}

export default warnings
