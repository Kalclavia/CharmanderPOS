<template>
  <div class="cart-panel" :style="{ width: cartWidth }">
    <span class="collapsebar" @click="toggleCart"></span>
    <span v-if="collapsed"></span>
    <span v-else>
      <h2 class="title">{{ 'Shopping Cart' }}</h2>

      <div class="cart-items">
        <ul>
          <li v-for="(item, index) in cartItems" :key="index">
            <button class="remove-btn" @click="removeFromCart(index)">×</button>
            <div class="item-name">
              {{ item.name }}
              <!-- Use label instead of name -->
              <span v-if="item.isPremium" class="premium-label">*Premium</span>
            </div>
            <div class="item-price">${{ item.price.toFixed(2) }}</div>
          </li>
        </ul>
      </div>

      <div class="total">Total: ${{ total.toFixed(2) }}</div>
    </span>

    <button class="clear-order-btn" @click="clearOrder">Clear Order</button>
    <button class="place-order-btn" @click="showCheckout">Place Order</button>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'Cart',
  props: {
    cartItems: { type: Array, default: () => [] },
  },
  setup(props, { emit }) {
    const collapsed = ref(false)
    const cartWidth = computed(() => (collapsed.value ? '265px' : '450px'))
    const total = computed(() =>
      props.cartItems.reduce((sum, item) => sum + item.price, 0),
    )

    const toggleCart = () => {
      collapsed.value = !collapsed.value
    }
    const removeFromCart = index => {
      emit('removeItem', index)
    }
    const clearOrder = () => {
      emit('clearOrder')
    }
    const showCheckout = () => {
      emit('showCheckout')
    }

    // Watch total and emit its value to
    watch(total, newTotal => {
      emit('updateTotal', newTotal)
    })

    return {
      collapsed,
      cartWidth,
      total,
      toggleCart,
      removeFromCart,
      clearOrder,
      showCheckout,
    }
  },
}
</script>

<style scoped>
.cart-panel {
  background-color: #e7e4d7;
  width: 250px;
  height: 100vh;
  padding: 20px;
  position: fixed;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 8px #080808;
  top: 0;
  right: 0;
  z-index: 1000;
  transition: width 0.3s ease;
  justify-content: flex-start;
  overflow-y: auto;
}

.collapsebar {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.9375em;
}

.title {
  margin-bottom: 0.9375em;
  font-size: 1.5em;
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
  justify-content: flex-start;
}

li:first-child {
  margin-top: 0.9375em;
}

/* Remove Button */
.remove-btn {
  background-color: #ff4136;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1em;
  line-height: 1;
  margin-right: 10px;
  /* Space between the button and the item */
}

/* Item Name Column */
.item-name {
  flex: 2;
  /* Allow item name to take more space */
  text-align: left;
}

/* Item Price Column */
.item-price {
  flex: 1;
  /* Price column takes less space */
  text-align: right;
  /* Align the price to the right */
}

/* Total */
.total {
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 55px;
  color: #080808;
}

/* Clear Order Button */
.clear-order-btn {
  background-color: #d53f3f;
  color: rgb(225, 255, 255);
  border: 2px solid #080808;
  border-radius: 10px;
  box-shadow: 0 2px 2px #080808;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: fixed;
  bottom: 20px;
  right: 260px;
  text-align: center;
  font-size: medium;
  font-size: 1.5em;
}

.clear-order-btn:hover {
  background-color: #9b150b;
}

.place-order-btn {
  background-color: #4caf50;
  color: white;
  border: 2px solid #080808;
  border-radius: 10px;
  box-shadow: 0 2px 2px #080808;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: fixed;
  bottom: 20px;
  right: 40px;
  text-align: center;
  font-size: 1.5em;
}

.place-order-btn:hover {
  background-color: #45a049;
}
.premium-label {
  color: #af0202;
  font-weight: bold;
  margin-left: 5px;
}
</style>
