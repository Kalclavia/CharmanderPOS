<template>
  <div id="app">
    <NavBar/>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Inventory from './components/Inventory.vue';
import NavBar from './components/NavBar.vue';
import Employees from './components/Employees.vue';
import Reports from './components/Reports.vue';

export default {
  name: 'App',
  components: {
    Home,
    Inventory,
    Reports,
    Employees,
    NavBar,
  },
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>

<style scoped>
</style>

