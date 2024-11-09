<template>
    <div class="cart-panel" :style="{ width: cartWidth }">
        <span class="collapsebar" @click="toggleCart"></span>
        <span v-if="collapsed">
        </span>
        <span v-else>
            <h2 class="title">Shopping Cart</h2>
            <div class="cart-items">
                <ul>
                    <li v-for="(item, index) in cartItems" :key="index">
                        <span>{{ item.name }} - ${{ item.price.toFixed(2) }}</span>
                        <button class="remove-btn" @click="removeFromCart(index)">×</button>
                    </li>
                </ul>
            </div>
            <div class="total">
                Total: ${{ total.toFixed(2) }}
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

.cart-items {
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 15px;
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
    align-items: center;
}

li:first-child {
    margin-top: 15px;
}

.remove-btn {
    background-color: #ff4136;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
}

.total {
    font-weight: bold;
    margin-top: 20px;
    color: #080808;
}
</style>