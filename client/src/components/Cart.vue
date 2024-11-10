<template>
    <div class="cart-panel" :style="{ width: cartWidth }">
        <span class="collapsebar" @click="toggleCart"></span>
        <span v-if="collapsed"></span>
        <span v-else>
            <!-- Change header text to 'Order Summary' if isCheckout is true -->
            <h2 class="title">{{ isCheckout ? 'Order Summary' : 'Shopping Cart' }}</h2> 

            <div class="cart-items">
                <ul>
                    <li v-for="(item, index) in cartItems" :key="index">
                        <!-- Conditionally hide remove button -->
                        <button v-if="!isCheckout" class="remove-btn" @click="removeFromCart(index)">×</button>
                        <div class="item-name">{{ item.name }}</div>
                        <div class="item-price">${{ item.price.toFixed(2) }}</div>
                    </li>
                </ul>
            </div>

            <div class="total">Total: ${{ total.toFixed(2) }}</div>
        </span>

        <!-- Hide these buttons during checkout -->
        <button v-if="!isCheckout" class="clear-order-btn" @click="clearOrder">Clear Order</button>
        <button v-if="!isCheckout" class="place-order-btn" @click="showCheckout">Place Order</button>

        <!-- Conditional rendering for CheckoutPage -->
        <CheckoutPage v-if="isCheckoutPageVisible" :cartItems="cartItems" @confirmOrder="finalizeOrder" @cancelOrder="isCheckoutPageVisible = false" />
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import CheckoutPage from './CheckoutPage.vue';

export default {
    name: 'Cart',
    components: { CheckoutPage },
    props: {
        cartItems: { type: Array, default: () => [] },
        isCheckout: { type: Boolean, default: false } // Receive isCheckout prop
    },
    setup(props, { emit }) {
        const collapsed = ref(false);
        const isCheckoutPageVisible = ref(false);

        const cartWidth = computed(() => (collapsed.value ? '265px' : '450px'));
        const total = computed(() => props.cartItems.reduce((sum, item) => sum + item.price, 0));

        const toggleCart = () => { collapsed.value = !collapsed.value };
        const removeFromCart = (index) => { emit('removeItem', index) };
        const clearOrder = () => { emit('clearOrder') };
        const showCheckout = () => {
            isCheckoutPageVisible.value = true;
            emit('hideMainContent'); // Notify the parent to hide MainContent and Cart
        };
        const finalizeOrder = () => { emit('finalizeOrder'); isCheckoutPageVisible.value = false };

        return {
            collapsed, 
            cartWidth, 
            total, 
            toggleCart, 
            removeFromCart, 
            clearOrder, 
            showCheckout, 
            isCheckoutPageVisible, 
            finalizeOrder
        };
    }
};
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
}

.collapsebar {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 15px;
}

.title {
    margin-bottom: 15px;
    font-size: 24px;
    text-align: center;
    color: #080808;
}

.cart-items {
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 15px;
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
    margin-top: 15px;
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
    font-size: 16px;
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
    color: #080808;
}

/* Clear Order Button */
.clear-order-btn {
    background-color: #d53f3f;
    color: rgb(22, 9, 9);
    border: 2px solid #080808;
    border-radius: 10px;
    box-shadow: 0 2px 2px #080808;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    position: fixed;
    bottom: 20px;
    right: 320px;
    text-align: center;
    font-size: medium;
}

.clear-order-btn:hover {
    background-color: #9b150b;
}

.place-order-btn {
    background-color: #4CAF50;
    color: white;
    border: 2px solid #080808;
    border-radius: 10px;
    box-shadow: 0 2px 2px #080808;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    position: fixed;
    bottom: 20px;
    right: 20px;
    text-align: center;
    font-size: medium;
}

.place-order-btn:hover {
    background-color: #45a049;
}
</style>