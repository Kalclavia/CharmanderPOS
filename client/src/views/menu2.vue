<template>
  <div class="main-content">
    <div class="banner">
      <h1>(2) Choose Your Side(s)</h1>
    </div>
    <MenuBoard :item="'Sides'" />

    <div class="banner">
      <h1>(3) Choose Your Entree(s)</h1>
    </div>
    <MenuBoard :item="'Entrees'" />
  </div>
</template>

<script>
import MenuBoard from '../components/Menu-Board.vue'

export default {
  name: 'Menu1',
  components: {
    MenuBoard,
  },
}
</script>

<style scoped>
.main-content {
  position: fixed;
  top: 0;
  left: 0px;
  right: 0;
  bottom: 0;
  background-color: #000000e3;
  color: #e7e4d7;
  padding: 0zpx;
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

.banner {
  background-color: #9b150b;
  padding: 20px;
}
</style>
