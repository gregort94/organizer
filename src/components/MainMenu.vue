<template>
  <nav class="menu">
    <button @click="menuOpen = !menuOpen" class="burger" :class="{'cross': menuOpen}">
      <span></span>
    </button>
    <ul class="list" :class="{'open': menuOpen}">
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
  },
  data() {
    return {
      menuOpen: false
    };
  }
};
</script>

<style scoped lang="scss">
@import "../scss/global/variables.scss";
@import "../scss/global/mixins.scss";
/* variables */
$bourgerBreakpoint: $sm;
$burgerColor: $black;
$menuBG: $noteBG2;
$linkColor: $black;
$linkHoverColor: #00a9d3;
$linkActiveColor: darken($linkHoverColor, 7%);

.menu {
  padding: 15px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: $menuBG;
  z-index: 2;
  @media (max-width: $sm) {
  }
}
.list {
  display: flex;
  text-align: center;
  transition: transform 0.5s;
  z-index: 2;
  @media (max-width: $bourgerBreakpoint) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    flex-direction: column;
    transform: translate(0, -100%);
    background: grey;
  }
  &.open {
    transform: translate(0, 0);
    padding: 25px 0px 0px 0px;
  }
}
.link {
  padding: 0px 15px;
  color: $linkColor;
  display: block;
  &:hover {
    color: $linkHoverColor;
  }
  &:active {
    color: $linkActiveColor;
  }
  &.router-link-active {
    border-bottom: 1px solid $linkColor;
  }
  @media (max-width: $bourgerBreakpoint) {
    padding: 15px;
  }
}
.burger {
  width: 25px;
  height: 25px;
  background-color: transparent;
  border: 0;
  display: none;
  padding: 0;
  position: relative;
  z-index: 3;
  @media (max-width: $bourgerBreakpoint) {
    display: block;
  }
  &.cross {
    span {
      transform: rotate(-45deg) translate(-9px, -9px);
    }
    span:before {
      opacity: 0;
    }
    span:after {
      transform: rotate(90deg);
    }
  }
  span {
    position: relative;
    width: 100%;
    height: 2px;
    background-color: $burgerColor;
    border-radius: 2px;
    left: 50%;
    top: 50%;
    display: block;
    transform: translate(-50%, -50%);
    transition: all 0.5s;
    &:before {
      content: "";
      display: block;
      position: absolute;
      background-color: $burgerColor;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform: translate(0, -400%);
    }
    &:after {
      content: "";
      display: block;
      position: absolute;
      background-color: $burgerColor;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      transform: translate(0, 400%);
    }
  }
}
</style>