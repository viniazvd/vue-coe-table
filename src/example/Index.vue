<template>
  <section>
    <table-builder
      :cols="cols"
      :rows="rows"
      :total="total"
      :checkeds.sync="checkeds"
      :current-page="5"
      :per-page="5"
      selectable
      sortable
      paginable
      pagination-type="ellipsised"
    />
    <pre>
      checkeds: {{ checkeds }}
    </pre>
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
      checkeds: []
    }
  }
}
</script>
