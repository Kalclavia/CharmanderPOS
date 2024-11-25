<template>
  <div class="menu-bar" :style="{ width: sideBarWidth }">
    <span class="collapsebar">
      <button
        @click="toggleSideBar"
        class="arrow"
        :class="{ rotate: collapsed }"
      >
        &gt;&gt;
      </button>
    </span>
    <span v-if="collapsed"> </span>
    <span v-else>
      <h2
        v-if="
          $cookies.get('role') == 'manager' || $cookies.get('role') == 'cashier'
        "
        class="title"
      >
        Signed in as: EmployeeID #{{ $cookies.get('ID') }}
      </h2>
      <h2 class="title">OPTIONS</h2>
      <button
        class="button"
        style="width: 200px"
        @click="$emit('selectItem', 'Home')"
      >
        Home Page
      </button>
      <button
        class="button"
        style="width: 200px"
        @click="$emit('selectItem', 'Inventory')"
      >
        Inventory Items
      </button>
      <button
        class="button"
        style="width: 200px"
        @click="$emit('selectItem', 'Menu Items')"
      >
        Menu Items
      </button>
      <button
        class="button"
        style="width: 200px"
        @click="$emit('selectItem', 'Menu Prices')"
      >
        Menu Prices
      </button>
      <button
        class="button"
        style="width: 200px"
        @click="$emit('selectItem', 'Manage Employees')"
      >
        Manage Employees
      </button>
      <button
        class="button"
        style="width: 200px"
        @click="$emit('selectItem', 'View Reports')"
      >
        Reports
      </button>
      <button class="button" style="width: 200px" @click="RouteToCashier">
        Switch to Cashier View
      </button>
      <button class="button" style="width: 200px" @click="RouteToSCO">
        Switch to Self Checkout View
      </button>
      <Translate />
    </span>
  </div>
</template>

<script>
import { collapsed, toggleSideBar, sideBarWidth, showButtons } from './state.js'
import Translate from './translate/translateModel.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'MenuBar',
  setup() {
    const router = useRouter()

    const RouteToCashier = () => {
      router.push('/cashier')
    }

    const RouteToSCO = () => {
      router.push('/')
    }

    return {
      RouteToCashier,
      RouteToSCO,
      collapsed,
      toggleSideBar,
      sideBarWidth,
      showButtons,
    }
  },
  components: {
    Translate,
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
  margin-bottom: 0.9375em;
  font-size: 1.5em;
  text-align: center;
  color: #080808;
}

.button {
  border: 2px solid #080808;
  border-radius: 30px;
  background-color: #e7e4d7;
  color: #080808;
  font: Arial;
  padding: 0.9375em;
  margin-bottom: 10px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 4px 3px #080808;
}

.button:hover {
  background-color: #d2ceb8;
}

.arrow {
  font-size: 18px;
  color: #080808;
  background-color: transparent;
  border: none;
  transition: 0.2s linear;
}

.rotate {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
