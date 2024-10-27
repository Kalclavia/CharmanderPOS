<template>
    <div class="order-complete">
        <img src="@/assets/panda-logo.png" alt="Panda Express Logo" />
        <h2>Order Complete</h2>
        <p>Thank you for your order!</p>
        <button @click="backToHome">Back to Home</button>
    </div>
</template>

<script>
export default {
    methods: {
        backToHome() {
            this.$router.push('/home');
        },
    },
};
</script>