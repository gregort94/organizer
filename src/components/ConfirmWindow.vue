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
        warning: "btn--warning",
        success: "btn--success"
      }
    };
  }
};
</script>


<style scoped lang="scss">
/* Variables */
$windowBG: rgb(49, 49, 49);
$windowText: #fff;
$cancelBtnBG: #6c757d;
$cancelBtnText: #fff;
$dangerBtnBG: #dc3545;
$dangerBtnText: #fff;
$warningBtnBG: #ffc107;
$warningBtnText: #212529;
$successBtnBG: green;
$successBtnText: white;

.confirmWindow {
  display: flex;
  background-color: $windowBG;
  padding: 10px 15px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  color: $windowText;
  z-index: 100;
  align-items: center;
  .text {
    flex: 1 0 0;
  }
  .btn {
    border-radius: 3px;
    margin-left: 5px;
    &--cancel {
      color: $cancelBtnText;
      background-color: $cancelBtnBG;
      border-color: $cancelBtnBG;
      &:hover {
        color: $cancelBtnText;
        background-color: darken($cancelBtnBG, 10%);
        border-color: darken($cancelBtnBG, 10%);
      }
    }
    &--danger {
      color: #fff;
      background-color: $dangerBtnBG;
      border-color: $dangerBtnBG;
      &:hover {
        color: #fff;
        background-color: darken($dangerBtnBG, 10%);
        border-color: darken($dangerBtnBG, 10%);
      }
    }
    &--warning {
      color: $warningBtnText;
      background-color: $warningBtnBG;
      border-color: $warningBtnBG;
      &:hover {
        color: $warningBtnText;
        background-color: darken($warningBtnBG, 10%);
        border-color: darken($warningBtnBG, 10%);
      }
    }
    &--success {
      color: $successBtnText;
      background-color: $successBtnBG;
      border-color: $successBtnBG;
      &:hover {
        color: $successBtnText;
        background-color: darken($successBtnBG, 10%);
        border-color: darken($successBtnBG, 10%);
      }
    }
  }
}
</style>