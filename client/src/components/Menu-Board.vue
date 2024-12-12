<!--
  Menu-Board.vue
  This Vue component serves as a dynamic menu board that conditionally renders different menu sections (Sides, Entrees, Appetizers, Drinks) based on the provided prop. 
  It handles item selection events and provides consistent styling across all menu sections.
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