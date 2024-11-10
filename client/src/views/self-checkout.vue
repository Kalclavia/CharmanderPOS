<template>
  <div id="app">
    <!-- Show LaunchPage if user hasn't tapped "Tap to Order" -->
    <LaunchPage v-if="isOnLaunchPage" @startOrder="handleStartOrder" />

    <!-- Show main app interface once "Tap to Order" is tapped -->
    <div v-else>
      <MenuBar @selectItem="selectItem" />
      <MainContent :item="selectedItem" />
      <Cart v-if="isCartVisible" :items="cartItems" @checkout="handleCheckout" />
      <OrderCompletePopup v-if="isOrderComplete" @close="resetOrder" />
    </div>
  </div>
</template>

<script>
import LaunchPage from '../components/LaunchPage.vue';
import MenuBar from '../components/MenuBar.vue';
import MainContent from '../components/MainContent.vue';
import Cart from '../components/Cart.vue';
import CheckoutPage from '../components/CheckoutPage.vue';
import OrderComplete from '../components/OrderComplete.vue';

export default {
  name: 'App',
  components: {
    LaunchPage,
    MenuBar,
    MainContent,
    Cart,
    CheckoutPage,
    OrderComplete,
  },
  data() {
    return {
      isOnLaunchPage: true,
      isCartVisible: false,
      isOrderComplete: false,
      showCheckout: false,
      cartItems: [],
      selectedItem: null,
    };
  },
  methods: {
    handleStartOrder() {
      this.isOnLaunchPage = false;
    },
    selectItem(item) {
      this.selectedItem = item;
    },
    showCheckoutPage() {
      this.showCheckout = true;
    },
    cancelCheckout() {
      this.showCheckout = false;
    },
    handlePlaceOrder(paymentMethod) {
      // Handle the order logic here and push to the database
      this.showCheckout = false;
      console.log('Order placed with payment method:', paymentMethod);
    },
    resetOrder() {
      this.isOrderComplete = false;
      this.cartItems = [];
      this.isOnLaunchPage = true; // Go back to LaunchPage after completing order
    }
  }
};
</script>

<style scoped>

</style>
