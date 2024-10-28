<template>
  <div class="drink">
    <h2>Drinks</h2>
    <div class="grid">
      <button v-for="drink in drinks" :key="drink" @click="selectItem(drink)">
        {{ drink }}
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
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
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
}

button:hover {
  background-color: #d2ceb8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>