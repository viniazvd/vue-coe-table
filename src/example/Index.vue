<template>
  <section>
    <table-builder
      :cols="cols"
      :rows="rows"
      :total="total"
      :search="search"
      :search-params="['name']"
      :checkeds.sync="checkeds"
      :current-page="2"
      :per-page="5"
      @search="synchronizeSearch"
      selectable
      sortable
      paginable
      pagination-type="ellipsised"
    />
  </section>
</template>

<script>
import TableBuilder from '../Index'
import {
  cols,
  rows,
  total
} from './data-table'

export default {
  name: 'example',

  components: { TableBuilder },

  data () {
    return {
      cols,
      rows,
      total,
      search: '',
      checkeds: []
    }
  },

  methods: {
    synchronizeSearch (value) {
      this.search = value
    }
  }
}
</script>
