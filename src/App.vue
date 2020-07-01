<template>
  <div id="app">
    <main-menu :links="{
      notes: 'notes',
      contacts: 'contacts'  
    }"></main-menu>
    <transition name="soft">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import MainMenu from "./components/MainMenu";
export default {
  components: {
    MainMenu
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
