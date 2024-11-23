<template>
  <div class="drink">
    <h2>Pick 1 or more Drinks</h2>
    <div class="grid">
      <button v-for="drink in drinks" :key="drink" @click="toggleDrinks(drink)"
        :class="{ selected: isSelected(drink) }">
        <img v-if="getDrinkImage(drink)" :src="getDrinkImage(drink)" :alt="getDrinkName(drink)" class="drink-image"
          @error="handleImageError" />
        <span>{{ getDrinkName(drink) }}</span>
        <span v-if="isSelected(drink)" class="checkmark">✓</span>
        <span v-if="getSelectedSize(drink)" class="size-tag">
          {{ getSelectedSize(drink) }}
        </span>
      </button>
    </div>
    <!-- Size Selection Modal -->
    <div v-if="showSizeModal" class="size-modal">
      <h3 class="modal-title">
        Select Size for {{ getDrinkName(currentItem) }}
      </h3>
      <div>
        <button
          v-for="size in sizeOptions.drink.filter(size => size.name !== 'Aquafina' && size.name !== 'Gatorade Lemon Lime')"
          :key="size.name" @click="selectSize(size)">
          {{ size.name }} - ${{ size.price ? size.price.toFixed(2) : 'Loading...' }}
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
          { name: 'Small', price: null, baseItemID: null },
          { name: 'Medium', price: null, baseItemID: null },
          { name: 'Large', price: null, baseItemID: null },
        ],
      },
      specialDrinks: [
        { name: 'Aquafina', price: null, baseItemID: null },
        { name: 'Gatorade Lemon Lime', price: null, baseItemID: null },
      ],
    };
  },
  computed: {
    canAddToCart() {
      return this.selectedDrinks.length > 0
    },
  },
  methods: {
    async fetchMenuItems() {
      try {
        const drinkResponse = await axios.get(import.meta.env.VITE_API_ENDPOINT + 'menu/Drink')
        this.drinks = drinkResponse.data
        // console.log(this.drinks)

        // Fetch base item IDs for sizes
        for (const size of this.sizeOptions.drink) {
          const response = await axios.get(
            import.meta.env.VITE_API_ENDPOINT + `itemid/${encodeURIComponent(size.name + ' Drink')}`
          );
          size.baseItemID = response.data.itemID;
        }

        // Fetch base item IDs for special drinks
        for (const specialDrink of this.specialDrinks) {
          const response = await axios.get(
            import.meta.env.VITE_API_ENDPOINT + `itemid/${encodeURIComponent(specialDrink.name)}`
          );
          specialDrink.baseItemID = response.data.itemID;
        }
      } catch (error) {
        console.error('Error fetching menu items:', error)
      }
    },
    async fetchItemPrices() {
      try {
        // Fetch prices for regular drinks
        for (const size of this.sizeOptions.drink) {
          const response = await axios.get(
            import.meta.env.VITE_API_ENDPOINT + `price/${encodeURIComponent(size.name + ' Drink')}`
          );
          size.price = response.data.price;
        }

        // Fetch prices for special drinks
        for (const specialDrink of this.specialDrinks) {
          const response = await axios.get(
            import.meta.env.VITE_API_ENDPOINT + `price/${encodeURIComponent(specialDrink.name)}`
          );
          specialDrink.price = response.data.price;
        }

      } catch (error) {
        console.error("Error fetching item prices:", error);
      }
    },
    async toggleDrinks(drink) {
      try {
        const drinkName = this.getDrinkName(drink);

        const specialDrink = this.specialDrinks.find(
          (d) => d.name.toLowerCase() === drinkName.toLowerCase(),
        );

        if (specialDrink) {
          // Handle special bottled drinks
          const drinkID = await this.getDrinkID(drink); // Await the drinkID resolution

          const transactionEntry = [
            specialDrink.baseItemID,
            drinkID,
            0, 0, 0,
          ];
          const itemToAdd = {
            name: drinkName,
            price: specialDrink.price,
            transactionEntry,
          };
          this.selectedDrinks.push(itemToAdd);
        } else {
          // Show size modal for regular drinks
          this.currentItem = drink;
          this.showSizeModal = true;
        }
      } catch (error) {
        console.error('Error toggling drink selection:', error);
      }
    },
    isSelected(drink) {
      const drinkID = this.getDrinkID(drink); // Fetch the unique drink ID
      return this.selectedDrinks.some(selectedDrink => selectedDrink.id === drinkID);
    },
    getSelectedSize(drink) {
      const drinkName = this.getDrinkName(drink);
      const selectedDrink = this.selectedDrinks.find(item =>
        item.name.includes(drinkName)
      );
      return selectedDrink ? selectedDrink.size : null;
    },
    async selectSize(size) {
      try {
        // Fetch drinkID for the current drink
        const drinkID = await this.getDrinkID(this.currentItem); // Await the drinkID resolution
        const drinkName = this.getDrinkName(this.currentItem); // Get the base name
        const fullName = `${drinkName} (${size.name})`; // Add size to the name

        // Construct transaction entry
        const transactionEntry = [
          size.baseItemID, // Base item ID depends on size
          drinkID, 0, 0, 0,
        ];

        // Add the drink with size to the cart
        const itemToAdd = {
          id: await this.getDrinkID(this.currentItem), // Use unique drink ID
          name: fullName,
          price: size.price,
          size: size.name,
          transactionEntry,
        };

        // Remove duplicates for the same drink
        this.selectedDrinks = this.selectedDrinks.filter(item => item.id !== itemToAdd.id);
        this.selectedDrinks.push(itemToAdd);

        console.log("Selected Drinks Array:", this.selectedDrinks);
        console.log('Drink Name:', this.getDrinkName(this.currentItem));

        // Close modal and reset current item
        this.showSizeModal = false;
        this.currentItem = null;
      } catch (error) {
        console.error('Error selecting size:', error);
      }
    },
    cancelSizeSelection() {
      this.showSizeModal = false
      this.currentItem = null
    },
    addToCart() {
      if (this.canAddToCart) {
        // Emit selected drinks to the cart
        this.selectedDrinks.forEach((drink) => {
          this.$emit('addToCart', drink);
          this.$emit('addToTransactionCart', drink.transactionEntry);
          console.log('Added Transaction: ', drink.transactionEntry);
        });

        // Clear selections
        this.selectedDrinks = [];
      }
    },
    async getDrinkID(drink) {
      try {
        // Fetch drinkID for a given drink name from the database
        const drinkName = this.getDrinkName(drink);
        const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + `foodid/${encodeURIComponent(drinkName)}`);

        if (response.data && response.data.foodID) {
          return response.data.foodID; // Return the resolved foodID
        } else {
          throw new Error(`No foodID found for drink: ${drinkName}`);
        }
      } catch (error) {
        console.error(`Error fetching foodID for drink "${drinkName}":`, error);
        throw error; // Re-throw to allow handling in calling code
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
      // console.log('Image path:', imagePath)
      return new URL(`/src/assets/${fileName}`, import.meta.url).href;
    },
  },
  mounted() {
    this.fetchMenuItems(); // Fetch menu items when the component mounts
    this.fetchItemPrices();
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

.size-tag {
  margin-left: 5px;
  padding: 2px 6px;
  background-color: #4CAF50;
  color: white;
  font-size: 12px;
  border-radius: 12px;
}
</style>
