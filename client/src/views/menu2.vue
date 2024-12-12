<!--
  Menu2.vue
  This Vue component implements the second menu board page for a Panda Express restaurant,
  focused on the dynamic display of sides and entrees available for selection.

  Key Features:
  - Two-section layout:
    * Sides selection
    * Entrees selection
  - Dynamic menu item loading
  - Scrollable content area
  - Section headers with step numbers
  
  Component Structure:
  - Uses MenuBoard component with two configurations:
    1. Sides display (:item="'Sides'")
    2. Entrees display (:item="'Entrees'")
  
  Layout Flow:
  1. Side Dishes (Step 2):
     - Displays all available side options
     - Dynamically populated from database
  
  2. Entree Selection (Step 3):
     - Shows all available entree options
     - Dynamically populated from database
  
  Dependencies:
  - Menu-Board.vue: Reusable component for item display
  
  Styling:
  - Fixed full-screen positioning
  - Semi-transparent background
  - Scrollable content
  - Consistent branding elements
  
  Notes:
  - Contains typo in CSS padding ('zpx' should be 'px')
  - Includes unused panel styling for potential future use

  Author: Abhi Bhattacharyya

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
  padding: 0px;
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
}

/* Section header banner styling */
.banner {
  background-color: #9b150b; /* Deep red background */
  padding: 20px;
}
</style>