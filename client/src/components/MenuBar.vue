<template>
    <div class="menu-bar">
        <button @click="$emit('selectItem', 'Appetizers')">Appetizers</button>
        <button @click="$emit('selectItem', 'Bowl')">Bowl</button>
        <button @click="$emit('selectItem', 'Plate')">Plate</button>
        <button @click="$emit('selectItem', 'Bigger Plate')">Bigger Plate</button>
        <button @click="$emit('selectItem', 'Drinks')">Drinks</button>
        <button @click="$emit('selectItem', 'A La Carte')">A La Carte</button>
    </div>
</template>

<script>
export default {
    name: 'MenuBar',
};
</script>

<style scoped></style>