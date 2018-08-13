<template>
  <div class="pagination">
    <div class="handlers">
      <span class="first" @click="first">←</span>

      <div v-for="page in beforeHalf" :key="page.num">
        <button class="handler" @click="previous(page)">{{ page.num }}</button>
      </div>

      <p class="page">{{ page }}</p>

      <div v-for="page in afterHalf" :key="page.num">
        <button class="handler" @click="next(page)">{{ page.num }}</button>
      </div>
      <span class="last" @click="last">→</span>
    </div>
    <pre>{{ pagination }}</pre>
  </div>
</template>

<script>
export default {
  name: 'pagination',

  props: {
    dataTable: {
      type: Array,
      required: true
    },
    paginate: {
      type: Object,
      default: () => { return {} }
    },
    currentPage: {
      type: Number,
      validator: (page) => !!page,
      default: 1
    },
    perPage: {
      type: Number,
      default: 10
    }
  },

  data () {
    return {
      page: this.currentPage
    }
  },

  computed: {
    pagination () {
      let { from = 0, to = 0, total } = this.paginate

      const data = this.dataTable.slice((this.currentPage - 1) * this.perPage, this.perPage * this.currentPage)
      from = ((this.currentPage - 1) * this.perPage) + 1
      to = ((this.currentPage - 1) * this.perPage) + data.length
      total = data.length

      return {
        data,
        ...this.currentPage,
        from,
        ...this.perPage,
        to,
        total
      }
    },

    beforeHalf () {
      const half = (this.dataTable.length / 2) - 1

      return this.dataTable.slice(0, half)
    },

    afterHalf () {
      const half = (this.dataTable.length / 2)
      const last = this.dataTable.length
      console.log(last)

      return this.dataTable.slice(half, last)
    }
  },

  methods: {
    first () {
      console.log('first')
      this.page = 1
    },

    previous (page) {
      console.log('previous', page)
    },

    next (page) {
      console.log('next', page)
    },

    last () {
      console.log('last')
      this.page = this.dataTable.length
    }
  }
}
</script>

<style lang="scss">
.pagination {

  & > .handlers {
    display: flex;
    max-width: 500px;

    & > .handler {
      height: 25px;
      width: 25px;
    }
  }
}
</style>
