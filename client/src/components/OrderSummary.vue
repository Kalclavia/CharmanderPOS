<template>
  <div class="order-summary">
    <h2>Order Summary</h2>
    <div class="cart-items">
      <ul>
        <li v-for="(item, index) in cartItems" :key="index">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-price">${{ item.price.toFixed(2) }}</div>
        </li>
      </ul>
    </div>

    <div class="total">Total: ${{ total.toFixed(2) }}</div>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
  computed: {
    total() {
      return this.cartItems.reduce((sum, item) => sum + item.price, 0)
    },
  },
}
</script>

<style scoped>
.order-summary {
  background-color: #e7e4d7;
  width: 450px;
  height: 100vh;
  padding: 20px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px #080808;
  top: 0;
  left: 0;
  z-index: 1000;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
  color: #080808;
}

.cart-items {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 0.9375em;
}

ul {
  list-style-type: none;
  padding: 0;
  color: #080808;
}

li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-name {
  flex: 2;
  text-align: left;
}

.item-price {
  flex: 1;
  text-align: right;
}

.total {
  font-weight: bold;
  margin-top: 20px;
  color: #080808;
}
</style>
