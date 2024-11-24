<template>
  <div id="app">
    <!-- Launch Page -->
    <LaunchPage v-if="isOnLaunchPage" @startOrder="startOrder" />

    <!-- Main App Interface -->
    <div v-else>
      <!-- Menu Bar -->
      <MenuBar
        v-if="!isCheckoutVisible && !showUserInfo && !isOrderComplete"
        @selectItem="selectMenuItem"
      />

      <!-- Main Content -->
      <MainContent
        v-if="!isCheckoutVisible && !showUserInfo && !isOrderComplete"
        :item="selectedMenu"
        @addToCart="addToCart"
        @addToTransactionCart="addToTransactionCart"
      />

      <!-- Cart Button -->
      <button
        v-show="!isCheckoutVisible && !isOrderComplete && !showUserInfo"
        class="cart-button"
        @click="toggleCart"
        :class="{ 'cart-button-open': isCartVisible }"
      >
        <img src="../assets/cart.png" alt="Cart Panel" class="cart-image" />
        <span v-if="cartItems.length > 0" class="cart-count">{{
          cartItems.length
        }}</span>
      </button>

      <!-- Cart Panel -->
      <div
        v-show="
          isCartVisible &&
          !isCheckoutVisible &&
          !showUserInfo &&
          !isOrderComplete
        "
        class="panel"
      >
        <Cart
          :cartItems="cartItems"
          :isCheckoutVisible="isCheckoutVisible"
          @removeItem="removeFromCart"
          @clearOrder="clearOrder"
          @showCheckout="proceedToCheckout"
          @updateTotal="updateCartTotal"
        />
      </div>

      <!-- Checkout Page -->
      <div v-if="isCheckoutVisible && !isOrderComplete">
        <CheckoutPage
          :cartItems="cartItems"
          @confirmOrder="goToUserInfo"
          @cancelOrder="resetContent"
          @updatePayment="updatePaymentMethod"
        />
      </div>

      <!-- Order Summary -->
      <OrderSummary
        v-if="(isCheckoutVisible || showUserInfo) && !isOrderComplete"
        :cartItems="cartItems"
      />

      <!-- User Info -->
      <UserInfo
        v-if="showUserInfo && !isOrderComplete"
        @cancelUserInfo="cancelUserInfo"
        @completeOrder="completeOrder"
      />

      <!-- Order Completion Screen -->
      <OrderComplete
        v-if="isOrderComplete"
        :transactionId="transactionId"
        :readyTime="readyTime"
        @newOrder="resetOrder"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import LaunchPage from '../components/LaunchPage.vue'
