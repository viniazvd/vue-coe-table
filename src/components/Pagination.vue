<template>
  <div class="pagination">
    <slot name="pagination" :pages="pages">
      <div class="pages">
        <span class="first" @click="$emit('to-first')">«</span>

        <button
          v-for="(_, index) in pages"
          :key="index + '…'"
          :class="['page', { '-page': index + 1 === page }]"
          @click="$emit('change-page', _)"
        >
          {{ _.handler || _.page }}
        </button>

        <span class="last" @click="$emit('to-last')">»</span>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'pagination',

  props: {
    pages: {
      type: Array,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  margin-top: 20px;
  justify-content: center;

  & > .pages {
    display: flex;
    max-width: 500px;
    align-items: center;

    & > .first {
      cursor: pointer;
      padding-right: 10px;
    }

    & > .page {
      width: 25px;
      height: 25px;
      display: flex;
      margin: 0 5px;
      border-radius: 15px;
      justify-content: center;

      &:hover {
        color: white;
        background-color: black;
      }
      &:focus { outline: unset; }
    }

    & .-page {
      background-color: red;

      &:hover {
        color: white;
        background-color: red;
      }
    }

    & > .last {
      cursor: pointer;
      padding-left: 10px;
    }
  }
}
</style>
