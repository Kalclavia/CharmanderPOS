<template>
  <div class="drink">
    <h2>Drinks</h2>
    <div class="grid">
      <button v-for="drink in drinks" :key="drink" @click="selectItem(drink)">
        <img 
            v-if="getDrinkImage(drink)"
            :src="getDrinkImage(drink)"
            :alt="getDrinkName(drink)"
            class="drink-image"
            @error="handleImageError"
        />
        <span>{{ getDrinkName(drink) }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios' // Make sure to install axios if you haven't already

export default {
  name: 'Drink',
  data() {
    return {
      drinks: [],
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
    selectItem(item) {
      console.log(item)
      this.$emit('selectItem', item) // Emit selected item to the parent
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
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  min-height: 150px;
}

button:hover {
  background-color: #d2ceb8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.drink-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 5px;
}
</style>