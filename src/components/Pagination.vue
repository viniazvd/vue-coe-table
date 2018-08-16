<template>
  <div class="pagination">
    <slot name="pagination" :pagination="handlers">
      <div class="handlers">
        <span class="first" @click="$emit('to-first')">«</span>

        <button
          v-for="(handler, index) in handlers"
          :key="index + '…'"
          :class="['handler', { '-page': index + 1 === page }]"
          @click="$emit('change-page', handler)"
        >
          {{ handler.handler || handler.page }}
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
    handlers: {
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

  & > .handlers {
    display: flex;
    max-width: 500px;
    align-items: center;

    & > .first {
      cursor: pointer;
      padding-right: 10px;
    }

    & > .handler {
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
