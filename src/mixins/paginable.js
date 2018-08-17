import findBy from '../helpers/findBy'

const paginable = {
  data () {
    return {
      page: this.currentPage
    }
  },

  watch: {
    search (newValue, odlValue) {
      // search in action = reset current page
      if (newValue !== odlValue) this.page = 1
      // empty search = set page again
      if (!newValue) this.page = this.currentPage 
    }
  },

  computed: {
    pagination () {
      const filtereds = findBy(this.rows, this.search, this.searchParams)
      const dataTable = this.search && this.searchParams ? filtereds : this.rows

      const data = dataTable.slice((this.page - 1) * this.perPage, this.perPage * this.page)
      const from = ((this.page - 1) * this.perPage) + 1
      const to = ((this.page - 1) * this.perPage) + data.length

      return {
        data,
        ...this.page,
        from,
        ...this.perPage,
        to,
        total: dataTable.length
      }
    },

    totalPaged () {
      const data = this.search ? this.pagination.total : this.rows.length

      return Math.ceil(data / this.perPage)
    },

    pages () {
      const pages = this.rows.slice(0, this.pagesLimit || this.totalPaged)

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
      const currentPageItem = i + 1
      const hasHiddenNumberBefore = i + 3 <= this.page

      if (currentPageItem === 2 && hasHiddenNumberBefore) return '‹'

      const currentPageItemIsBeforeLast = currentPageItem === (this.pagesLimit || this.totalPaged) - 1
      const hasHiddenNumberAfter = this.page <= (this.pagesLimit - 3 || this.totalPaged - 3) && '›'
      
      if (currentPageItemIsBeforeLast && hasHiddenNumberAfter) return '›'
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
