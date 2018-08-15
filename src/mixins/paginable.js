const paginable = {
  data () {
    return {
      page: this.currentPage
    }
  },

  computed: {
    pagination () {
      let { from = 0, to = 0 } = this.paginate

      const data = this.rows.slice((this.page - 1) * this.perPage, this.perPage * this.page)
      from = ((this.page - 1) * this.perPage) + 1
      to = ((this.page - 1) * this.perPage) + data.length

      return {
        data,
        ...this.page,
        from,
        ...this.perPage,
        to
      }
    },

    totalPaged () {
      return Math.ceil(this.rows.length / this.perPage)
    },

    hasStart () {
      return this.beforeHalf && this.beforeHalf.page
    },

    beforeHalf () {
      if (this.page === 1) return []

      return this.paginationType === 'full'
        ? this.rows.slice(0, this.page - 1)
        : { page: this.page - 1 }
    },

    afterHalf () {
      if (this.page === this.totalPaged) return []
      if (this.page === 1 && this.paginationType === 'ellipsised') return this.rows.slice(this.page, 3)

      return this.paginationType === 'full'
        ? this.rows.slice(this.page, this.totalPaged)
        : { page: this.page + 1 }
    }
  },

  methods: {
    toFirst () {
      this.page = 1
    },

    toSecond () {
      this.page = 2
    },

    changePage (page) {
      this.page = page
    },

    getPrevious (page, index) {
      return typeof page === 'number' ? page : index + 1
    },

    getNext (page, index) {
      if (this.page === 1) {
        return index + 2
      }
      return typeof page === 'number' ? page : index + this.beforeHalf.length + 2
    },

    toPrevious () {
      this.page -= 2
    },

    toLastMinusTwo () {
      this.page = this.totalPaged - 2
    },

    toNext () {
      this.page += 2
    },

    toLast () {
      this.page = this.totalPaged
    }
  }
}

export default paginable
