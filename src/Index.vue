<template>
  <div v-if="hasValid" class="c-table-builder" id="app">
    <slot name="filters">
      <filters 
        label="Filtrar por: "
        :search="search"
        @search="synchronizeSearch"
      />
    </slot>  

    <div v-if="!isEmpty" class="table-container">
      <table class="table">
        <tr class="tr-col">
          <th v-if="selectable">
            <input type="checkbox" @click="$selectedAll" />
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
            <input type="checkbox" :value="row" v-model="checkeds" @change="$selected(row)" />
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

      <pagination 
        v-if="paginable"
        :pages="pages"
        :page="page"
        @to-first="toFirst"
        @change-page="changePage"
        @to-last="toLast"
      />
    </div>
    <div v-else>
      EMPTY STATE
    </div>
  </div>

  <div v-else class="empty-state">
    <slot name="empty">
      error: invalid table!
    </slot>
  </div>
</template>

<script>
// components
import Pagination from './components/Pagination'
import Filters from './components/Filters'

// mixins
import sortable from './mixins/sortable'
import selectable from './mixins/selectable'
import paginable from './mixins/paginable'

// helpers
import removeGaps from './helpers/removeGaps'

export default {
  name: 'vue-table-builder',

  components: { Pagination, Filters },

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
    searchParams: {
      // array of strings
      // required if paginable
      type: Array 
    },
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
      default: () => ({})
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
    },
    pagesLimit: {
      type: [Number, String],
      validator: limit => limit > 3
    }
  },

  data () {
    return {
      search: '',
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

    isEmpty () {
      return !this.pages.length && this.search
    },

    _rows () {
      const rowsWithoutGaps = removeGaps(this.dataTable)

      return rowsWithoutGaps
    },

    totals () {
      const sum = prop => (total, obj) =>
        (typeof obj[prop] === 'number' && total + ((obj[prop]) || 0)) || '-'
        
      const makeSum = prop => this.dataTable.reduce(sum(prop), 0)
        
      const makeLabel = row => (row === this.total.colPosition && this.total.label) || null

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
    getRow (row, index) {
      const props = this.cols.map(({ row }) => row)

      return row[props[index]] || this.empty
    },

    synchronizeSearch (value) {
      this.search = value
    }
  },

  install (Vue, { name = 'vue-table-builder' } = {}) {
    Vue.component(name, this)
  }
}
</script>

<style lang="scss">
.c-table-builder > .table-container {
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

  & > .empty-state {}
}
</style>
