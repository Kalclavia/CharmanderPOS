<!--
  Menu2.vue
  Vue component for second menu page, which displays a dynamic list of all currently available entrees and sides from the database.
-->


<template>
  <div class="main-content">
    <!-- Display Sides -->
    <div class="banner">
      <h1>(2) Choose Your Side(s)</h1>
    </div>
    <MenuBoard :item="'Sides'" />

    <!-- Display Entrees -->
    <div class="banner">
      <h1>(3) Choose Your Entree(s)</h1>
    </div>
    <MenuBoard :item="'Entrees'" />
  </div>
</template>

<script>
import MenuBoard from '../components/Menu-Board.vue'

export default {
  name: 'Menu2',
  components: {
    MenuBoard,
  },
}
</script>

<style scoped>
/* Main container styling */
.main-content {
  position: fixed;
  top: 0;
  left: 0px;
  right: 0;
  bottom: 0;
  background-color: #000000e3; /* Semi-transparent black background */
  color: #e7e4d7;  /* Off-white text color */
  padding: 0zpx;   /* Note: There's a typo here - 'zpx' should be 'px' */
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
}

/* Sliding panel styling (currently unused in template) */
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
  z-index: 999; /* Ensures panel appears above other content */
}

/* Section header banner styling */
.banner {
  background-color: #9b150b; /* Deep red background */
  padding: 20px;
}
</style>