import MenuBar from '../components/MenuBar.vue'
import MainContent from '../components/MainContent.vue'
import Cart from '../components/Cart.vue'
import CheckoutPage from '../components/CheckoutPage.vue'
import OrderSummary from '../components/OrderSummary.vue'
import UserInfo from '../components/UserInfo.vue'
import OrderComplete from '../components/OrderComplete.vue'

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
      transactionCart: [],
      cartTotal: 0,
      selectedMenu: null,
      name: '',
      phone: '',
      transactionId: null,
      readyTime: '',
      isCartVisible: false,
      showUserInfo: false,
      selectedPayment: null,
      employeeID: 20, // Hardcoded for now
    }
  },
  methods: {
    startOrder() {
      this.isOnLaunchPage = false
    },
    selectMenuItem(menu) {
      this.selectedMenu = menu
    },
    toggleCart() {
      this.isCartVisible = !this.isCartVisible
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1)
      this.transactionCart.splice(index, 1)
    },
    clearCart() {
      this.cartItems = []
      this.transactionCart = []
    },
    proceedToCheckout() {
      this.isCheckoutVisible = true
    },
    cancelCheckout() {
      this.isCheckoutVisible = false
    },
    updatePaymentMethod(paymentMethod) {
      this.selectedPayment = paymentMethod
    },
    addToCart(item) {
      Array.isArray(item)
        ? this.cartItems.push(...item)
        : this.cartItems.push(item)
    },
    addToTransactionCart(entry) {
      console.log(entry)
      this.transactionCart.push(entry) // Add to transaction cart data
      console.log('Updated transactionCart:', this.transactionCart)
    },
    clearOrder() {
      this.cartItems = []
      this.transactionCart = []
    },
    resetCart() {
      this.clearOrder() // Reset the cart after finalizing the order
    },
    updateCartTotal(newTotal) {
      this.cartTotal = newTotal
    },
    hideContent() {
      this.isCheckoutVisible = true // Hide main content and cart, show checkout
    },
    goToUserInfo() {
      this.isCheckoutVisible = false
      this.showUserInfo = true
    },
    resetContent() {
      this.isCheckoutVisible = false // Go back to main content view
      this.isCartVisible = false // Hide cart when returning from checkout
    },
    // Calculate ready time (5-10 minutes from now)
    calculateReadyTime() {
      const now = new Date()
      const randomMinutes = Math.floor(Math.random() * 6) + 5 // Random value between 5 and 10
      now.setMinutes(now.getMinutes() + randomMinutes) // Add random minutes

      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    cancelUserInfo() {
      this.showUserInfo = false // Go back to CheckoutPage
    },
    resetOrder() {
      this.isOrderComplete = false // Reset order completion status
      this.cartItems = [] // Clear the cart items
      this.transactionCart = []
      this.transactionId = null // Reset transaction ID
      this.readyTime = '' // Reset ready time
      this.isCheckoutVisible = false // Hide the checkout page
      this.isCartVisible = false // Hide the cart panel
      this.isOnLaunchPage = true // Go back to the launch page
      this.showUserInfo = false // Hide the user info form
    },
    async completeOrder() {
      try {
        // Fetch the latest transaction ID
        const transactionIDResponse = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + 'transactions/latestID',
        )
        this.transactionId = transactionIDResponse.data.transactionID // Increment to get a new ID

        if (!this.selectedPayment) {
          throw new Error('Payment method is not selected.')
        }

        // Prepare the payload
        const transactionPayload = {
          transactionID: this.transactionId,
          employeeID: parseInt(this.employeeID, 10),
          total: parseFloat(this.cartTotal),
          date: new Date().toISOString(),
          paymentMethod: String(this.selectedPayment),
        }
        console.log('Transaction Payload:', transactionPayload)

        // Post the transaction
        // const transactionResponse = await axios.post(import.meta.env.VITE_API_ENDPOINT + 'transaction', transactionPayload);
        // console.log('Transaction response:', transactionResponse.data);
        const params = new URLSearchParams()
        params.append('transactionID', this.transactionId)
        params.append('employeeID', parseInt(this.employeeID, 10))
        params.append('total', parseFloat(this.cartTotal))
        params.append('date', new Date().toISOString())
        params.append('paymentMethod', String(this.selectedPayment))
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
        axios
          .post(
            import.meta.env.VITE_API_ENDPOINT + 'transaction',
            params,
            config,
          )
          .then(res => {
            let transactionCartItems = []
            // Insert transactionID into each transaction item in the cart
            const transactionItemsWithID = this.transactionCart.map(item => {
              // Prepend the transactionID before the itemID and food IDs
              const newItem = [this.transactionId, ...item]
              transactionCartItems.push(newItem)
            })
            console.log('transactionItems: ', transactionCartItems)
            for (let i = 0; i < transactionCartItems.length; i++) {
              const paramsTransactions = new URLSearchParams()
              paramsTransactions.append(
                'transactionID',
                parseInt(this.transactionId),
              )
              paramsTransactions.append(
                'itemid',
                parseInt(transactionCartItems[i][1]),
              )
              paramsTransactions.append(
                'food1',
                parseInt(transactionCartItems[i][2]),
              )
              paramsTransactions.append(
                'food2',
                parseInt(transactionCartItems[i][3]),
              )
              paramsTransactions.append(
                'food3',
                parseInt(transactionCartItems[i][4]),
              )
              paramsTransactions.append(
                'food4',
                parseInt(transactionCartItems[i][5]),
              )
              console.log(paramsTransactions)
              const configTransaction = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              }
              axios
                .post(
                  import.meta.env.VITE_API_ENDPOINT + 'transactionitems',
                  paramsTransactions,
                  configTransaction,
                )
                .then(res => {
                  this.readyTime = this.calculateReadyTime()

                  // Update the order state
                  this.isOrderComplete = true
                  this.showUserInfo = false
                })
                .catch(error =>
                  console.error(
                    'Error adding to transactionitems table',
                    error,
                  ),
                )
            }
          })
          .catch(error =>
            console.error('Error adding to transaction table', error),
          )

        // Post to transactionitems
        // const transactionItemsResponse = await axios.post(
        //   import.meta.env.VITE_API_ENDPOINT + 'transactionitems',
        //   transactionItemsWithID
        // );
        // console.log('Transaction item response:', transactionItemsResponse.data);

        // Generate the ready time
      } catch (error) {
        console.error('Error processing order:', error)
        alert('There was an error processing your order. Please try again.')
      }
    },
  },
}
</script>

<style scoped>
.cart-button {
  position: fixed;
  top: 30px;
  right: 45px;
  background-color: #e7e4d7;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 4px 3px #080808;
  border-radius: 75px;
  z-index: 1001;
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
