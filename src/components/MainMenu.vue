<template>
  <nav class="menu">
    <ul class="list">
      <li v-for="(url, name) in links" :key="name" class="list-item">
        <router-link :to="url">{{name}}</router-link>
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

<style lang="scss">
.menu {
  .list {
    display: flex;
  }
}
</style>