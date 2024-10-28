<!-- src/components/NavBar.vue -->
<template>
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/employees">Employees</router-link></li>
        <li><router-link to="/inventory">Inventory</router-link></li>
        <li><router-link to="/reports">Reports</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: "NavBar",
  };
  </script>
  
  <style scoped>
  .navbar {
    background-color: #333;
    padding: 1rem;
  }
  .navbar ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  .navbar li {
    display: inline;
  }
  .navbar a {
    color: white;
    text-decoration: none;
  }
  .navbar a:hover {
    text-decoration: underline;
  }
  </style>
  