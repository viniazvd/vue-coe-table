<template>
  <table v-if="hasValid" id="app" class="c-table-builder" :style="tableStyle">
    <tr class="tr-col" :style="trColStyle">
      <th v-if="selectable">
        <input type="checkbox" @click="$handlerCheckedAll()" />
      </th>

      <slot name="col" :cols="cols">
        <th
          v-for="({ label, row, sortable, iconToSortOne }, index) in _cols"
          :key="index"
          class="th-col"
          :style="thColStyle"
        >
          <span
            v-if="sortable && sortable.all"
            class="icon-sortable-all"
            @click="$handlerSortAll(row)"
          >
            {{ iconToSortAll }}
          </span>

          <span>{{ label }}</span>

          <span
            v-if="sortable && sortable.one"
            class="icon-sortable-one"
            @click="$handlerSortOne(row, index)"
          >
            {{ iconToSortOne }}
          </span>
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
          v-for="(_, _index) in _cols.length"
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

  <div v-else class="empty-state">
    EMPTY STATE
  </div>
</template>

<script>
import sortable from './mixins/sortable'
import selectable from './mixins/selectable'
import removeGaps from './helpers/removeGaps'

export default {
  name: 'vue-table-builder',

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
    selectable: Boolean
  },

  data () {
    return {
      iconToSortAll: '▼'
    }
  },

  computed: {
    hasValid () {
      return this.errorHandler()
    },

    _cols () {
      const rowsWithIcons = this.cols.map(col => {
        if (typeof col !== 'object') console.error('the array of columns must contain only objects')

        // append 'iconToSortOne' to each object
        return Object.assign(col, { iconToSortOne: '▼' })
      })

      return rowsWithIcons
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

.empty-state {}
</style>
