<template>
    <div class="cart">
        <h2>Order Summary</h2>
        <div class="cart-items">
            <div v-for="item in cartItems" :key="item.name" class="cart-item">
                <p>{{ item.name }}</p>
                <p>\${{ item.price.toFixed(2) }}</p>
                <button @click="removeFromCart(item)">X</button>
            </div>
        </div>
        <p>Total: \${{ total.toFixed(2) }}</p>
        <button @click="checkout">Checkout</button>
    </div>
</template>

<script>
export default {
    props: ['cartItems'],
    computed: {
        total() {
            return this.cartItems.reduce((sum, item) => sum + item.price, 0);
        },
    },
    methods: {
        removeFromCart(item) {
            this.$emit('removeFromCart', item);
        },
        checkout() {
            this.$router.push('/checkout');
        },
    },
};
</script>