<template>
  <div class="drink">
    <h2>Drinks</h2>
    <div class="grid">
      <button v-for="drink in drinks" :key="drink" @click="toggleDrinks(drink)"
        :class="{ selected: isSelected(drink) }">
        <img v-if="getDrinkImage(drink)" :src="getDrinkImage(drink)" :alt="getDrinkName(drink)" class="drink-image"
          @error="handleImageError" />
        <span>{{ getDrinkName(drink) }}</span>
        <span v-if="isSelected(drink)" class="checkmark">✓</span>
      </button>
    </div>
    <!-- Size Selection Modal -->
    <div v-if="showSizeModal" class="size-modal">
      <h3 class="modal-title">
        Select Size for {{ getDrinkName(currentItem) }}
      </h3>
      <div>
        <button v-for="size in sizeOptions.drink" :key="size.name" @click="selectSize(size)">
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
import axios from 'axios' // Make sure to install axios if you haven't already

export default {
  name: 'Drink',
  data() {
    return {
      drinks: [],
      selectedDrinks: [],
      showSizeModal: false,
      currentItem: null,
      currentItemType: null,
      sizeOptions: {
        drink: [
          { name: 'Small', price: 2.1 },
          { name: 'Medium', price: 2.3 },
          { name: 'Large', price: 2.5 },
        ],
      },
    }
  },
  computed: {
    canAddToCart() {
      return this.selectedDrinks.length > 0
    },
  },
  methods: {
    async fetchMenuItems() {
      try {
        const drinkResponse = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + 'menu/Drink',
        )
        this.drinks = drinkResponse.data
        console.log(this.drinks)
      } catch (error) {
        console.error('Error fetching menu items:', error)
      }
    },
    toggleDrinks(drink) {
      // if (this.selectedDrinks.includes(drink)) {
      //   this.selectedDrinks = this.selectedDrinks.filter(selected => selected !== drink);
      // } else {
      //   this.selectedDrinks.push(drink);
      // }
      if (
        this.getDrinkName(drink).toLowerCase() === 'aquafina' ||
        this.getDrinkName(drink).toLowerCase() === 'gatorade lemon lime'
      ) {
        // For Aquafina and Gatorade, add directly to selectedDrinks without showing size modal
        const itemToAdd = {
          name: `Drink: ${this.getDrinkName(drink)}`,
          price:
            this.getDrinkName(drink).toLowerCase() === 'aquafina' ? 2.3 : 2.7, // Aquafina: $1.50, Gatorade: $2.00
        }
        this.selectedDrinks.push(itemToAdd)
      } else {
        // For other drinks, show the size modal
        this.currentItem = drink
        this.currentItemType = 'drink'
        this.showSizeModal = true
      }
    },

    isSelected(drink) {
      const drinkName = this.getDrinkName(drink)
      return this.selectedDrinks.some(
        selectedDrink =>
          selectedDrink.name === `Drink: ${drinkName}` ||
          selectedDrink.name.startsWith(`Drink: ${drinkName} (`),
      )
    },

    selectSize(size) {
      const itemToAdd = {
        name: `Drink: ${this.getDrinkName(this.currentItem)} (${size.name})`,
        price: size.price,
      }
      this.selectedDrinks.push(itemToAdd)
      this.showSizeModal = false
      this.currentItem = null
    },
    cancelSizeSelection() {
      this.showSizeModal = false
      this.currentItem = null
    },
    addToCart() {
      if (this.canAddToCart) {
        // Emit the selected drinks array to the cart
        this.$emit('addToCart', this.selectedDrinks)

        // Clear selections after adding to cart
        this.selectedDrinks = []
      }
    },
    getDrinkName(drink) {
      if (typeof drink === 'string') {
        return drink
      } else if (drink && drink.name) {
        return drink.name
      }

      return 'Unknown Drink'
    },
    getDrinkImage(drink) {
      let name = this.getDrinkName(drink)
      if (!name) return null
      const fileName = `${name.toLowerCase().replace(/\s+/g, '')}.png`
      const imagePath = `/src/assets/${fileName}`
      console.log('Image path:', imagePath)
      return new URL(`/src/assets/${fileName}`, import.meta.url).href;
    },
  },
  mounted() {
    this.fetchMenuItems() // Fetch menu items when the component mounts
  },
}
</script>

<style scoped>
.drink {
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
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
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

.drink-image {
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
  background-color: #4caf50;
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
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  color: #080808;
}

.size-modal button {
  margin: 5px;
  padding: 10px;
}

.close-button {
  position: absolute;
  /* Positioning relative to the modal */
  bottom: 10px;
  /* Adjust as needed */
  right: 10px;
  /* Adjust as needed */
  background-color: transparent;
  /* No background */
  border: none;
  /* No border */
  color: red;
  /* Red color for the X */
  font-size: 24px;
  /* Adjust font size as needed */
  cursor: pointer;
  /* Change cursor to pointer */
}

.close-button:hover {
  color: darkred;
  /* Change color on hover for better UX */
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
