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
      isCartVisible: false,
      isOrderComplete: false,
      cartItems: [],
      selectedItem: null,
    };
  },
  methods: {
    handleStartOrder() {
      this.isOnLaunchPage = false;
    },
    selectItem(item) {
      this.selectedItem = item;
    },
    handleCheckout() {
      this.isOrderComplete = true;
    },
    resetOrder() {
      this.isOrderComplete = false;
      this.cartItems = [];
      this.isOnLaunchPage = true; // Go back to LaunchPage after completing order
    }
  }
};
</script>

<style scoped>

</style>
