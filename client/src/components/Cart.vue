<template>
    <div class="cart-panel" :style="{ width: cartWidth }">
        <span class="collapsebar" @click="toggleCart"></span>
        <span v-if="collapsed">
        </span>
        <span v-else>
            <h2 class="title">Shopping Cart</h2>
            <ul>
                <li v-for="(item, index) in cartItems" :key="index">
                    <span>{{ item.name }} - ${{ item.price }}</span>
                    <button @click="removeFromCart(index)">Remove</button>
                </li>
            </ul>
            <div class="total">
                Total: ${{ total }}
            </div>
        </span>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'Cart',
    props: {
        cartItems: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            collapsed: ref(false)
        };
    },
    computed: {
        cartWidth() {
            return this.collapsed ? '265px' : '450px';
        },
        total() {
            return this.cartItems.reduce((sum, item) => sum + item.price, 0);
        }
    },
    methods: {
        toggleCart() {
            this.collapsed = !this.collapsed;
        },
        removeFromCart(index) {
            this.$emit('removeItem', index);
        }
    }
};
</script>

<style scoped>
.cart-panel {
    background-color: #e7e4d7;
    width: 250px;
    height: 100vh;
    padding: 20px;
    position: fixed;
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 8px #080808;
    top: 0;
    right: 0;
    z-index: 1000;
    transition: width 0.3s ease;
}

.collapsebar {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 15px;
}

.title {
    margin-bottom: 15px;
    font-size: 24px;
    text-align: center;
    color: #080808;
}

ul {
    list-style-type: none;
    padding: 0;
    color: #080808;
}

li {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}

button {
    border: 2px solid #080808;
    border-radius: 30px;
    background-color: #e7e4d7;
    color: #080808;
    font-family: Arial, sans-serif;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 3px #080808;
}

button:hover {
    background-color: #d2ceb8;
}

.total {
    font-weight: bold;
    margin-top: 20px;
    color: #080808;
}
</style>