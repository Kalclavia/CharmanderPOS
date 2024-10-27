<template>
    <div class="menu-page">
      <h2>Appetizers</h2>
      <div class="menu-items">
        <div v-for="item in appetizers" :key="item.name" class="menu-item">
          <p>{{ item.name }}</p>
          <p>\${{ item.price.toFixed(2) }}</p>
          <button @click="addToCart(item)">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        appetizers: [
          { name: 'Spring Roll', price: 1.50 },
          { name: 'Chicken Egg Roll', price: 1.75 },
          // Add other items as needed
        ],
      };
    },
    methods: {
      addToCart(item) {
        this.$emit('addToCart', item);
      },
    },
  };
  </script>
  