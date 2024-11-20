<template>
    <div class="main-content" v-if="!isCheckoutVisible">
        <h2>
            {{ item }} Menu
            <span v-if="prices[item] !== undefined" class="price">
                ({{ formatPrice(prices[item]) }})
            </span>
        </h2>
        <component v-if="item === 'Appetizers'" :is="'Appetizer'" @addToCart="$emit('addToCart', $event)" />
        <component v-if="item === 'Bowl'" :is="'Bowl'" @addToCart="$emit('addToCart', $event)" />
        <component v-if="item === 'Plate'" :is="'Plate'" @addToCart="$emit('addToCart', $event)" />
        <component v-if="item === 'Bigger Plate'" :is="'BiggerPlate'" @addToCart="$emit('addToCart', $event)" />
        <component v-if="item === 'Drinks'" :is="'Drink'" @addToCart="$emit('addToCart', $event)" />
        <component v-if="item === 'A La Carte'" :is="'ALaCarte'" @addToCart="$emit('addToCart', $event)" />
    </div>
</template>

<script>
import axios from 'axios';
import MenuBar from './MenuBar.vue';
import Appetizer from './menu/Appetizers.vue';
import Bowl from './menu/Bowl.vue';
import Plate from './menu/Plate.vue';
import BiggerPlate from './menu/BiggerPlate.vue';
import Drink from './menu/Drinks.vue';
import ALaCarte from './menu/ALaCarte.vue';

export default {
    name: 'MainContent',
    props: { item: String },
    data() {
        return {
            prices: {
                Bowl: null,
                Plate: null,
                BiggerPlate: null,
            },
        };
    },
    components: {
        MenuBar,
        Appetizer,
        Bowl,
        Plate,
        BiggerPlate,
        Drink,
        ALaCarte,
    },
    methods: {
        selectItem(item) {
            this.item = item;
        },
        async fetchPrices() {
            try {
                // Fetch prices for Bowl, Plate, and Bigger Plate
                const items = ['Bowl', 'Plate', 'Bigger Plate'];
                for (const item of items) {
                    const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `price/${encodeURIComponent(item)}`);
                    this.prices[item] = response.data.price; // Assign the price
                }
            } catch (error) {
                console.error('Error fetching prices:', error);
            }
        },
        formatPrice(price) {
            return price !== null ? `$${price.toFixed(2)}` : 'Loading...';
        },
    },
    mounted() {
        this.fetchPrices();
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
    z-index: 1;
}
.price {
  font-size: 0.9em;
  font-weight: normal;
  margin-left: 10px;
  color: #ffd700;
}
</style>