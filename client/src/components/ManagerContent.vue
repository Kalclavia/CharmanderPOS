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
  </div>
</template>

<script>
import LaunchPage from './ManagerHome.vue'
import Inventory from './views/Inventory.vue'
import Employees from './views/Employees.vue'
import MenuItems from './views/MenuItems.vue';
import MenuPrices from './views/MenuPrices.vue';

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
    MenuPrices
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
