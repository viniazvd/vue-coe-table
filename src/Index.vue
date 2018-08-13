<template>
  <div class="c-table-builder">
    <table v-if="hasValid" id="app" class="table" :style="tableStyle">
      <tr class="tr-col" :style="trColStyle">
        <th v-if="selectable">
          <input type="checkbox" @click="$handlerCheckedAll()" />
        </th>

        <slot name="col" :cols="cols">
          <th
            v-for="({ label, row }, index) in cols"
            :key="index"
            class="th-col"
            :style="thColStyle"
          >
            <!-- to do -->
            <slot name="icon-sortable">
              <span
                v-if="sortable"
                class="icon-sortable-all"
                @click="$handlerSort(row, index)"
              >
                {{ iconToSort }}
              </span>
            </slot>
            <span>{{ label }}</span>
          </th>
        </slot>
      </tr>

      <tr
        class="tr-row"
        v-for="(row, index) in _rows"
        :key="index"
        :style="trRowStyle"
      >
        <th v-if="selectable">
          <input type="checkbox" :value="row" v-model="checkeds" />
        </th>

        <slot name="row" :rows="row" :cols="cols">
          <td
            class="td-row"
            v-for="(_, _index) in cols.length"
            :key="_index"
            :style="tdRowStyle"
          >
            <span :style="rowStyle">{{ getRow(row, _index) }}</span>
          </td>
        </slot>
      </tr>

      <slot name="total">
        <tr
          v-if="!!(total && total.enable)"
          class="tr-totalizator"
          :style="totalStyle"
        >
          <th
            class="th-totalizator"
            v-for="(_total, index) in totals"
            :key="index"
          >
            <span >{{ _total }}</span>
          </th>
        </tr>
      </slot>
    </table>

    <pagination :data-table="dataaa" />

    <div v-if="!hasValid" class="empty-state">
      EMPTY STATE
    </div>
  </div>
</template>

<script>
import Pagination from './components/Pagination'

import sortable from './mixins/sortable'
import selectable from './mixins/selectable'
import removeGaps from './helpers/removeGaps'

export default {
  name: 'vue-table-builder',

  components: { Pagination },

  mixins: [ sortable, selectable ],

  props: {
    tableStyle: Object,
    trColStyle: Object,
    thColStyle: Object,
    trRowStyle: Object,
    tdRowStyle: Object,
    rowStyle: Object,
    totalStyle: Object,
    cols: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    },
    empty: {
      type: String,
      default: () => '-'
    },
    total: Object,
    selectable: Boolean,
    sortable: Boolean
  },

  data () {
    return {
      iconToSort: '▼',
      dataaa: [
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
        { num: 8 },
        { num: 9 },
        { num: 10 },
        { num: 11 },
        { num: 12 },
        { num: 13 },
        { num: 14 },
        { num: 15 },
        { num: 16 },
        { num: 17 },
        { num: 18 },
        { num: 19 },
        { num: 20 },
        { num: 21 },
        { num: 22 },
        { num: 23 },
        { num: 24 },
        { num: 25 },
        { num: 26 },
        { num: 27 },
        { num: 28 },
        { num: 29 },
        { num: 30 },
        { num: 31 },
        { num: 32 }
      ]
    }
  },

  created () {
    this.cols.forEach(col => {
      if (typeof col !== 'object') {
        console.error('the array of columns must contain only objects')
      }
    })

    this.rows.forEach(row => {
      if (typeof row !== 'object') {
        console.error('the array of rows must contain only objects')
      }
    })
  },

  computed: {
    hasValid () {
      return this.errorHandler()
    },

    _rows () {
      const rowsWithoutGaps = removeGaps(this.rows)

      return rowsWithoutGaps
    },

    totals () {
      const makeSum = prop => this.rows.reduce((total, obj) => total + ((obj[prop]) || 0), 0)
      const makeLabel = row => row === this.total.colPosition ? this.total.label : null

      const total = ({ row, hasTotal }) => hasTotal ? makeSum(row) : makeLabel(row)

      if (this.selectable) {
        const totals = this.cols.map(total)
        // append a position in columns to fix alignment
        totals.unshift(null)

        return totals
      } else {
        return this.cols.map(total)
      }
    }
  },

  methods: {
    errorHandler () {
      if (!(this.cols || this.$scopedSlots.col) && !(this.rows || this.$scopedSlots.row)) {
        console.error('you must set the array of columns and rows')

        return false
      }

      if (!(this.cols || this.$scopedSlots.col)) {
        console.error('you must set the array of columns')

        return false
      }

      if (!(this.rows || this.$scopedSlots.row)) {
        console.error('you must set the array of rows')

        return false
      }

      return true
    },

    getRow (row, index) {
      const props = this.cols.map(({ row }) => row)

      return row[props[index]] || this.empty
    }
  },

  install (Vue, { name = 'vue-table-builder' } = {}) {
    Vue.component(name, this)
  }
}
</script>

<style lang="scss">
.c-table-builder {
  & > .table {
    & > .tr-col {
      & > .th-col {

        & > .icon-sortable-all {
          cursor: pointer;
        }

        & > .icon-sortable-one {
          cursor: pointer;
        }
      }
    }

    & > .tr-row {
      & > .td-row {}
    }

    & > .tr-totalizator {
      & > .th-totalizator {}
    }
  }

  & > .empty-state {}
}
</style>
