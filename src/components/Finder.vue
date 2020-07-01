<template>
  <section class="finder">
    <input v-model="value" type="text" class="input" />
    <p v-show="nothingFind" class="message">Nothing find</p>
  </section>
</template>

<script>
export default {
  props: {
    sourceData: Array,
    filteredField: String
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
          return user[this.filteredField].toLowerCase().indexOf(value) + 1;
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
  top: 55px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 5px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 2px;
  width: 500px;
  z-index: 1;
  @media (max-width: $xs) {
    left: 0;
    transform: translate(0, 0);
    width: calc(100% - 30px);
    margin: 0px 15px 0px 0px;
  }
}
.input {
  width: 100%;
  background-color: #fff;
}
.message {
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
</style>
