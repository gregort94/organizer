<template>
  <button
    @click="$emit('clicked')"
    :disabled="disabled"
    :style="[{width: width},{height: height}]"
    :class="hoverEffect"
    type="button"
    class="iconBtn"
  >
    <svg class="img">
      <use :xlink:href="require('@/assets/img/sprite.svg')+'#'+spriteId" />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    spriteId: {
      type: String,
      required: true
    },
    hoverEffect: String,
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: String
    },
    height: {
      type: String
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/global/variables.scss";
@import "../scss/global/mixins.scss";
$imgFill: $text-color-dark;
$fillHover: $divider-color;
$bgHover: rgb(207, 207, 207);

.iconBtn {
  border-radius: 4px;
  border-width: 2px;
  background: transparent;
  border: 0;
  padding: 5px;
  height: 40px;
  width: 40px;
  &:focus {
    box-shadow: none;
  }
  &.fill {
    padding: 0;
    &:hover {
      svg {
        fill: $fillHover;
      }
    }
    &:active {
      svg {
        fill: darken($fillHover, 10%);
      }
    }
  }
  &.bg {
    &:hover {
      background-color: $bgHover;
    }
    &:active {
      background-color: darken($bgHover, 10%);
    }
  }
  &:disabled {
    opacity: 0.7;
    border: 0;
    &:hover {
      background-color: transparent;
      fill: $imgFill;
    }
  }
}

.img {
  object-fit: contain;
  object-position: center;
  fill: $imgFill;
  width: 100%;
  height: 100%;
}
</style>