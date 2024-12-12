<!--
  OrderComplete.vue
  This Vue component renders an order confirmation page shown after successful order completion.
  It displays the transaction details, estimated ready time, and provides an option to start a new order.

  Key Features:
  - Displays transaction ID
  - Shows estimated order ready time
  - Animated confirmation check
  - Panda Express branding
  - New order functionality
  
  Props:
  - transactionId (Number): Unique identifier for the order
  - readyTime (String): Estimated time when order will be ready
  
  Events:
  - newOrder: Emitted when user clicks to start a new order
  
  Styling:
  - Centered layout with flex
  - Consistent branding colors
  - Responsive design
  - Fixed positioning for overlay effect
  
  Dependencies:
  - @/assets/panda-logo.png
  - @/assets/confirmation-check.gif
-->

<template>
  <div class="order-complete-page" v-if="transactionId && readyTime">
    <img src="@/assets/panda-logo.png" alt="Panda Logo" class="panda-logo" />
    <img
      src="@/assets/confirmation-check.gif"
      alt="Confirmation Check"
      class="confirmation-check"
    />
    <h2>Order Complete!</h2>
    <p>
      Transaction ID: <strong>{{ transactionId }}</strong>
    </p>
    <p>
      Estimated Ready Time: <strong>{{ readyTime }}</strong>
    </p>
    <!-- New Order Button -->
    <button class="new-order-button" @click="startNewOrder">New Order</button>
  </div>
</template>

<script>
export default {
  props: {
    transactionId: {
      type: Number,
      required: true,
    },
    readyTime: {
      type: String,
      required: true,
    },
  },
  methods: {
    startNewOrder() {
      this.$emit('newOrder')
    },
  },
}
</script>

<style scoped>
.order-complete-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #e7e4d7;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  position: fixed;
}

.panda-logo {
  width: 260px;
}

.confirmation-check {
  width: 260px;
}

h2 {
  font-size: 1.5em;
  color: #5cb85c;
  /* Green color to match confirmation */
}

p {
  font-size: 1.125em;
  margin: 5px 0;
}

.new-order-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1em;
  color: #ffffff;
  background-color: #5cb85c;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.new-order-button:hover {
  background-color: #4cae4c;
}
</style>
