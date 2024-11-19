<template>
  <div class="plate">
    <h2>Pick 1 Side</h2>
    <div class="grid">
      <button v-for="side in sides" :key="side" @click="selectSide(side)" :class="{ selected: selectedSide === side }">
        <img v-if="getSideImage(side)" :src="getSideImage(side)" :alt="getSideName(side)" class="side-image"
          @error="handleImageError" />
        <span>{{ getSideName(side) }}</span>
        <span v-if="selectedSide === side" class="checkmark">✓</span>
      </button>
    </div>

    <h2>Pick 2 Entrees</h2>
    <div class="grid">
      <button v-for="entree in entrees" :key="entree" @click="selectEntree(entree)"
        :class="{ selected: selectedEntrees.includes(entree) }">
        <img v-if="getEntreeImage(entree)" :src="getEntreeImage(entree)" :alt="getEntreeName(entree)"
          class="entree-image" @error="handleImageError" />
        <span>{{ getEntreeName(entree) }}</span>
        <span v-if="selectedEntrees.includes(entree)" class="checkmark">✓</span>
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
  name: 'Plate',
  data() {
    return {
      sides: [],
      entrees: [],
      selectedSide: null,
      selectedEntrees: [], // Track selected entrees as an array
    }
  },
  computed: {
    canAddToCart() {
      // Can only add to cart if 1 side and exactly 2 entrees are selected
      return this.selectedSide && this.selectedEntrees.length === 2
    },
  },
  methods: {
    async fetchMenuItems() {
      try {
        const sideResponse = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + 'menu/Side',
        )
        const entreeResponse = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + 'menu/Entree',
        )
        this.sides = sideResponse.data
        this.entrees = entreeResponse.data
      } catch (error) {
        console.error('Error fetching menu items:', error)
      }
    },
    selectSide(side) {
      // Select one side and deselect the others
      this.selectedSide = this.selectedSide === side ? null : side
    },
    selectEntree(entree) {
      // Add or remove entrees, ensuring only two can be selected
      if (this.selectedEntrees.includes(entree)) {
        this.selectedEntrees = this.selectedEntrees.filter(
          item => item !== entree,
        )
      } else if (this.selectedEntrees.length < 2) {
        this.selectedEntrees.push(entree)
      }
    },
    addToCart() {
      if (this.canAddToCart) {
        const item = {
          name: `Plate (${this.getSideName(this.selectedSide)} + ${this.selectedEntrees.map(entree => this.getEntreeName(entree)).join(', ')})`,
          price: 9.8, // Assuming a fixed price for a plate
        }
        this.$emit('addToCart', item)
        this.selectedSide = null
        this.selectedEntrees = []
      }
    },
    getSideName(side) {
      if (typeof side === 'string') {
        return side
      } else if (side && side.name) {
        return side.name
      }
      return 'Unknown Side'
    },
    getSideImage(side) {
      let name = this.getSideName(side)
      if (!name) return null
      const fileName = `${name.toLowerCase().replace(/\s+/g, '')}.png`
      const imagePath = `/src/assets/${fileName}`
      return new URL(`/src/assets/${fileName}`, import.meta.url).href;
    },
    getEntreeName(entree) {
      if (typeof entree === 'string') {
        return entree
      } else if (entree && entree.name) {
        return entree.name
      }
      return 'Unknown Entree'
    },
    getEntreeImage(entree) {
      let name = this.getEntreeName(entree)
      if (!name) return null
      const fileName = `${name.toLowerCase().replace(/\s+/g, '')}.png`
      const imagePath = `/src/assets/${fileName}`
      return new URL(`/src/assets/${fileName}`, import.meta.url).href;
    },
    handleImageError(event) {
      console.error('Image failed to load:', event.target.src)
      event.target.style.display = 'none'
    },
  },
  mounted() {
    this.fetchMenuItems() // Fetch menu items when the component mounts
  },
}
</script>

<style scoped>
.plate {
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

.side-image,
.entree-image {
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
</style>
