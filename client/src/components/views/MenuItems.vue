<template>
  <div class="inventory">
    <div class="grid">
      <div v-for="food in foods" :key="food.ingredientid">
        <button class="ingredient-card" @click="updateItem(food)">
          {{ food.name }}
        </button>
      </div>
    </div>
    <div class="buttons">
      <button @click="addNewItem" class="add-button">Add New Item</button>
      <button @click="deleteItem" class="add-button">Delete Item</button>
    </div>
    <MenuItemModal
      v-if="showAddMenuItem"
      @close="handleFormSubmit"
      :food="selectedFood"
      :isNewItem="newItem"
      :IngredientList="ingredientList"
    />
    <MenuItemDeleteModel
      v-if="showDeleteMenuItem"
      :foods="foods"
      @close="handleDeleteSubmit"
    />
  </div>
</template>

<script>
import axios from 'axios'
import MenuItemModal from '../forms/menuItemModal.vue'
import MenuItemDeleteModel from '../forms/menuItemDeleteModel.vue'
export default {
  name: 'Inventory',
  components: {
    MenuItemModal,
    MenuItemDeleteModel,
  },
  data() {
    return {
      foods: [],
      showAddMenuItem: false,
      selectedFood: null,
      newItem: false,
      ingredientList: [],
      showDeleteMenuItem: false,
    }
  },
  methods: {
    async fetchInventory() {
      try {
        const response = await axios.get('http://localhost:3000/menu')
        this.foods = response.data
      } catch (error) {
        console.error('Error fetching inventory:', error)
      }
    },

    fetchIngredientList(food) {
      const params = new URLSearchParams()
      params.append('foodid', food.foodid)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: { foodid: food.foodid },
      }
      axios
        .get('http://localhost:3000/menu/item/view/ingredients', config)
        .then(res => {
          ;(this.ingredientList = res.data), (this.newItem = false)
          this.selectedFood = food
          this.showAddMenuItem = !this.showAddMenuItem
        })
        .catch(error => console.error('Error fetching inventory total:', error))
    },

    addNewItem() {
      this.newItem = true
      this.selectedFood = null
      this.showAddMenuItem = !this.showAddMenuItem
    },
    updateItem(food) {
      this.fetchIngredientList(food)
    },
    deleteItem() {
      this.showDeleteMenuItem = !this.showDeleteMenuItem
    },
    fetchFoods() {
      axios
        .get('http://localhost:3000/menu')
        .then(res => {
          this.foods = res.data
        })
        .catch(error => console.error('Error fetching foods:', error))
    },
    handleFormSubmit() {
      this.showAddMenuItem = !this.showAddMenuItem
      this.fetchInventory()
      this.fetchFoods()
    },
    handleDeleteSubmit() {
      this.showDeleteMenuItem = !this.showDeleteMenuItem
      this.fetchInventory()
      this.fetchFoods()
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
.buttons {
  display: flex;
  justify-content: space-around;
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
  box-shadow: none;
  width: 200px;
  height: 75px;
}

button {
  font-size: medium;
  border: 2px solid #080808;
  border-radius: 30px;
  background-color: #e7e4d7;
  color: #080808;
  font: Arial;
  padding: 15px;
  margin-bottom: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 4px 3px #080808;
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
