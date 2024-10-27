<template>
    <div class="launch-page">
        <img src="@/assets/panda-logo.png" alt="Panda Express Logo" class="logo" />
        <button @click="$emit('startOrder')" class="tap-to-order">Tap to Order</button>
    </div>
</template>

<script>
export default {
    methods: {
        startOrder() {
            this.$router.push('/home');
        },
    },
};
</script>

<style scoped>
.launch-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #9b150b;
    color: white;
}

.logo {
    width: 50vw;
    height: auto;
    max-width: 300px;
    margin-bottom: 20px;
}

.tap-to-order {
    margin-top: 20px;
    padding: 12px 24px;
    font-size: 18px;
    background-color: #e7e4d7;
    color: #080808;
    border: 4px #080808;
    border-radius: 20px;
    box-shadow: 0 4px 8px #080808;
    cursor: pointer;
}
</style>