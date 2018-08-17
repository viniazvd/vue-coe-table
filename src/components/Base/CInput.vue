<template>
  <c-input-container v-bind="$attrs" class="c-input">
    <input
      v-bind="$attrs"
      :disabled="disabled"
      :value="value"
      @input="v => $emit('input', v.target.value)"
    >
  </c-input-container>
</template>

<script>
import CInputContainer from './CInputContainer'

export default {
  components: { CInputContainer },

  props: {
    value: String,
    disabled: Boolean
  }
}
</script>

<style lang="scss">
$icon-position: 12px;

.c-input {
  position: relative;
  display: flex;
  flex-direction: column;

  & > .input {
    outline: 0;
    font-size: 14px;
    border: 1px solid black;
    border-radius: 5px;
    color: black;
    transition: box-shadow .3s ease;

    &:hover {}
    &::placeholder { opacity: 0.3; }

    &.-disabled { cursor: not-allowed; }
  }
}
</style>
