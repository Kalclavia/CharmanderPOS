<template>
  <div class="main-content">
    <div class = "column">
      <img src="../assets/applepiead.png" alt="Get the Hot Ones Blazing Bourbon Chicken - Limited Time Offer! Panel" class="ad-image"/>
    </div>
    <div class = "column">
      <div class="banner">
        <h1>(4) APPETIZERS</h1>
      </div>

      <div class="entry">
      <div class="item-column">
        <h2>SMALL</h2>
      </div>    
      <div class="price-column">
        <span v-if="prices['Appetizer'] !== undefined" class="price">
            {{ formatPrice(prices['Appetizer']) }}
        </span>
      </div>
    </div>

      <MenuBoard :item="'Appetizers'" />

      <div class="banner">
        <h1>(5) DRINKS</h1>
      </div>
      <div class="entry">
        <div class="item-column">
          <h2>SMALL</h2>
        </div>    
        <div class="price-column">
        <span v-if="prices['Small Drink'] !== undefined" class="price">
          {{ formatPrice(prices['Small Drink']) }}
        </span>
        </div>
    </div>
    <div class="entry">
      <div class="item-column">
        <h2>MEDIUM</h2>
      </div>    
      <div class="price-column">
        <span v-if="prices['Medium Drink'] !== undefined" class="price">
          {{ formatPrice(prices['Medium Drink']) }}
        </span>
      </div>
    </div>
    <div class="entry">
      <div class="item-column">
        <h2>LARGE</h2>
      </div>    
      <div class="price-column">
        <span v-if="prices['Large Drink'] !== undefined" class="price">
          {{ formatPrice(prices['Large Drink']) }}
        </span>
      </div>
    </div>

      <MenuBoard :item="'Drinks'" />
    </div>   
  </div> 
</template>

<script>
import MenuBoard from '../components/Menu-Board.vue'
import axios from 'axios';

export default {
  name: 'Menu1',
  components: {
    MenuBoard,
  },
  methods: {
    async fetchPrices() {
            try {
                const items = ['Appetizer', 'Small Drink', 'Medium Drink','Large Drink'];
                for (const item of items) {
                    const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `price/${encodeURIComponent(item)}`);
                    this.prices[item] = response.data.price;
                }
            } catch (error) {
                console.error('Error fetching prices:', error);
            }
        },
    formatPrice(price) {
        return price !== null ? `$${price.toFixed(2)}` : 'Loading...';
    },
  },
  
  data() {
    return {
      prices: {
            },
    }
  },

  mounted() {
    this.fetchPrices();
  }
}
</script>

<style scoped>

.main-content {
  position: fixed;
  top: 0;
  left: 0px;
  right: 0;
  bottom: 0;
  background-color: #000000;
  color: #e7e4d7;
  padding: 0px;
  overflow-y: auto;
  display: flex;
}

.column {
  flex: 1;
}

.item-column {
  padding-left: 20px;
  flex: 1;
}

.price-column {
  margin: auto;
  width: 50%;
  padding: 10px;
}

.entry {
  display: flex;
}


.fill {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden
}
.column img {
  width: 100%; /* Makes the image fill the column width */
  height: 100%; /* Maintains the aspect ratio */
  object-fit: cover; /* Ensures the image covers the container while maintaining aspect ratio */
}

.banner {
  background-color: #9b150b;
  padding: 20px;
}

.item {
  padding-left: 20px;
  padding: 10px;
}

</style>
