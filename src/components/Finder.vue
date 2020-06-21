<template>
  <section class="finder">
    <input v-model="value" type="text" class="finder__input" />
    <p v-show="nothingFind" class="finder__message">Nothing find</p>
  </section>
</template>

<script>
export default {
  props: {
    sourceData: Array
  },
  data() {
    return {
      value: "",
      dubouceId: "",
      nothingFind: false
    };
  },
  watch: {
    value() {
      if (this.dubouceId) {
        clearTimeout(this.dubouceId);
      }
      this.dubouceId = setTimeout(() => {
        const filteredUsers = this.sourceData.filter(user => {
          const value = this.value.toLowerCase();
          return user.name.toLowerCase().indexOf(value) + 1;
        });
        this.$emit("filtered", filteredUsers);
        filteredUsers.length === 0
          ? (this.nothingFind = true)
          : (this.nothingFind = false);
      }, 300);
    }
  },
  methods: {
    cleanValue() {
      this.value = "";
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/global/variables.scss";
.finder {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 5px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  border-radius: 2px;
  width: 500px;
  &__input {
    width: 100%;
  }
  &__message {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 130%);
    font-size: 20px;
    font-size: 20px;
    &--hidden {
      display: none;
    }
  }
  @media (max-width: $xs) {
    left: 0;
    transform: translate(0, 0);
    width: 100%;
    margin: 0px 15px 0px 0px;
  }
}
</style>
