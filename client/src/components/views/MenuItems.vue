<template>
  <div class="inventory">
    <div class="grid">
      <div v-for="food in foods" :key="food.ingredientid">
        <button class="ingredient-card" @click="updateItem(food, false)">
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
      :IsDeletedItem="isDeletedItem"
    />
    <MenuItemDeleteModel
      v-if="showDeleteMenuItem"
      :foods="foods"
      @close="handleDeleteSubmit"
    />
    <h2 class="text" v-if="deletedfoods.length != 0">Removed Menu Items</h2>
    <div class="grid-deleted">
      <div v-for="food in deletedfoods" :key="food.ingredientid">
        <button class="ingredient-card" @click="updateItem(food, true)">
          {{ food.name }}
        </button>
      </div>
    </div>
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
      deletedfoods: [],
      showAddMenuItem: false,
      selectedFood: null,
      newItem: false,
      ingredientList: [],
      showDeleteMenuItem: false,
      isDeletedItem: false,
    }
  },
  methods: {
    async fetchInventory() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_ENDPOINT + 'menu',
        )
        this.foods = response.data
        console.log(this.foods)
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
        .get(
          import.meta.env.VITE_API_ENDPOINT + 'menu/item/view/ingredients',
          config,
        )
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
      this.isDeletedItem = false
    },
    updateItem(food, deleteditem) {
      this.fetchIngredientList(food)
      this.isDeletedItem = deleteditem
    },
    deleteItem() {
      this.showDeleteMenuItem = !this.showDeleteMenuItem
    },
    fetchFoods() {
      axios
        .get(import.meta.env.VITE_API_ENDPOINT + 'menu')
        .then(res => {
          this.foods = res.data
        })
        .then(() =>
          axios
            .get(import.meta.env.VITE_API_ENDPOINT + 'menu/view/removed')
            .then(res => {
              this.deletedfoods = res.data
            })
            .catch(error => console.error('Error fetching foods:', error)),
        )
        .catch(error => console.error('Error fetching foods:', error))
    },
    fetchDeletedFoods() {
      axios
        .get(import.meta.env.VITE_API_ENDPOINT + 'menu/view/removed')
        .then(res => {
          this.deletedfoods = res.data
        })
        .catch(error => console.error('Error fetching foods:', error))
    },
    handleFormSubmit() {
      this.showAddMenuItem = !this.showAddMenuItem
      this.fetchInventory()
      this.fetchFoods()
      // this.fetchDeletedFoods()
    },
    handleDeleteSubmit() {
      this.showDeleteMenuItem = !this.showDeleteMenuItem
      this.fetchInventory()
      this.fetchFoods()
      // this.fetchDeletedFoods()
    },
  },
  mounted() {
    this.fetchInventory()
    this.fetchDeletedFoods()
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

.grid-deleted {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
  margin-top: 20px;
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
