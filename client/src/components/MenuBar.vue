<template>
    <div class="menu-bar">
        <h2 class="menu-title">MENU</h2>
        <button @click="$emit('selectItem', 'Appetizers')">APPETIZERS</button>
        <button @click="$emit('selectItem', 'Bowl')">BOWL</button>
        <button @click="$emit('selectItem', 'Plate')">PLATE</button>
        <button @click="$emit('selectItem', 'Bigger Plate')">BIGGER PLATE</button>
        <button @click="$emit('selectItem', 'Drinks')">DRINKS</button>
        <button @click="$emit('selectItem', 'A La Carte')">A LA CARTE</button>
    </div>
</template>

<script>
export default {
    name: 'MenuBar',
};
</script>

<style scoped>
.menu-bar {
    background-color: #e7e4d7;
    width: 450px;
    height: 100vh;
    padding: 20px;
    position: fixed;
    display: flex;
    flex-direction: column; /* Align items vertically */
    box-shadow: 0 4px 8px #080808;
    top: 0;
    left: 0;
    z-index: 1000;
}

.menu-title {
    margin-bottom: 15px; /* Space between title and buttons */
    font-size: 24px;
    text-align: center;
    color: #080808;
}

button {
    border: 2px solid #080808;
    border-radius: 30px;
    background-color: #e7e4d7;
    color: #080808;
    font: Arial;
    padding: 15px;
    margin-bottom: 10px;
    cursor: pointer; /* Change cursor on hover */
    transition: background-color 0.3s, box-shadow 0.3s; /* Transition effects */
    box-shadow: 0 4px 3px #080808;
}

button:hover {
    background-color: #d2ceb8; /* Darker background on hover */
}
</style>