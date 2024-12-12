<!--
  MainContent.vue
  This Vue component serves as the primary content container for the manager interface,
  dynamically rendering different management views based on the selected item prop.
  It provides a responsive layout that adjusts to sidebar state changes.

  Key Features:
  - Dynamic component rendering based on selection
  - Responsive to sidebar width changes
  - Smooth transitions for layout adjustments
  - Scrollable content area
  
  Props:
  - item (String): Determines which management component to display
    Possible values:
    * 'Manage Employees'
    * 'Inventory'
    * 'Home'
    * 'Menu Items'
    * 'Menu Prices'
    * 'View Reports'
  
  Components:
  - LaunchPage (ManagerHome.vue)
  - Inventory
  - Employees
  - MenuItems
  - MenuPrices
  - Reports
  
  Styling:
  - Fixed positioning with dynamic left offset
  - Brand color scheme
  - Overflow handling for content
  - Smooth transitions for sidebar interactions
  
  Dependencies:
  - CSS variable --sidebar-width for dynamic positioning
-->

<template>
  <div class="main-content">
    <h2>{{ item }}</h2>
    <component
      v-if="item === 'Manage Employees'"
      :is="'Employees'"
      @selectItem="selectItem"
    />
    <component
      v-if="item === 'Inventory'"
      :is="'Inventory'"
      @selectItem="selectItem"
    />
    <component
      v-if="item === 'Home'"
      :is="'LaunchPage'"
      @selectItem="selectItem"
    />
    <component
      v-if="item === 'Menu Items'"
      :is="'MenuItems'"
      @selectItem="selectItem"
    />
    <component
      v-if="item === 'Menu Prices'"
      :is="'MenuPrices'"
      @selectItem="selectItem"
    />
    <component
      v-if="item === 'View Reports'"
      :is="'Reports'"
      @selectItem="selectItem"
    />
  </div>
</template>

<script>
import LaunchPage from './ManagerHome.vue'
import Inventory from './views/Inventory.vue'
import Employees from './views/Employees.vue'
import MenuItems from './views/MenuItems.vue'
import MenuPrices from './views/MenuPrices.vue'
import Reports from './views/Reports.vue'

export default {
  name: 'MainContent',
  props: {
    item: String,
  },
  methods: {
    selectItem(item) {
      console.log('Selected item:', item)
    },
  },
  components: {
    Employees,
    Inventory,
    LaunchPage,
    MenuItems,
    MenuPrices,
    Reports,
  },
}
</script>

<style scoped>
.main-content {
  position: fixed;
  top: 0;
  left: var(--sidebar-width); /* Dynamic left position based on sidebar width */
  right: 0;
  bottom: 0;
  background-color: #9b150b;
  color: #e7e4d7;
  padding: 40px;
  overflow-y: auto;
  transition: left 0.3s ease; /* Smooth transition */
}
</style>
