<h1 align="center">vue-coe-validator ✅</h1>

<p align="center">
  <q>Another validation form for the Vue. Validates input fields of multiple forms and displays errors. Note: without any dependencies.</q>
</p>

<p align="center">
  <a href="https://github.com/cj/vuelidation/blob/master/LICENSE.md"><img src="https://img.shields.io/npm/l/vuelidation.svg" alt="License" target="_blank"></a>
</p>

<p align="center">
  ✨ <a href="https://codesandbox.io/s/github/viniazvd/vue-coe-validator-example">Example</a>✨
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
<template>
  <data-table :rows="rows" :cols="cols" />
</template>

<script>
import CoeTable from 'vue-coe-table'

export default {
  components: { CoeTable }
  ...
}
</script>
```

**Basic Use**
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

**Full Use**
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
