<template>
  <div v-if="hasValid" class="c-table-builder" id="app">
    <slot name="actions">
      <filters label="Filtrar por: " :search="search" v-on="$listeners" />
    </slot>

    <div v-if="!isEmpty" class="table-container">
      <table class="table">
        <thead class="thead">
          <tr class="tr-col">
            <th v-if="selectable" class="th-col-selectable">
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
                  <span v-if="sortable" class="icon-sortable-all" @click="$handlerSort(row, index)">
                    {{ iconToSort }}
                  </span>
                </slot>
                <span>{{ label }}</span>
              </th>
            </slot>
          </tr>
        </thead>

        <tbody :class="tbodyClass" :style="{ maxHeight: maxHeight + 'px' }" ref="tbody">
          <tr class="tr-row" v-for="(row, index) in _rows" :key="index">
            <th v-if="selectable" class="th-row-selectable">
              <input type="checkbox" :value="row" v-model="checkeds" @change="$selected(row)" />
            </th>

            <slot name="row" :rows="row" :cols="cols">
              <td class="td-row" v-for="(_, _index) in cols.length" :key="_index" ref="">
                <span class="row">{{ getRow(row, _index) }}</span>
              </td>
            </slot>
          </tr>
        </tbody>

        <slot name="total">
          <tfoot class="tfoot">
            <tr v-if="total" class="tr-totalizator">
              <th class="th-totalizator" v-for="(total, index) in totals" :key="index">
                <span >{{ total }}</span>
              </th>
            </tr>
          </tfoot>
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
import warnings from './mixins/warnings'
import sortable from './mixins/sortable'
import selectable from './mixins/selectable'
import paginable from './mixins/paginable'
import scroll from './mixins/scroll'

// helpers
import removeGaps from './helpers/removeGaps'
import findBy from './helpers/findBy'

export default {
  name: 'vue-table-builder',

  components: { Pagination, Filters },

  mixins: [ warnings, sortable, selectable, paginable, scroll ],

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
    search: String,
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
      iconToSort: '▼'
    }
  },

  computed: {
    isEmpty () {
      return !this.pages.length && this.search
    },

    _rows () {
      const rowsWithoutGaps = removeGaps(this.dataTable)

      return rowsWithoutGaps
    },

    tbodyClass () {
      return ['tbody', {
        '-max-heigth': this.maxHeight,
        '-has-top-shadow': !this.paginable && !!this.maxHeight && !this.hasTopShadow,
        '-has-bottom-shadow': !this.paginable && !!this.maxHeight && !this.hasBottomShadow
      }]
    },

    totals () {
      const sum = prop => (total, obj) => (typeof obj[prop] === 'number' && total + (+(obj[prop]) || 0)) || '-'

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
      const filtereds = findBy(this.rows, this.search, this.searchParams)
      const filteredRows = this.search && this.searchParams ? filtereds : this.rows

      return this.paginable ? this.pagination.data : filteredRows
    }
  },

  methods: {
    getRow (row, index) {
      const props = this.cols.map(({ row }) => row)

      return row[props[index]] || this.empty
    }
  },

  install (Vue, { name = 'vue-coe-table' } = {}) {
    Vue.component(name, this)
  }
}
</script>

<style lang="scss">
@import './style/index.scss';

.c-table-builder > .table-container {
  & > .table {
    position: relative;

    & > .thead {
      @include table-config;
      border: $border;

      & > .tr-col {
        background-color: $background-color;

        & > .th-col-selectable { width: 50px; }
        & > .th-col {
          color: $text-color;
          min-width: 100px;

          & > .icon-sortable-all { cursor: pointer; }
          & > .icon-sortable-one { cursor: pointer; }
        }
      }
    }

    & > .tbody {
      display: block;

      & > .tr-row {
        @include table-config;
        border: $border;

        & > .th-row-selectable { width: 50px; }
        & > .td-row {
          text-align: center;
          & > .row { color: $text-color; }
        }
      }

      &.-has-top-shadow::before {
        @include shadow;
        top: 20px;
      }

      &.-has-bottom-shadow::after {
        @include shadow;
        bottom: 25px;
      }
    }

    & .-max-heigth {
      overflow-y: scroll;
      overflow-x: hidden;
    }

    & > .tfoot {
      @include table-config;

      & > .tr-totalizator {
        color: $text-color;
        background-color: $background-color;

        & > .th-totalizator {
          // fix - make dynamic based on prop selectable
          &:first-child { width: 50px; }
        }
      }
    }
  }

  & > .empty-state {}
}
</style>
