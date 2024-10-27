<template>
    <div class="checkout-page">
        <h2>Payment Options</h2>
        <button @click="selectPayment('Cash')">Cash</button>
        <button @click="selectPayment('Card')">Card</button>
        <button @click="selectPayment('Dining Dollars')">Dining Dollars</button>
        <button @click="placeOrder">Place Order</button>
        <button @click="cancelOrder" class="cancel-button">Cancel</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedPayment: null,
        };
    },
    methods: {
        selectPayment(paymentType) {
            this.selectedPayment = paymentType;
        },
        placeOrder() {
            if (!this.selectedPayment) {
                alert('Please select a payment method.');
                return;
            }
            this.$emit('placeOrder', this.selectedPayment);
            this.$router.push('/order-complete');
        },
        cancelOrder() {
            this.$router.push('/home');
        },
    },
};
</script>