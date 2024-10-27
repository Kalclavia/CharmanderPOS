<template>
    <div class="home-page">
        <div class="menu-frame">
            <button v-for="item in menuItems" :key="item" @click="selectMenu(item)">{{ item }}</button>
        </div>
        <div class="main-frame">
            <component :is="currentMenu"></component>
        </div>
        <button @click="openCart">🛒</button>
    </div>
</template>

<script>
// import Cart from './components/Cart.vue';
export default {
    data() {
        return {
            menuItems: ['Appetizers', 'Bowl', 'Plate', 'Bigger Plate', 'Drinks', 'A La Carte'],
            currentMenu: null,
        };
    },
    methods: {
        selectMenu(menu) {
            this.currentMenu = menu.replace(/\s/g, '') + 'Menu';
        },
        openCart() {
            this.$router.push('/cart');
        },
    },
};
</script>