<template>
    <div class="main-content">
        <h2>{{ item }} Menu</h2>
        <component v-if="item === 'Appetizers'" :is="'Appetizer'" @addToCart="addToCart" />
        <component v-if="item === 'Bowl'" :is="'Bowl'" @addToCart="addToCart" />
        <component v-if="item === 'Plate'" :is="'Plate'" @addToCart="addToCart" />
        <component v-if="item === 'Bigger Plate'" :is="'BiggerPlate'" @addToCart="addToCart" />
        <component v-if="item === 'Drinks'" :is="'Drink'" @addToCart="addToCart" />
        <component v-if="item === 'A La Carte'" :is="'ALaCarte'" @addToCart="addToCart" />

        <button class="cart-button" @click="toggleCart">
            <img src="../assets/cart.png" alt="Cart Panel" class="cart-image" />
        </button>

        <div v-show="isCartVisible" class="panel">
            <Cart :cartItems="cartItems" @removeItem="removeFromCart" />
        </div>
    </div>
</template>

<script>
import Appetizer from './menu/Appetizers.vue';
import Bowl from './menu/Bowl.vue';
import Plate from './menu/Plate.vue';
import BiggerPlate from './menu/BiggerPlate.vue';
import Drink from './menu/Drinks.vue';
import ALaCarte from './menu/ALaCarte.vue';
import Cart from './Cart.vue';

export default {
    name: 'MainContent',
    props: {
        item: String
    },
    data() {
        return {
            isCartVisible: false,
            cartItems: []
        };
    },
    methods: {
        addToCart(item) {
            if (Array.isArray(item)) {
                this.cartItems.push(...item); // If item is an array (sides/entrees), spread it into the cartItems array
            } else {
                this.cartItems.push(item); // If it's a bowl/plate/bigger plate, just push the item
            }
        },
        removeFromCart(index) {
            this.cartItems.splice(index, 1);
        },
        toggleCart() {
            this.isCartVisible = !this.isCartVisible;
        }
    },
    components: {
        Appetizer,
        Bowl,
        Plate,
        BiggerPlate,
        Drink,
        ALaCarte,
        Cart
    }
};
</script>

<style scoped>
.main-content {
    position: fixed;
    top: 0;
    left: 450px;
    right: 0;
    bottom: 0;
    background-color: #9b150b;
    color: #e7e4d7;
    padding: 40px;
    overflow-y: auto;
}

.cart-button {
    position: fixed;
    top: 30px;
    right: 45px;
    background-color: #e7e4d7;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 3px #080808;
    border-radius: 75px;
    z-index: 1001;

}

.cart-button:hover {
    background-color: #d2ceb8;
}

.cart-image {
    width: 50px;
    height: auto;
}
</style>