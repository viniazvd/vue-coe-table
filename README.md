<h1 align="center">vue-coe-table ✅</h1>

<p align="center">
  <q>This library was inspired by ✨ <a href="https://github.com/VitorLuizC/vue-data-tablee">vue-data-tablee</a>✨</q>
</p>
<p align="center">
  ✨ <a href="#">Example</a>✨
</p>
<p align="center">
  <a href="https://github.com/cj/vuelidation/blob/master/LICENSE.md"><img src="https://img.shields.io/npm/l/vuelidation.svg" alt="License" target="_blank"></a>
</p>

**Install**

`yarn add --dev vue-coe-table@latest`

**Include Plugin**
```javascript
import Vue from 'vue'

import CoeTable from 'vue-coe-table'

Vue.use(CoeTable)
```

You can also import just components you need, without installing globally.

```vue
<script>
import CoeTable from 'vue-coe-table'

export default {
  components: { CoeTable }
  ...
}
</script>
```

**Basic Example**
```vue
<template>
  <table-builder :cols="cols" :rows="rows" />
</template>

<script>
  ...
  
  data () {
    return {
      cols: [
        { label: 'Nome', row: 'name' },
        { label: 'E-mail', row: 'email' },
        { label: 'Idade', row: 'age' }
      ],
      rows: [
        { name: 'coe1', email: 'coe1@gmail.com', age: 6 },
        { name: 'coe2', email: 'coe2@gmail.com', age: 3 },
        { name: 'coe3', email: 'coe3@gmail.com', age: 2 }
      ]
    }
  },
  
  ...
}

</script>
```

**Full Example**
```vue
<template>
  <table-builder
    :cols="cols"
    :rows="rows"
    :total="total"
    :search="search"
    :search-params="['name']"
    :checkeds.sync="checkeds"
    :current-page="2"
    :per-page="5"
    gap="x"
    @search="v => search = v"
    max-height="300"
    paginable
    selectable
    sortable
    pagination-type="ellipsised"
  />
</template>
```

## Component Props

Name         | Type              | Default  | Required | About
----         | ----              | -------  |          | -----
cols         | `Array.<Object>`  |          |   true   | Cols list.
rows         | `Array.<Object>`  |          |   true   | Rows list.
total        | `Object`          |          |   true   | Total list.
gap          | `String`          | `''`     |   false  | Empty cell's character.
search       | `String`          |          | false(*) | Is required if 'search-params' is set
searchParams | `Array.<String>`  |          |   false  | Must correspond some property of the row (accepts multiple options
)
selectable   | `Boolean`         | `false`  |   false  | Add checkbox column to select a row. It emits event on change
