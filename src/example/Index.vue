<template>
  <section>
    <table-builder
      :trColStyle="trColStyle"
      :thColStyle="thColStyle"
      :trRowStyle="trRowStyle"
      :tdRowStyle="tdRowStyle"
      :rowStyle="rowStyle"
      :totalStyle="totalStyle"
      :cols="cols"
      :rows="rows"
      :total="total"
      selectable
      :checkeds.sync="checkeds"
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
