<template>
  <div class="main-content">
    <h1>{{ item }} Panda Express</h1>
    <MenuBoard :item="'Appetizers'" />
    <MenuBoard :item="'Drinks'" />
  </div>
</template>

<script>
import MenuBoard from '../components/Menu-Board.vue'

export default {
  name: 'Menu1',
  components: {
    MenuBoard,
  },
  data() {
    return {
      isOnLaunchPage: true,
      isCartVisible: false,
      isOrderComplete: false,
      cartItems: [],
      selectedItem: null,
    }
  },
}
</script>

<style scoped>
.main-content {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0;
  background-color: #9b150b;
  color: #e7e4d7;
  padding: 40px;
  overflow-y: auto;
}

.panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background-color: #000000e3;
  color: #e7e4d7;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
  z-index: 999;
}
</style>
