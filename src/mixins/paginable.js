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

    beforeHalf () {
      return this.rows.slice(0, this.page - 1)
    },

    afterHalf () {
      return this.rows.slice(this.page, this.totalPaged)
    }
  },

  methods: {
    first () {
      this.page = 1
    },

    changePage (page) {
      this.page = page
    },

    // previous (page) {
    //   this.page = page
    // },

    // next (page) {
    //   this.page = page
    // },

    last () {
      this.page = this.totalPaged
    }
  }
}

export default paginable
