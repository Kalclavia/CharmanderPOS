<template>
  <div class="drink">
    <h2>Drinks</h2>
    <div class="grid">
      <button v-for="drink in drinks" :key="drink" @click="toggleDrinks(drink)"
        :class="{ selected: selectedDrinks.includes(drink) }">
        <img v-if="getDrinkImage(drink)" :src="getDrinkImage(drink)" :alt="getDrinkName(drink)" class="drink-image"
          @error="handleImageError" />
        <span>{{ getDrinkName(drink) }}</span>
        <span v-if="selectedDrinks.includes(drink)" class="checkmark">✓</span>
      </button>
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
      selectedDrinks: []
    }
  },
  computed: {
    canAddToCart() {
      return this.selectedDrinks.length > 0;
    }
  },
  methods: {
    async fetchMenuItems() {
      try {
        const drinkResponse = await axios.get(
          'http://localhost:3000/menu/Drink',
        )
        this.drinks = drinkResponse.data
        console.log(this.drinks)
      } catch (error) {
        console.error('Error fetching menu items:', error)
      }
    },
    toggleDrinks(drink) {
      if (this.selectedDrinks.includes(drink)) {
        this.selectedDrinks = this.selectedDrinks.filter(selected => selected !== drink);
      } else {
        this.selectedDrinks.push(drink);
      }
    },
    addToCart() {
      if (this.canAddToCart) {
        // Flatten itemsToAdd array with selected sides and entrees
        const itemsToAdd = [];

        // Add each selected side
        this.selectedDrinks.forEach(drink => {
          itemsToAdd.push({
            name: `Drink: ${this.getDrinkName(drink)}`,
            price: 4.50
          });
        });

        // Emit the itemsToAdd array to the cart
        this.$emit('addToCart', itemsToAdd);

        // Clear selections after adding to cart
        this.selectedDrinks = [];
      }
    },
    getDrinkName(drink) {
      if (typeof drink === 'string') {
        return drink
      }
      else if (drink && drink.name) {
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
      return imagePath
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