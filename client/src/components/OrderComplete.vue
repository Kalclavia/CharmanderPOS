<template>
    <div class="order-complete-page" v-if="isOrderComplete">
        <img src="@/assets/panda-logo.png" alt="Panda Logo" class="panda-logo" />
        <img src="@/assets/confirmation-check.gif" alt="Confirmation Check" class="confirmation-check" />
        <h2>Order Complete!</h2>
        <p>Transaction ID: <strong>{{ transactionId }}</strong></p>
        <p>Estimated Ready Time: <strong>{{ readyTime }}</strong></p>
        <!-- New Order Button -->
        <button class="new-order-button" @click="startNewOrder">New Order</button>
    </div>
</template>

<script>
export default {
    props: {
        transactionId: {
            type: String,
            required: true
        },
        readyTime: {
            type: String,
            required: true
        }
    },
    methods: {
        startNewOrder() {
            this.$emit('newOrder');
        },
    }
};
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
    font-size: 24px;
    color: #5cb85c;
    /* Green color to match confirmation */
}

p {
    font-size: 18px;
    margin: 5px 0;
}

.new-order-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
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