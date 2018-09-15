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
                  <span v-if="sortable" class="icon-sortable-all" @click="$handlerSort(row)">
                    {{ iconToSort }}
                  </span>
                </slot>
                <span>{{ label }}</span>
              </th>
            </slot>
          </tr>
        </thead>

        <tbody :class="tbodyClass" :style="style" ref="tbody">
          <tr class="tr-row" v-for="(row, index) in _rows" :key="index">
            <td v-if="selectable" class="td-row-selectable">
              <input type="checkbox" :value="row" v-model="checkeds" @change="$selected(row)" />
            </td>

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
    total: Object,
    search: String,
    searchParams: {
      // array of strings
      // required if paginable
      type: Array
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

    style () {
      return {
        'maxHeight': this.maxHeight + 'px',
        '--tbody-bottom': (this.maxHeight - 15) + 'px'
      }
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

      return row[props[index]] || ''
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

    // fix - max-width must be the size of the table
    @media only screen and (max-width: 677px) {
      @include lateral-responsiveness;
    }

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

      width: 100vh;

      & > .tr-row {
        @include table-config;
        width: 100%;
        border: $border;

        & > .td-row-selectable {
          width: 50px;
          text-align: center;

          &:first-child {
            background-image: linear-gradient(to right, rgba(255,255,255, 1) 50%, rgba(255,255,255, 0) 100%);
            background-repeat: no-repeat;
            background-size: 20px 100%;
          }
        }
        & > .td-row {
          text-align: center;

          &:first-child {
            @include lateral-pagination;
          }

          &:last-child {
            @include lateral-pagination;
            background-position: 100% 0;
          }

          & > .row { color: $text-color; }
        }
      }

      &.-has-top-shadow::before {
        @include shadow;
        top: 10px;
      }

      &.-has-bottom-shadow::after {
        @include shadow;
        top: var(--tbody-bottom);
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
