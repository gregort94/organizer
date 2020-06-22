<template>
  <nav class="menu">
    <ul class="list">
      <li v-for="(url, name) in links" :key="name" class="list-item">
        <router-link class="link" :to="url">{{name.toUpperCase()}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    links: Object
  }
};
</script>

<style scoped lang="scss">
@import "../scss/global/variables.scss";
@import "../scss/global/mixins.scss";
.menu {
  padding: 15px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 99;
  .list {
    display: flex;
  }
  .link {
    padding: 0px 15px;
    color: $black;
    display: block;
    &:hover {
      color: #00a9d3;
    }
    &:active {
      color: #046675;
    }
    &.router-link-active {
      border-bottom: 1px solid $black;
    }
  }
}
</style>