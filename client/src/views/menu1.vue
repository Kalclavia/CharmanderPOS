<template>
<div class="main-content">
  <div class="column">
    <img src="../assets/hotones.png" alt="Get the Hot Ones Blazing Bourbon Chicken - Limited Time Offer! Panel" class="ad-image"/>
  </div>
  <div class="column">
    <div class="banner">
      <h1>(1) CHOOSE A MEAL</h1>
    </div>


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
    async fetchPrices() {
            try {
                const items = ['Bowl', 'Plate', 'Bigger Plate', 'Medium Drink'];
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
      isOnLaunchPage: true,
      isCartVisible: false,
      isOrderComplete: false,
      cartItems: [],
      selectedItem: null,
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
