<template>
  <div class="main-content" :class="{ 'menu-collapsed': isMenuBarCollapsed }">
    <MenuBar
      :is-collapsed="isMenuBarCollapsed"
      @toggle="toggleMenuBar"
      @selectItem="handleItemSelection"
    />
    <h2>
      {{ item }} Menu
      <span v-if="prices[item] !== undefined" class="price">
        ({{ formatPrice(prices[item]) }})
      </span>
    </h2>

    <!-- Wait for loading to finish before rendering components -->
    <div v-if="!loading">
      <component
        :is="getComponentName(item)"
        @addToCart="$emit('addToCart', $event)"
        @addToTransactionCart="$emit('addToTransactionCart', $event)"
        :outOfStockItems="outOfStockItems"
      />
    </div>

    <!-- Show a loading spinner or message while data is being fetched -->
    <div v-else class="loading-spinner">
      <!-- <p>Loading data, please wait...</p> -->
    </div>

    <button @click="showAllergenModal" class="allergen-button">
      Allergens
    </button>

    <div v-if="showAllergenList" class="allergen-modal">
      <div class="allergen-modal-content">
        <h2>Allergen Information</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Allergens</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(allergens, item) in allergenList" :key="item">
              <td>{{ item }}</td>
              <td>{{ allergens }}</td>
            </tr>
          </tbody>
        </table>
        <button @click="showAllergenList = false" class="close-button">
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MenuBar from './MenuBar.vue'
import Appetizer from './menu/Appetizers.vue'
import Bowl from './menu/Bowl.vue'
import Plate from './menu/Plate.vue'
import BiggerPlate from './menu/BiggerPlate.vue'
import Drink from './menu/Drinks.vue'
import ALaCarte from './menu/ALaCarte.vue'

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
      isMenuBarCollapsed: false,
      showAllergenList: false,
      allergenList: {},
      outOfStockItems: {},
      loading: true, // New loading state
    }
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
      this.item = "Bowl"
    },
    async fetchPrices() {
      try {
        const items = ['Bowl', 'Plate', 'Bigger Plate']
        for (const item of items) {
          const response = await axios.get(
            import.meta.env.VITE_API_ENDPOINT +
              `price/${encodeURIComponent(item)}`,
          )
          this.prices[item] = response.data.price
        }
      } catch (error) {
        console.error('Error fetching prices:', error)
      }
    },
    async fetchAllAllergens() {
      try {
        // const apiUrl = import.meta.env.VITE_API_ENDPOINT.replace(/\/$/, '');
        // const response = await axios.get(`${apiUrl}/allergens`);
        const response = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + `allergens`,
        )

        // Expecting an array of objects [{ name: 'Food Item', allergens: 'Allergen Info' }]
        this.allergenList = response.data.reduce((acc, item) => {
          acc[item.name] = item.allergens || 'None'

          return acc
        }, {})
      } catch (error) {
        console.error(
          'Error fetching allergens:',
          error.response?.data || error.message,
        )
      }
    },
    showAllergenModal() {
      if (!Object.keys(this.allergenList).length) {
        this.fetchAllAllergens()
      }
      this.showAllergenList = true
    },
    async validateInventory() {
      try {
        const categories = ['Appetizer', 'Drink', 'Entree', 'Side']
        const outOfStock = {}

        for (const category of categories) {
          // Fetch menu items for each category
          const response = await axios.get(
            import.meta.env.VITE_API_ENDPOINT +
              `menu/${encodeURIComponent(category)}`,
          )
          const menuItems = response.data

          outOfStock[category] = []

          for (const item of menuItems) {
            const recipeResponse = await axios.get(
              import.meta.env.VITE_API_ENDPOINT +
                `recipe/${encodeURIComponent(item)}`,
            )
            const recipe = recipeResponse.data
            // console.log(`Recipe of ${item}: `, recipe);

            let isOutOfStock = false

            // Check stock for each ingredient in the recipe
            for (const ingredient of recipe) {
              // console.log('Current Ingredient: ', ingredient);
              const inventoryResponse = await axios.get(
                import.meta.env.VITE_API_ENDPOINT +
                  `inventory/${ingredient.name}`,
              )
              // console.log('Inventory of Current Ingredient: ', inventoryResponse);
              const stock = inventoryResponse.data.stock

              if (stock < ingredient.quantity) {
                isOutOfStock = true
                break
              }
            }

            if (isOutOfStock) {
              outOfStock[category].push(item)
            }
          }
        }

        this.outOfStockItems = outOfStock
        console.log('Out of stock items: ', this.outOfStockItems)
      } catch (error) {
        console.error('Error validating inventory:', error)
      }
    },
    getComponentName(item) {
      switch (item) {
        case 'Appetizers':
          return 'Appetizer'
        case 'Bowl':
          return 'Bowl'
        case 'Plate':
          return 'Plate'
        case 'Bigger Plate':
          return 'BiggerPlate'
        case 'Drinks':
          return 'Drink'
        case 'A La Carte':
          return 'ALaCarte'
        default:
          return null
      }
    },
    formatPrice(price) {
      return price !== null ? `$${price.toFixed(2)}` : 'Loading...'
    },
    async fetchData() {
      await Promise.all([
        this.fetchPrices(),
        this.fetchAllAllergens(),
        this.validateInventory(),
      ])
      this.loading = false // Set loading to false after all data is fetched
    },
    toggleMenuBar() {
      this.isMenuBarCollapsed = !this.isMenuBarCollapsed
    },
    handleItemSelection(item) {
      this.item = item
      this.isMenuBarCollapsed = true
    },
  },
  async mounted() {
    await this.fetchData() // Fetch all required data
  },
}
</script>

<style scoped>
.main-content {
  position: fixed;
  top: 0;
  left: 450px;
  right: 0px;
  bottom: 0;
  background-color: #9b150b;
  color: #e7e4d7;
  padding: 40px;
  overflow-y: auto;
  z-index: 1;
  transition: left 0.3s ease;
}
.price {
  font-size: 0.9em;
  font-weight: normal;
  margin-left: 10px;
  color: #ffd700;
}
.main-content.menu-collapsed {
  left: 50px;
}
.allergen-button {
  padding: 0.9375em 0.9375em;
  font-size: 0.9375em;
  font-weight: 700;
  background-color: #18e4f3;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 10px;
  position: fixed;
  bottom: 25px;
  right: 45px;
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
.allergen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.allergen-modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;
  color: black;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
.allergen-modal-content {
  position: relative; /* Ensures the close button is positioned relative to this container */
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;
  color: black;
}

.close-button {
  position: absolute; /* Position relative to .allergen-modal-content */
  top: 22px; /* Distance from the top edge of the modal */
  right: 20px; /* Distance from the right edge of the modal */
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.875em;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full page height */
  position: relative;
}

.loading-spinner::after {
  content: '';
  width: 50px;
  height: 50px;
  border: 5px solid #ada88d;
  border-top-color: #e7e4d7; /* Primary color */
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
