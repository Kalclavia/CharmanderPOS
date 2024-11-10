<template>
    <div class="inventory">
      <div class="grid">
        <div
          v-for="ingredient in ingredients"
          :key="ingredient.ingredientid"
        >
          <button class = "ingredient-card">
            <p> {{ ingredient.type }}</p>
            <p> {{ ingredient.price }}</p>
          </button>

        </div>
      </div>
      <!-- <button @click="updateItem" class="add-button">Update Prices</button> -->
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Inventory',
    data() {
      return {
        ingredients: [],
      }
    },
    methods: {
      async fetchInventory() {
        try {
          const response = await axios.get('http://localhost:3000/prices')
          this.ingredients = response.data
          console.log(this.ingredients)
        } catch (error) {
          console.error('Error fetching inventory:', error)
        }
      }
    },
    mounted() {
      this.fetchInventory()
    },
  }
  </script>
  
  <style scoped>
  .inventory {
    padding: 20px;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .ingredient-card {
    border: 2px solid black;
    border-radius: 10px;
    background-color: #e7e4d7;
    color: black;
    padding: 15px;
    text-align: center;
    width: 200px;
    height: 75px;
  }
  
  /* button {

  font-size: medium;
  border: 2px solid #080808;
  border-radius: 30px;
  background-color: #e7e4d7;
  color: #080808;
  font: Arial;
  padding: 15px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 3px #080808;
  } */
  
  button:hover {
    background-color: #d2ceb8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .add-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-weight: bold;
  }
  </style>
  