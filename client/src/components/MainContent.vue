<template>
    <div class="main-content">
        <h2>{{ item }} Menu</h2>
        <component v-if="item === 'Appetizers'" :is="'Appetizer'" @selectItem="selectItem" />
        <component v-if="item === 'Bowl'" :is="'Bowl'" @selectItem="selectItem" />
        <component v-if="item === 'Plate'" :is="'Plate'" @selectItem="selectItem" />
        <component v-if="item === 'Bigger Plate'" :is="'BiggerPlate'" @selectItem="selectItem" />
        <component v-if="item === 'Drinks'" :is="'Drink'" @selectItem="selectItem" />
        <component v-if="item === 'A La Carte'" :is="'ALaCarte'" @selectItem="selectItem" />
        <!-- <button class="toggle-button" @click="togglePanel">Toggle Panel</button> -->
       <!-- Image inside a button -->
       <button class="cart-button" @click="toggleCart">
            <img 
                src="../assets/cart.png" 
                alt="Cart Panel" 
                class="cart-image"
            />
        </button>
        <div v-show="isCartVisible" class="panel">
            <h3>Shopping Cart</h3>
            <!-- Add your panel content here -->
        </div>
    </div>
</template>

<script>
import Appetizer from './menu/Appetizers.vue'
import Bowl from './menu/Bowl.vue'
import Plate from './menu/Plate.vue'
import BiggerPlate from './menu/BiggerPlate.vue'
import Drink from './menu/Drinks.vue'
import ALaCarte from './menu/ALaCarte.vue';

export default {
    name: 'MainContent',
    props: {
        item: String,
    },
    data() {
        return {
            isCartVisible: false
        }
    },
    methods: {
        selectItem(item) {
            // Handle the selected item here
            console.log('Selected item:', item);
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
    },
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
    top: 30px; /* Adjust as needed */
    right: 45px; /* Adjust as needed */
    background-color: #e7e4d7; 
    border: none; /* Remove border */
    cursor: pointer; /* Change cursor on hover */
    transition: background-color 0.3s, box-shadow 0.3s; /* Transition effects */
    box-shadow: 0 4px 3px #080808;
    border-radius: 75px;
    z-index: 1001;
    
}

.cart-button:hover {
    background-color: #d2ceb8;
}

.cart-image {
    width: 50px; /* Adjust size */
    height: auto; /* Maintain aspect ratio */
}


.panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 40%;
    height: 100%;
    background-color: #000000e3;
    color: #e7e4d7;
    box-shadow: -2px 0 5px rgba(0,0,0,0.1);
    padding: 20px;
    overflow-y: auto;
    z-index: 999;
}
</style>