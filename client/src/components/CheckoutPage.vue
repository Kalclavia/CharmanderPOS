<template>
    <div class="checkout-page" v-if="!orderConfirmed">
        <h2>Choose a payment method</h2>
        <div class="payment-options">
            <!-- Payment option buttons -->
            <div class="payment-button" 
    :class="{ selected: selectedPayment === 'Cash' }" 
    @click="togglePayment('Cash')" 
    @keydown.enter="togglePayment('Cash')" 
    @keydown.space="togglePayment('Cash')" 
    tabindex="0">
    <img src="@/assets/cash-icon.png" alt="Cash" />
    <span>Cash</span>
    <span v-if="selectedPayment === 'Cash'" class="checkmark">✓</span>
</div>
<div class="payment-button" 
    :class="{ selected: selectedPayment === 'Card' }" 
    @click="togglePayment('Card')" 
    @keydown.enter="togglePayment('Card')" 
    @keydown.space="togglePayment('Card')" 
    tabindex="0">
    <img src="@/assets/card-icon.png" alt="Card" />
    <span>Card</span>
    <span v-if="selectedPayment === 'Card'" class="checkmark">✓</span>
</div>
<div class="payment-button" 
    :class="{ selected: selectedPayment === 'DiningDollars' }" 
    @click="togglePayment('DiningDollars')" 
    @keydown.enter="togglePayment('DiningDollars')" 
    @keydown.space="togglePayment('DiningDollars')" 
    tabindex="0">
    <img src="@/assets/dining-dollars-icon.png" alt="Dining Dollars" />
    <span>Dining Dollars</span>
    <span v-if="selectedPayment === 'DiningDollars'" class="checkmark">✓</span>
</div>
        </div>

        <!-- Bottom buttons for cancel and place order -->
        <div class="bottom-buttons">
            <button @click="cancelOrder" class="cancel-button">Cancel</button>
            <button @click="placeOrder" class="place-order-button">Place Order</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedPayment: null,
            orderConfirmed: false,
            orderDetails: {
                transactionId: '',
                readyTime: ''
            }
        };
    },
    methods: {
        togglePayment(paymentType) {
            // Toggle selection
            this.selectedPayment = this.selectedPayment === paymentType ? null : paymentType;
            this.$emit('updatePayment', this.selectedPayment); // Emit selected payment to parent
        },
        placeOrder() {
            if (!this.selectedPayment) {
                alert('Please select a payment method.');
                return;
            }
            this.$emit('confirmOrder');
        },
        cancelOrder() {
            this.$emit('cancelOrder'); // Emit event to cancel
        },
    },
};
</script>

<style scoped>
.checkout-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    position: fixed;
    top: 0;
    left: 450px;
    right: 0;
    bottom: 0;
    color: #e7e4d7;
    overflow-y: auto;
    background-color: #9b150b;
}

h2 {
    font-size: 1.5em;
    margin-bottom: 20px;
}

.payment-options {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 40px;
    background-color: transparent;
}

.payment-button {
    width: 250px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #e7e4d7;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    text-align: center;
    position: relative;
}

.payment-button img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
}

.payment-button span {
    font-size: 1em;
    font-weight: bold;
    color: #333;
}

.payment-button:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.selected {
    background-color: #c3e6cb;
    box-shadow: 0 0 0 3px green;
}

.checkmark {
    position: absolute;
    top: 10px;
    right: 10px;
    color: green;
    font-size: 1.5em;
    font-weight: bold;
}

.bottom-buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 20px;
    margin-top: auto;
}

.cancel-button,
.place-order-button {
    padding: 10px 20px;
    font-size: 1em;
    font-weight: bold;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.cancel-button {
    background-color: #d9534f;
    /* Red color */
}

.place-order-button {
    background-color: #5cb85c;
    /* Green color */
}

.cancel-button:hover {
    background-color: #c9302c;
}

.place-order-button:hover {
    background-color: #4cae4c;
}
</style>