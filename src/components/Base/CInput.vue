<template>
  <c-input-container v-bind="$attrs" class="c-input">
    <input
      v-bind="$attrs"
      :disabled="disabled"
      :value="value"
      :class="classes"
      @input="v => $emit('input', v.target.value)"
    >
  </c-input-container>
</template>

<script>
import CInputContainer from './CInputContainer'

export default {
  components: { CInputContainer },

  props: {
    round: Boolean,
    opaque: Boolean,
    value: String,
    disabled: Boolean
  },

  computed: {
    classes () {
      return [
        'input',
        {
          '-round': this.round,
          '-opaque': this.opaque,
          '-disabled': this.disabled
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '../../styles/reference';
$icon-position: 12px;

.c-input {
  position: relative;
  display: flex;
  flex-direction: column;

  & > .input {
    outline: 0;
    font-size: 14px;
    border: $border;
    border-radius: 5px;
    color: map-get($text-color, base-80);
    transition: box-shadow .3s ease;

    &:hover { @include hover() }
    &::placeholder { color: map-get($text-color, base-30); }

    &.-textarea { padding: { left: 15px; top: 15px; right: 15px; } }
    &:not(.-textarea) {
      height: 40px;
      text-indent: 15px;
    }
    &.-round { border-radius: 20px; border: $border; }
    &.-opaque { background-color: map-get($text-color, base-05) }
    &.-disabled { cursor: not-allowed; }
  }
}
</style>
