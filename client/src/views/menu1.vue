<!-- Template Section -->
<template>
<div class="main-content">
  
  <!-- First Column: Hot Ones Ad (Image) -->
  <div class="column">
    <img src="../assets/hotones.png" alt="Get the Hot Ones Blazing Bourbon Chicken - Limited Time Offer! Panel" class="ad-image"/>
  </div>

  <!-- Second Column: Menu ITem Info -->
  <div class="column">
    <div class="banner">
      <h1>(1) CHOOSE A MEAL</h1>
    </div>

    <!-- Bowl and logic to load price -->
    <div class="entry">
      <div class="item-column">
        <h2>BOWL</h2>
        <h3>1 Entree + Side(s)</h3>
      </div>    
      <div class="price-column">
        <span v-if="prices['Bowl'] !== undefined" class="price">
            {{ formatPrice(prices['Bowl']) }}
        </span>
      </div>
    </div>

    <!-- Plate and logic to load price -->
    <div class="entry">
      <div class="item-column">
        <h2>PLATE</h2>
        <h3>2 Entree + Side(s)</h3>
      </div>    
      <div class="price-column">
        <span v-if="prices['Plate'] !== undefined" class="price">
            {{ formatPrice(prices['Plate']) }}
        </span>
      </div>
    </div>

    <!-- Bigger plate and logic to load price -->
    <div class="entry">
      <div class="item-column">
        <h2>BIGGER PLATE</h2>
        <h3>3 Entree + Side(s)</h3>
      </div>    
      <div class="price-column">
        <span v-if="prices['Bigger Plate'] !== undefined" class="price">
            {{ formatPrice(prices['Bigger Plate']) }}
        </span>
      </div>
    </div>

    <!-- Panda Bundles: Same as above, but adds price of menu items + medium drink -->
    <div>
      <div class="banner">
        <h1>PANDA BUNDLES <i>&nbsp;&nbsp;&nbsp;&nbsp;Add a medium drink</i></h1>
      </div>

      <div class="entry">
      <div class="item-column">
        <h2>BOWL + DRINK</h2>
      </div>    
      <div class="price-column">
        <span v-if="prices['Bowl'] !== undefined" class="price">
            {{ formatPrice(prices['Bowl']+prices['Medium Drink']) }}
        </span>
      </div>
    </div>


    <div class="entry">
      <div class="item-column">
        <h2>PLATE + DRINK</h2>
      </div>    
      <div class="price-column">
        <span v-if="prices['Plate'] !== undefined" class="price">
            {{ formatPrice(prices['Plate']+prices['Medium Drink']) }}
        </span>
      </div>
    </div>

    <div class="entry">
      <div class="item-column">
        <h2>BIGGER PLATE + DRINK</h2>
      </div>    
      <div class="price-column">
        <span v-if="prices['Bigger Plate'] !== undefined" class="price">
            {{ formatPrice(prices['Bigger Plate']+prices['Medium Drink']) }}
        </span>
      </div>
    </div>

    </div>   
  </div>
</div>
</template>

<script>
import axios from 'axios';
import BiggerPlate from '@/components/menu/BiggerPlate.vue';
import MenuBoard from '../components/Menu-Board.vue'

export default {
  name: 'Menu1',
  components: {
    MenuBoard,
  },

  methods: {
    // Fetches prices for all menu items from the API
    async fetchPrices() {
      try {
        // List of items to fetch prices for
        const items = ['Bowl', 'Plate', 'Bigger Plate', 'Medium Drink'];
        // Iterate through items and fetch their prices
        for (const item of items) {
          const response = await axios.get(
            import.meta.env.VITE_API_ENDPOINT + `price/${encodeURIComponent(item)}`
          );
          this.prices[item] = response.data.price;
        }
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    },

    // Formats price numbers to currency string with 2 decimal places
    formatPrice(price) {
      return price !== null ? `$${price.toFixed(2)}` : 'Loading...';
    },
  },
  
  // Initial data state
  data() {
    return {
      prices: {}, // Stores prices fetched from API
    }
  },

  // Fetch prices when component is mounted
  mounted() {
    this.fetchPrices();
  }
}
</script>

<style scoped>
/* Main container styling */
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

/* Two-column layout styling */
.column {
  flex: 1;
}

/* Menu entry styling */
.entry {
  display: flex;
  padding: 15px;
}

/* Item details column */
.item-column {
  padding-left: 20px;
  flex: 1;
  font-size: 1em;
}

/* Price column styling */
.price-column {
  margin: auto;
  width: 50%;
  font-size: 1.5em;
}

/* Image container styling */
.fill {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* Promotional image styling */
.column img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Section header banner styling */
.banner {
  background-color: #9b150b;
  padding: 20px;
}

/* Individual item styling */
.item {
  padding-left: 20px;
  padding: 10px;
}
</style>