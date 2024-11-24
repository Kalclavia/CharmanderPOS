<template>
  <div class="menu-board">
    <component
      v-if="item === 'Sides'"
      :is="'ALaCarte'"
      @selectItem="selectItem"
    />
    <component
      v-if="item === 'Entrees'"
      :is="'ALaCarte'"
      @selectItem="selectItem"
    />
    <component
      v-if="item === 'Appetizers'"
      :is="'Appetizers'"
      @selectItem="selectItem"
    />
    <component
      v-if="item === 'Drinks'"
      :is="'Drinks'"
      @selectItem="selectItem"
    />
  </div>
</template>

<script>
import ALaCarte from './menu/ALaCarte.vue'
import Appetizers from './menu/Appetizers.vue'
import Drinks from './menu/Drinks.vue'

export default {
  name: 'Menu-Board',
  props: {
    item: String,
  },
  methods: {
    selectItem(item) {
      // Handle the selected item here
      console.log('Menuboard is displaying:', item)
    },
  },
  components: {
    ALaCarte,
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
