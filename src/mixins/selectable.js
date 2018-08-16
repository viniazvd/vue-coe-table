const selectable = {
  data () {
    return {
      checkeds: [],
      allChecked: false
    }
  },

  methods: {
    $selected (row) {
      this.$emit('selected', row)
    },

    $selectedAll () {
      if (!this.allChecked) {
        this.allChecked = true
        this.checkeds = this.rows
        
        this.$emit('selected-all', { page: this._rows, table: this.rows })
      } else {
        this.allChecked = false
        this.checkeds = []

        this.$emit('reset-all')
      }
    }
  }
}

export default selectable
