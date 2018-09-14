<h1 align="center">vue-coe-table ✅</h1>

<p align="center">
  <q>This library was inspired by <a href="https://github.com/VitorLuizC/vue-data-tablee">vue-data-tablee</a></q>
</p>
<p align="center">
  ✨ <a href="#">Example</a>✨
</p>
<p align="center">
  <a href="https://github.com/cj/vuelidation/blob/master/LICENSE.md"><img src="https://img.shields.io/npm/l/vuelidation.svg" alt="License" target="_blank"></a>
</p>

**Install**
 
`yarn add --dev vue-coe-table@latest`
`(package has not been registered yet)`

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

Name           | Type              | Default  | Required | About
----           | -----------       | -------  | -------  | -----
cols           | `Array<Obj>`      |          |   true   | Cols list
rows           | `Array<Obj>`      |          |   true   | Rows list
total          | `Object`          |          |   true   | Total list
gap            | `String`          |   `''`   |   false  | Empty cell's character
maxHeight      | `String`          |          |   false  | Set fixed table size. Obs: It does not work with pagination!
search         | `String`          |          | false(*) | Is required if 'search-params' is set
searchParams   | `Array<Str>`      |          |   false  | Must correspond some property of the row (accepts multiple options)
selectable     | `Boolean`         | `false`  |   false  | Add checkbox column to select a row. It emits event on change
sortable       | `Boolean`         | `false`  |   false  | Add option to sort the fields by clicking the column icon
paginable      | `Boolean`         | `false`  |   false  | Adds pagination
paginationType | `String`          | `false`  |   false  | Has two types: 'full' and 'ellipsised'
paginate       | `Object`          | `{}   `  |   false  | If your pagination comes from an API
currentPage    | `Number, String`  | `1`      |   false  | Current page.
perPage        | `Number, String`  | `10`     |   false  | Obs: needs to be greater than 2
pagesLimit     | `Number, String`  | `false`  |   false  | Obs: needs to be greater than 3

## Slots
<p>You can generate the table automatically, or use slots</p>
<h4>Options:</h4>
<p style='margin: 0; '>
  <ul style='margin: 0; padding: 0; list-style-type: none;'>
    <li>actions</li>
    <li>col => <i>slot-scope="{ col }</i></li> 
    <li>icon-sortable</li>
    <li>row => <i>slot-scope="{ row, cols }</li>
    <li>total</li>
  </ul>
</p>

