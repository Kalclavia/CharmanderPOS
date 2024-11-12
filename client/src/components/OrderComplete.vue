<template>
    <div class="order-complete-page">
        <img src="@/assets/panda-logo.png" alt="Panda Logo" class="panda-logo" />
        <img src="@/assets/confirmation-check.gif" alt="Confirmation Check" class="confirmation-check" />        <h2>Order Complete!</h2>
        <p>Transaction ID: <strong>{{ transactionId }}</strong></p>
        <p>Estimated Ready Time: <strong>{{ readyTime }}</strong></p>
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
    background-color: #9b150b;
}

.panda-logo {
    width: 260px;
}

.confirmation-check {
    width: 260px;    
}

h2 {
    font-size: 24px;
    color: #5cb85c; /* Green color to match confirmation */
}

p {
    font-size: 18px;
    margin: 5px 0;
}
</style>