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
      <!-- Logout Button -->
      <button v-if="$cookies.get('role') == 'manager' || $cookies.get('role') == 'cashier'" @click="logout" class="logout-button">
        <span class="logout-icon">✖</span> LOGOUT
      </button>
      <h2 v-if="$cookies.get('role') == 'manager' || $cookies.get('role') == 'cashier'" class="toolbar">Signed in as: {{ capitalizedRole }} #{{$cookies.get('ID')}} </h2>

      <h2  class="title">OPTIONS</h2>
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
  computed: {
    capitalizedRole() {
      const role = this.$cookies.get('role');
      return role ? role.charAt(0).toUpperCase() + role.slice(1) : '';
    },
  },
  setup() {
    const router = useRouter()

    const RouteToCashier = () => {
      router.push('/cashier')
    }

    const RouteToSCO = () => {
      router.push('/')
    }

    const logout = () => {
      // Clear user session cookies
      $cookies.remove('ID');
      $cookies.remove('role');
      // Redirect to login page
      router.push('/login');
    };

    return {
      RouteToCashier,
      RouteToSCO, collapsed, toggleSideBar, sideBarWidth, showButtons, logout }
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

.toolbar {
  margin-bottom: 35px;
  font-size: 18px;
  text-align: center;
  color: #080808;
  border-bottom: 2px solid #080808;
}

.logout-button {
  border: 2px solid #080808;
  border-radius: 30px;
  background-color: #d2ceb8;
  color: #080808;
  font: Arial;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 4px 3px #080808;
  margin-top: 20px;
  width: 200px;
  text-align: center;
}

.logout-button:hover {
  background-color: #938f7a;
}

.logout-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  width: 20px;
  height: 20px;
  border: 2px solid #080808;
  border-radius: 50%;
  background-color: #d2ceb8;
  color: #080808;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
}

</style>
