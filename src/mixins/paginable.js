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

    pages () {
      const pages = this.rows.slice(0, this.totalPaged)

      return Array.from({ length: pages.length }, (xs, i) => {
        return {
          page: i + 1,
          handler: this.paginationType === 'ellipsised' && this.calcPages(i)
        }
      })
    }
  },

  methods: {
    calcPages (i) {
      return (i + 1 === 2 && i + 3 <= this.page && '‹') ||
      (i + 1 === this.totalPaged - 1 && this.page <= this.totalPaged - 3 && '›')
    },

    toFirst () {
      this.page = 1
    },

    changePage ({page, handler}) {
      if (handler === '‹') {
        this.page -= 2
      } else if (handler === '›') {
        this.page += 2
      } else {
        this.page = page
      }
    },

    toLast () {
      this.page = this.totalPaged
    }
  }
}

export default paginable
