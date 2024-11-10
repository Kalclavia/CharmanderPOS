<template>
    <div class="main-content" v-if="!isCheckoutVisible">
        <!-- Replace MenuBar with Cart as an order summary during checkout -->
        <MenuBar v-if="!isCheckoutVisible" @selectItem="selectItem" />
        <Cart v-else :cartItems="cartItems" @removeItem="removeFromCart" @clearOrder="clearOrder"
            @finalizeOrder="resetCart" class="order-summary" :isCheckout="isCheckoutVisible" />

        <h2>{{ item }} Menu</h2>
        <component v-if="item === 'Appetizers'" :is="'Appetizer'" @addToCart="addToCart" />
        <component v-if="item === 'Bowl'" :is="'Bowl'" @addToCart="addToCart" />
        <component v-if="item === 'Plate'" :is="'Plate'" @addToCart="addToCart" />
        <component v-if="item === 'Bigger Plate'" :is="'BiggerPlate'" @addToCart="addToCart" />
        <component v-if="item === 'Drinks'" :is="'Drink'" @addToCart="addToCart" />
        <component v-if="item === 'A La Carte'" :is="'ALaCarte'" @addToCart="addToCart" />

        <button class="cart-button" @click="toggleCart" :class="{ 'cart-button-open': isCartVisible }">
            <img src="../assets/cart.png" alt="Cart Panel" class="cart-image" />
            <span v-if="cartItems.length > 0" class="cart-count">{{ cartItems.length }}</span>
        </button>

        <div v-show="isCartVisible" class="panel">
            <Cart :cartItems="cartItems" @removeItem="removeFromCart" @clearOrder="clearOrder"
                @finalizeOrder="resetCart" @hideMainContent="hideContent" :isCheckout="isCheckoutVisible" />
        </div>
    </div>

    <!-- Checkout page with order summary -->
    <div v-if="isCheckoutVisible">
        <CheckoutPage :cartItems="cartItems" @confirmOrder="finalizeOrder" @cancelOrder="resetContent" />
        <Cart v-if="isCheckoutVisible" :cartItems="cartItems" class="order-summary" :isCheckout="isCheckoutVisible" />
    </div>
</template>

<script>
import MenuBar from './MenuBar.vue';
import Appetizer from './menu/Appetizers.vue';
import Bowl from './menu/Bowl.vue';
import Plate from './menu/Plate.vue';
import BiggerPlate from './menu/BiggerPlate.vue';
import Drink from './menu/Drinks.vue';
import ALaCarte from './menu/ALaCarte.vue';
import Cart from './Cart.vue';
import CheckoutPage from './CheckoutPage.vue';

export default {
    name: 'MainContent',
    props: { item: String },
    data() {
        return {
            isCartVisible: false,
            cartItems: [],
            isCheckoutVisible: false, // State to manage Checkout visibility
        };
    },
    methods: {
        addToCart(item) {
            Array.isArray(item) ? this.cartItems.push(...item) : this.cartItems.push(item);
        },
        removeFromCart(index) {
            this.cartItems.splice(index, 1);
        },
        toggleCart() {
            this.isCartVisible = !this.isCartVisible;
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
        resetContent() {
            this.isCheckoutVisible = false; // Go back to main content view
            this.isCartVisible = false; // Hide cart when returning from checkout
        },
        selectItem(item) {
            this.item = item;
        }
    },
    components: {
        MenuBar,
        Appetizer,
        Bowl,
        Plate,
        BiggerPlate,
        Drink,
        ALaCarte,
        Cart,
        CheckoutPage
    }
};
</script>

<style scoped>
.main-content {
    position: fixed;
    top: 0;
    left: 450px;
    right: 0;
    bottom: 0;
    background-color: #9b150b;
    color: #e7e4d7;
    padding: 40px;
    overflow-y: auto;
}

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
    /* Keep the hover color when the cart is open */
    box-shadow: none;
    /* Remove shadow when the cart is open */
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
</style>
