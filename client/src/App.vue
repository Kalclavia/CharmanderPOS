<template>
  <div id="app">
    <MenuBar @selectItem="selectItem" />
    <MainContent :item="selectedItem" />
  </div>
</template>

<script>
import LaunchPage from './components/ManagerHome.vue';
import MenuBar from './components/NavBar.vue';
import MainContent from './components/ManagerContent.vue';
import { collapsed } from './components/state.js';

export default {
  name: 'App',
  components: {
    LaunchPage,
    MenuBar,
    MainContent,
  },
  data() {
    return {
      isOnLaunchPage: true,
      selectedItem: "Home", 
    };
  },
  created() {
    // Set initial states
    this.isOnLaunchPage = true;
    collapsed.value = true; 
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item;
      this.isOnLaunchPage = false;
    },
  }
};
</script>

<style scoped>

</style>
