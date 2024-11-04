<template>
  <div
    class="menu-bar"
    :style="{ width: sideBarWidth }"
    @mouseenter="toggleSideBar"
    @mouseleave="toggleSideBar"
  >
    <span class="collapsebar">
      <span class="arrow">&gt;&gt;</span>
    </span>
    <span v-if="collapsed"> </span>
    <span v-else>
      <h2 v-if="showButtons" class="title">OPTIONS</h2>
      <button
        v-if="showButtons"
        style="width: 200px"
        @click="$emit('selectItem', 'Home')"
      >
        Home Page
      </button>
      <button
        v-if="showButtons"
        style="width: 200px"
        @click="$emit('selectItem', 'Inventory')"
      >
        Inventory Items
      </button>
      <button
        v-if="showButtons"
        style="width: 200px"
        @click="$emit('selectItem', 'Menu Prices')"
      >
        Menu Prices
      </button>
      <button
        v-if="showButtons"
        style="width: 200px"
        @click="$emit('selectItem', 'Manage Employees')"
      >
        Manage Employees
      </button>
      <button
        v-if="showButtons"
        style="width: 200px"
        @click="$emit('selectItem', 'View Reports')"
      >
        Reports
      </button>
    </span>
  </div>
</template>

<script>
import { collapsed, toggleSideBar, sideBarWidth, showButtons } from './state.js'

export default {
  name: 'MenuBar',
  setup() {
    return { collapsed, toggleSideBar, sideBarWidth, showButtons }
  },
}
</script>

<style scoped>
.menu-bar {
  background-color: #e7e4d7;
  width: 250px;
  height: 100vh;
  padding: 20px;
  position: fixed;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px #080808;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: width 0.3s ease;
}

.title {
  margin-bottom: 15px;
  font-size: 24px;
  text-align: center;
  color: #080808;
}

button {
  border: 2px solid #080808;
  border-radius: 30px;
  background-color: #e7e4d7;
  color: #080808;
  font: Arial;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 4px 3px #080808;
}

button:hover {
  background-color: #d2ceb8;
}

.arrow {
  font-size: 18px;
  color: #080808;
}
</style>
