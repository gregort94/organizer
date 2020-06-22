<template>
  <div class="confirmWindow">
    <p class="text">{{text}}</p>
    <button
      v-for="(button, index) in buttons"
      @click="button.handler()"
      :class="btnClasses[button.type]"
      :key="index"
      class="btn"
      type="button"
    >{{button.name}}</button>
    <button @click="$emit('cancel')" class="btn btn--cancel">Cancel</button>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    buttons: Array
  },
  data() {
    return {
      btnClasses: {
        danger: "btn--danger",
        change: "btn--warning",
        close: "btn--warning"
      }
    };
  }
};
</script>


<style scoped lang="scss">
.confirmWindow {
  display: flex;
  background-color: rgb(49, 49, 49);
  padding: 10px 15px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: #fff;
  z-index: 100;
  align-items: center;
  .text {
    flex: 1 0 0;
  }
  .btn {
    border-radius: 3px;
    margin-left: 5px;
    &--cancel {
      color: #fff;
      background-color: #6c757d;
      border-color: #6c757d;
      &:hover {
        color: #fff;
        background-color: #5a6268;
        border-color: #545b62;
      }
    }
    &--danger {
      color: #fff;
      background-color: #dc3545;
      border-color: #dc3545;
      &:hover {
        color: #fff;
        background-color: #c82333;
        border-color: #bd2130;
      }
    }
    &--warning {
      color: #212529;
      background-color: #ffc107;
      border-color: #ffc107;
      &:hover {
        color: #212529;
        background-color: #e0a800;
        border-color: #d39e00;
      }
    }
  }
}
</style>