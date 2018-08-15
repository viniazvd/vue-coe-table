<template>
  <div v-if="hasValid" class="c-table-builder">
    <table v-if="hasValid" id="app" class="table">
      <tr class="tr-col">
        <th v-if="selectable">
          <input type="checkbox" @click="$handlerCheckedAll()" />
        </th>

        <slot name="col" :cols="cols">
          <th
            v-for="({ label, row }, index) in cols"
            :key="index"
            class="th-col"
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
      >
        <th v-if="selectable">
          <input type="checkbox" :value="row" v-model="checkeds" />
        </th>

        <slot name="row" :rows="row" :cols="cols">
          <td
            class="td-row"
            v-for="(_, _index) in cols.length"
            :key="_index"
          >
            <span class="row">{{ getRow(row, _index) }}</span>
          </td>
        </slot>
      </tr>

      <slot name="total">
        <tr
          v-if="total"
          class="tr-totalizator"
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

    <div class="pagination">
      <div class="handlers">
        <span class="first" @click="toFirst">«</span>

        <div v-if="hasStart" class="start-ellipsis">
          <button class="start" @click="toFirst">
            1
          </button>

          <button v-if="page === 3" class="second" @click="toSecond">
            2
          </button>

          <div v-else-if="page !== 2" class="previous" @click="toPrevious">
            ‹
          </div>

          <button v-if="this.page === this.totalPaged" class="start" @click="toLastMinusTwo">
            {{ totalPaged - 2 }}
          </button>
        </div>

        <button
          v-if="page !== 1 && page !== 2"
          v-for="(page, index) in beforeHalf"
          :key="index + '…'"
          class="handler"
          @click="changePage(getPrevious(page, index))"
        >
          {{ getPrevious(page, index) }}
        </button>

        <p class="current-page">{{ page }}</p>

        <button
          v-for="(page, index) in afterHalf"
          :key="index + '⚐'"
          class="handler"
          @click="changePage(getNext(page, index))"
        >
          {{ getNext(page, index) }}
        </button>

        <div
          v-if="page !== this.totalPaged && paginationType === 'ellipsised'"
          class="end-ellipsis"
        >
          <div
            v-if="page !== this.totalPaged - 2 && page !== this.totalPaged - 1"
            class="next"
            @click="toNext"
          >
            ›
          </div>

          <button
            v-if="page !== this.totalPaged - 1 && page + afterHalf.length !== totalPaged" 
            class="end"
            @click="toLast"
          >
            {{ totalPaged }}
          </button>
        </div>
        <span class="last" @click="toLast">»</span>
      </div>
    </div>
  </div>

  <div v-else class="empty-state">
    EMPTY STATE
  </div>
</template>

<script>
// mixins
import sortable from './mixins/sortable'
import selectable from './mixins/selectable'
import paginable from './mixins/paginable'

// helpers
import removeGaps from './helpers/removeGaps'

export default {
  name: 'vue-table-builder',

  mixins: [ sortable, selectable, paginable ],

  props: {
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
    sortable: Boolean,
    paginable: Boolean,
    paginationType: {
      type: String,
      validator: type => (['full', 'ellipsised'].includes(type)),
      default: 'full'
    },
    paginate: {
      type: Object,
      default: () => { return {} }
    },
    currentPage: {
      type: [Number, String],
      validator: (page) => !!page,
      default: 1
    },
    perPage: {
      type: [Number, String],
      validator: limit => limit > 2,
      default: 10
    }
  },

  data () {
    return {
      iconToSort: '▼'
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
      const rowsWithoutGaps = removeGaps(this.dataTable)

      return rowsWithoutGaps
    },

    totals () {
      const makeSum = prop => this.dataTable.reduce((total, obj) => total + ((obj[prop]) || 0), 0)
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
    },

    dataTable () {
      return this.paginable ? this.pagination.data : this.rows
    }
  },

  methods: {
    errorHandler () {
      if (!(this.cols || this.$scopedSlots.col) && !(this.dataTable || this.$scopedSlots.row)) {
        console.error('you must set the array of columns and rows')

        return false
      }

      if (!(this.cols || this.$scopedSlots.col)) {
        console.error('you must set the array of columns')

        return false
      }

      if (!(this.dataTable || this.$scopedSlots.row)) {
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
    width: 100%;

    & > .tr-col {
      background-color: #E7E9F0;

      & > .th-col {
        color: #5E6784;
        min-width: 100px;

        & > .icon-sortable-all {
          cursor: pointer;
        }

        & > .icon-sortable-one {
          cursor: pointer;
        }
      }
    }

    & > .tr-row {
      border: 1px solid #E7E9F0;

      & > .td-row {
        text-align: center;

        & > .row { color: #5E6784; }
      }
    }

    & > .tr-totalizator {
      color: #5E6784;
      background-color: #E7E9F0;

      & > .th-totalizator {}
    }
  }

  & > .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;

    & > .handlers {
      display: flex;
      align-items: center;
      max-width: 500px;

      & > .first {
        padding-right: 10px;
        cursor: pointer;
      }

      & > .start-ellipsis {
        display: flex;
        align-items: flex-end;

        & > .start {
          height: 25px;
          width: 25px;
          margin: 0 5px;
        }

        & > .second {
          height: 25px;
          width: 25px;
          margin: 0 5px;
        }

        & > .previous {
          height: 25px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      & > .handler {
        height: 25px;
        width: 25px;
        margin: 0 5px;
      }

      & > .current-page {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 5px;
        border: 1px solid red;
        width: 25px;
        height: 25px;
        border-radius: 15px;

        &:hover {
          background-color: red;
          color: white;
        }
      }

      & > .end-ellipsis {
        display: flex;
        align-items: flex-end;

        & > .next {
          height: 25px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        & > .end {
          height: 25px;
          width: 25px;
          margin: 0 5px;
          display: flex;
          justify-content: center;
        }
      }

      & > .last {
        padding-left: 10px;
        cursor: pointer;
      }
    }
  }

  & > .empty-state {}
}
</style>
