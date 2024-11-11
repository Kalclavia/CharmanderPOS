<template>
  <div class="appetizer">
    <h2>Appetizers</h2>
    <div class="grid">
      <button v-for="appetizer in appetizers" :key="appetizer" @click="toggleAppetizers(appetizer)"
        :class="{ selected: isSelected(appetizer) }">
        <img v-if="getAppetizerImage(appetizer)" :src="getAppetizerImage(appetizer)" :alt="getAppetizerName(appetizer)" class="appetizer-image"
          @error="handleImageError" />
        <span>{{ getAppetizerName(appetizer) }}</span>
        <span v-if="isSelected(appetizer)" class="checkmark">✓</span>
      </button>
    </div>
    <!-- Size Selection Modal -->
    <div v-if="showSizeModal" class="size-modal">
      <h3 class="modal-title">Select Size for {{ getAppetizerName(currentItem) }}</h3>
      <div>
        <button v-for="size in getSizeOptions(currentItem)" :key="size.name" @click="selectSize(size)">
          {{ size.name }} - ${{ size.price.toFixed(2) }}
        </button>
      </div>
      <!-- Red X Button -->
      <button @click="cancelSizeSelection" class="close-button">✖</button>
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
      selectedAppetizers: [],
      showSizeModal: false,
      currentItem: null,
      sizeOptions: {
        applePieRoll: [
          { name: 'Small', price: 2.00 },
          { name: 'Medium', price: 6.20 },
          { name: 'Large', price: 8.00 }
        ],
        creamCheeseRangoon: [
          { name: 'Small', price: 2.00 },
          { name: 'Large', price: 8.00 }
        ],
        default: [
          { name: 'Small', price: 2.00 },
          { name: 'Large', price: 11.20 }
        ]
      }
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
        const response = await axios.get('http://localhost:3000/menu/Appetizer');
        this.appetizers = response.data;
        console.log(this.appetizers);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    },
    toggleAppetizers(appetizer) {
      this.currentItem = appetizer;
      this.showSizeModal = true;
    },
    getSizeOptions(item) {
      const itemName = this.getAppetizerName(item).toLowerCase();
      if (itemName === 'apple pie roll') {
        return this.sizeOptions.applePieRoll;
      } else if (itemName === 'cream cheese rangoon') {
        return this.sizeOptions.creamCheeseRangoon;
      } else {
        return this.sizeOptions.default;
      }
    },
    isSelected(appetizer) {
      return this.selectedAppetizers.some(selected => 
        selected.name.startsWith(`Appetizer: ${this.getAppetizerName(appetizer)}`)
      );
    },
    selectSize(size) {
      const itemToAdd = {
        name: `Appetizer: ${this.getAppetizerName(this.currentItem)} (${size.name})`,
        price: size.price
      };
      // Remove any existing selection for this appetizer
      this.selectedAppetizers = this.selectedAppetizers.filter(item => 
        !item.name.startsWith(`Appetizer: ${this.getAppetizerName(this.currentItem)}`)
      );
      this.selectedAppetizers.push(itemToAdd);
      this.showSizeModal = false;
      this.currentItem = null;
    },
    cancelSizeSelection() {
      this.showSizeModal = false;
      this.currentItem = null;
    },
    addToCart() {
      if (this.canAddToCart) {
        const itemsToAdd = [...this.selectedAppetizers];
        this.$emit('addToCart', itemsToAdd);
        this.selectedAppetizers = [];
      }
    },
    getAppetizerName(appetizer) {
      if (typeof appetizer === 'string') {
        return appetizer
      }
      else if (appetizer && appetizer.name) {
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

.size-modal {
    position: fixed;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    z-index: 1001;
    color:#080808;
}

.size-modal button {
    margin: 5px;
    padding: 10px;
}

.close-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    color: red;
    font-size: 24px;
    cursor: pointer;
}

.close-button:hover {
    color: darkred;
    background-color: transparent !important;
    box-shadow: none !important;
}
</style>