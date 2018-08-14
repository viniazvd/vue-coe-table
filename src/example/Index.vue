<template>
  <section>
    <table-builder
      :cols="cols"
      :rows="rows"
      :total="total"
      :checkeds.sync="checkeds"
      :current-page="1"
      :per-page="3"
      selectable
      sortable
      paginable
    />
    <pre>
      checkeds: {{ checkeds }}
    </pre>
  </section>
</template>

<script>
import TableBuilder from '../Index'
import {
  trColStyle,
  thColStyle,
  trRowStyle,
  tdRowStyle,
  rowStyle,
  totalStyle,
  cols,
  rows,
  total
} from './data-table'

export default {
  name: 'example',

  components: { TableBuilder },

  data () {
    return {
      trColStyle,
      thColStyle,
      trRowStyle,
      tdRowStyle,
      rowStyle,
      totalStyle,
      cols,
      rows,
      total,
      checkeds: []
    }
  }
}
</script>
