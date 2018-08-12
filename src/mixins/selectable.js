const selectable = {
  data () {
    return {
      checkeds: [],
      allChecked: false
    }
  },

  watch: {
    checkeds (val) {
      this.$emit('update:checkeds', val)
    }
  },

  methods: {
    handlerCheckedAll () {
      this.allChecked = !this.allChecked

      this.allChecked
        ? this.checkeds = this._rows
        : this.checkeds = []
    }
  }
}

export default selectable
