<template>
  <div id="app">
    <!-- Launch Page -->
    <LaunchPage v-if="isOnLaunchPage" @startOrder="startOrder" />

    <!-- Main App Interface -->
    <div v-else>
      <!-- Menu Bar -->
      <MenuBar v-if="!isCheckoutVisible && !showUserInfo && !isOrderComplete" @selectItem="selectMenuItem" />

      <!-- Main Content -->
      <MainContent v-if="!isCheckoutVisible && !showUserInfo && !isOrderComplete" :item="selectedMenu"
        @addToCart="addToCart" />

      <!-- Cart Button -->
      <button v-show="!isCheckoutVisible && !isOrderComplete && !showUserInfo" class="cart-button" @click="toggleCart"
        :class="{ 'cart-button-open': isCartVisible }">
        <img src="../assets/cart.png" alt="Cart Panel" class="cart-image" />
        <span v-if="cartItems.length > 0" class="cart-count">{{ cartItems.length }}</span>
      </button>

      <!-- Cart Panel -->
      <div v-show="isCartVisible && !isCheckoutVisible && !showUserInfo && !isOrderComplete" class="panel">
        <Cart :cartItems="cartItems" :isCheckoutVisible="isCheckoutVisible" @removeItem="removeFromCart"
          @clearOrder="clearOrder" @showCheckout="proceedToCheckout" />
      </div>

      <!-- Checkout Page -->
      <div v-if="isCheckoutVisible && !isOrderComplete">
        <CheckoutPage :cartItems="cartItems" @confirmOrder="goToUserInfo" @cancelOrder="resetContent" />
      </div>

      <!-- Order Summary -->
      <OrderSummary v-if="(isCheckoutVisible || showUserInfo) && !isOrderComplete" :cartItems="cartItems" />

      <!-- User Info -->
      <UserInfo v-if="showUserInfo && !isOrderComplete" @cancelUserInfo="cancelUserInfo"
        @completeOrder="completeOrder" />
      
      <!-- Order Completion Screen -->
      <OrderComplete v-if="isOrderComplete" @newOrder="resetOrder" />
    </div>
  </div>
</template>

<script>
import LaunchPage from '../components/LaunchPage.vue';
import MenuBar from '../components/MenuBar.vue';
import MainContent from '../components/MainContent.vue';
import Cart from '../components/Cart.vue';
import CheckoutPage from '../components/CheckoutPage.vue';
import OrderSummary from '../components/OrderSummary.vue';
import UserInfo from '../components/UserInfo.vue';
import OrderComplete from '../components/OrderComplete.vue';

export default {
  components: {
    LaunchPage,
    MenuBar,
    MainContent,
    Cart,
    CheckoutPage,
    OrderSummary,
    UserInfo,
    OrderComplete,
  },
  data() {
    return {
      isOnLaunchPage: true,
      isCartVisible: false,
      isCheckoutVisible: false,
      isOrderComplete: false,
      cartItems: [],
      selectedMenu: null,
      name: '',
      phone: '',
      transactionId: '',
      readyTime: '',
      isCartVisible: false,
      showUserInfo: false,
      selectedPayment: null,
      employeeID: 0,
    };
  },
  methods: {
    /**
     * Store the user's selected items in the cart.
     * This method can save the cart data locally or send it to a backend.
     */
    // async storeOrder(orderDetails) {
    //   // Prepare the order object
    //   const order = {
    //     employeeID: this.employeeID,
    //     cartItems: this.cartItems,
    //     total: this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0), // Calculate total price
    //     timestamp: new Date().toISOString(), // Add timestamp
    //     ...orderDetails, // Include additional order details (e.g., payment method, user info)
    //   };

    // try {
    //   // Send the order to the backend API
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_API_ENDPOINT}/orders/store`, // Replace with your actual endpoint
    //     order
    //   );

    //   console.log('Order stored successfully:', response.data);
    //   // Handle post-order actions (e.g., show confirmation, reset cart)
    //   this.isOrderComplete = true;
    //   this.transactionId = response.data.transactionId;
    //   this.readyTime = response.data.readyTime;
    // } catch (error) {
    //   console.error('Error storing the order:', error);
    //   alert('There was an issue storing your order. Please try again.');
    // }
    // },
    startOrder() {
      this.isOnLaunchPage = false;
    },
    selectMenuItem(menu) {
      this.selectedMenu = menu;
    },
    toggleCart() {
      this.isCartVisible = !this.isCartVisible;
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
    },
    clearCart() {
      this.cartItems = [];
    },
    proceedToCheckout() {
      this.isCheckoutVisible = true;
    },
    cancelCheckout() {
      this.isCheckoutVisible = false;
    },
    addToCart(item) {
      Array.isArray(item) ? this.cartItems.push(...item) : this.cartItems.push(item);
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
    },
    clearOrder() {
      this.cartItems = [];
    },
    resetCart() {
      this.clearOrder(); // Reset the cart after finalizing the order
    },
    hideContent() {
      this.isCheckoutVisible = true; // Hide main content and cart, show checkout
    },
    goToUserInfo() {
      this.isCheckoutVisible = false;
      this.showUserInfo = true;
    },
    resetContent() {
      this.isCheckoutVisible = false; // Go back to main content view
      this.isCartVisible = false; // Hide cart when returning from checkout
    },
    completeOrder() {
      // Set isOrderComplete to true to show the OrderComplete component
      this.isOrderComplete = true;
      this.showUserInfo = false; // Hide UserInfo after completion
    },
    cancelUserInfo() {
      this.showUserInfo = false; // Go back to CheckoutPage
    },
    resetOrder() {
      this.isOrderComplete = false;
      this.cartItems = [];
      this.orderDetails = { transactionId: '', readyTime: '' };  // Reset order details
      this.isOnLaunchPage = true;
      this.showUserInfo = false;
      this.showUserInfo = false;
    },
  },
};
</script>

<style scoped>
.cart-button {
  position: fixed;
  top: 30px;
  right: 45px;
  background-color: #e7e4d7;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 3px #080808;
  border-radius: 75px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-button:hover {
  background-color: #d2ceb8;
}

.cart-button-open {
  background-color: #d2ceb8;
  box-shadow: none;
}

.cart-image {
  width: 50px;
  height: auto;
}

.cart-count {
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  font-size: 14px;
  font-weight: bold;
  padding: 3px 7px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>