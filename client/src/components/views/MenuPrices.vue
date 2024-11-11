<template>
    <div class="inventory">
      <div class="grid">
        <div
          v-for="ingredient in ingredients"
          :key="ingredient.ingredientid"
        >
          <button @click="openModal(ingredient)" class = "ingredient-card">
            <p> {{ ingredient.type }}</p>
            <p> {{ ingredient.price }}</p>
          </button>

        </div>
      </div>
      <menuPriceModal 
        v-if="showModal"
        :item="selectedItem"
        @close="closeModal"
        @submit="handleFormSubmit"
    />
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import menuPriceModal from '../forms/menuPriceModal.vue';
  export default {
    name: 'MenuPrices',
    components: {
      menuPriceModal,
    },
    data() {
      return {
        ingredients: [],
        showModal: false,
        selectedItem: null,
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
      },
      openModal(item = null) {
        this.selectedItem = item;
        this.showModal = true;
      },
      handleFormSubmit(form){
        const params = new URLSearchParams()
        params.append('type', form.type)
        params.append('price', form.price)

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
        axios
        .patch('http://localhost:3000/prices/setprice', params, config)
        .then(() => this.fetchInventory())
        .catch(error => console.error('Error updating price:', error))

        console.log('updated item:',form.price)
      },
      closeModal() {
        this.showModal = false;
      },
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
  