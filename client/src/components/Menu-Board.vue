<!--
  Menu-Board.vue
  This Vue component serves as a dynamic menu display controller, 
  managing different menu section components based on provided props.

  Key Features:
  - Dynamic component rendering
  - Unified item selection handling
  - Consistent styling across sections
  
  Components:
  - Sides: Side dishes display
  - Entrees: Main dishes display
  - Appetizers: Appetizer options
  - Drinks: Beverage selection
  
  Props:
  - item (String): Determines which menu section to display
    Valid values:
    * 'Sides'
    * 'Entrees'
    * 'Appetizers'
    * 'Drinks'
  
  Events:
  - selectItem: Emitted when menu item is selected
    Payload: Selected item details
  
  Component Behavior:
  - Shows/hides headers based on section type
  - Maintains consistent event handling
  - Provides debug logging
  
  Styling:
  - Fixed panel positioning
  - Semi-transparent background
  - Shadow effects
  - Scrollable content area
  
  Author: Abhi Bhattacharyya
  
-->

<template>
  <div class="menu-board">
    <component
      v-if="item === 'Sides'"
      :is="'Sides'"
      @selectItem="selectItem"
    />
    <component
      v-if="item === 'Entrees'"
      :is="'Entrees'"
      @selectItem="selectItem"
    />
    <component
      v-if="item === 'Appetizers'"
      :is="'Appetizers'"
      @selectItem="selectItem"
      :showHeader="false"
    />
    <component
      v-if="item === 'Drinks'"
      :is="'Drinks'"
      @selectItem="selectItem"
      :showHeader="false"
    />
  </div>
</template>

<script>
import Sides from './menu/Sides.vue'
import Entrees from './menu/Entrees.vue'
import Appetizers from './menu/Appetizers.vue'
import Drinks from './menu/Drinks.vue'

export default {
  name: 'Menu-Board',
  
  // Define required props
  props: {
    item: String,  // Controls which menu section to display
  },

  // Methods for handling user interactions
  methods: {
    selectItem(item) {
      // Handle the selected item here
      console.log('Menuboard is displaying:', item)
    },
  },

  // Register child components
  components: {
    Sides,
    Entrees,
    Appetizers,
    Drinks,
  },
}
</script>

<style scoped>
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