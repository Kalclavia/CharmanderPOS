<template>
  <div class="appetizer">
    <h2>Appetizers</h2>
    <div class="grid">
      <button v-for="appetizer in appetizers" :key="appetizer" @click="toggleAppetizers(appetizer)"
        :class="{ selected: selectedAppetizers.includes(appetizer) }">
        <img v-if="getAppetizerImage(appetizer)" :src="getAppetizerImage(appetizer)" :alt="getAppetizerName(appetizer)"
          class="appetizer-image" @error="handleImageError" />
        <span>{{ getAppetizerName(appetizer) }}</span>
        <span v-if="selectedAppetizers.includes(appetizer)" class="checkmark">✓</span>
      </button>
    </div>
    <!-- Add to Cart Button -->
    <button class="add-to-cart" @click="addToCart" :disabled="!canAddToCart">
      Add to Cart
    </button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Appetizer',
  data() {
    return {
      appetizers: [],
      selectedAppetizers: []
    }
  },
  computed: {
    canAddToCart() {
      return this.selectedAppetizers.length > 0;
    }
  },
  methods: {
    async fetchMenuItems() {
      try {
        const appetizerResponse = await axios.get(
          'http://localhost:3000/menu/Appetizer',
        )
        this.appetizers = appetizerResponse.data
        console.log('Fetched appetizers:', this.appetizers)
      } catch (error) {
        console.error('Error fetching menu items:', error)
      }
    },
    toggleAppetizers(appetizer) {
      if (this.selectedAppetizers.includes(appetizer)) {
        this.selectedAppetizers = this.selectedAppetizers.filter(selected => selected !== appetizer);
      } else {
        this.selectedAppetizers.push(appetizer);
      }
    },
    addToCart() {
      if (this.canAddToCart) {
        // Flatten itemsToAdd array with selected sides and entrees
        const itemsToAdd = [];

        // Add each selected side
        this.selectedAppetizers.forEach(appetizer => {
          itemsToAdd.push({
            name: `Appetizer: ${this.getAppetizerName(appetizer)}`,
            price: 4.50
          });
        });

        // Emit the itemsToAdd array to the cart
        this.$emit('addToCart', itemsToAdd);

        // Clear selections after adding to cart
        this.selectedAppetizers = [];
      }
    },
    getAppetizerName(appetizer) {
      if (typeof appetizer === 'string') {
        return appetizer
      } else if (appetizer && appetizer.name) {
        return appetizer.name
      }
      return 'Unknown Appetizer'
    },
    getAppetizerImage(appetizer) {
      let name = this.getAppetizerName(appetizer)
      if (!name) return null
      const fileName = `${name.toLowerCase().replace(/\s+/g, '')}.png`
      const imagePath = `/src/assets/${fileName}`
      console.log('Image path:', imagePath)
      return imagePath
    },
    handleImageError(event) {
      console.error('Image failed to load:', event.target.src)
      event.target.style.display = 'none'
    }
  },
  mounted() {
    this.fetchMenuItems()
  },
}
</script>

<style scoped>
/* Your existing styles here */
</style>


<style scoped>
.appetizer {
  padding: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

button {
  border: 2px solid black;
    border-radius: 10px;
    background-color: #e7e4d7;
    color: black;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    /* min-height: 150px; */
    position: relative;
}

button:hover {
  background-color: #d2ceb8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.selected {
    background-color: #d2ceb8;
    box-shadow: 0 0 0 2px #080808;
}

.checkmark {
    position: absolute;
    top: 5px;
    right: 5px;
    color: green;
    font-size: 20px;
    font-weight: bold;
}

.appetizer-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 5px;
}

.add-to-cart-container {
    max-height: min-content;
    position: fixed;
    box-shadow: 0 4px 3px #080808;
}


.add-to-cart {
    padding: 15px 15px;
    font-size: 15px;
    background-color: #4CAF50;
    color: rgb(0, 0, 0);
    border: none;
    border-radius: 10px;
    position: fixed;
    top: 45px;
    right: 145px;
    z-index: 1000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, box-shadow 0.3s;
    height: 30px;
    box-shadow: 0 4px 3px #080808;
}

.add-to-cart:disabled {
    background-color: #e7e4d7;
    box-shadow: 0 4px 3px #080808;
    cursor: not-allowed;
}
</style>
