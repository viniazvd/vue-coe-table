<template>
  <div class="filters">
    <c-input 
      class="filter"
      v-bind="$attrs"
      :value="search"
      @input="value => $emit('search', value)"
    />
  </div>
</template>

<script>
import CInput from './Base/CInput'

export default {
  name: 'filters',

  components: { CInput },

  props: {
    search: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.filters {
  display: flex;
  margin-bottom: 20px;

  & > .filter {}
}
</style>
