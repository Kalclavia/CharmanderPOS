<template>
  <div class="inventory">
    <div class="grid">
      <div
        v-for="ingredient in ingredients"
        :key="ingredient.ingredientid"
        class="ingredient-card"
      >
        <p><strong>ID:</strong> {{ ingredient.ingredientid }}</p>
        <p><strong>Name:</strong> {{ ingredient.name }}</p>
        <p>
          <strong>Stock:</strong> {{ ingredient.stock }} {{ ingredient.units }}
        </p>
        <p>
          <strong>Max Stock:</strong> {{ ingredient.maxstock }}
          {{ ingredient.units }}
        </p>

        <button @click="updateStock(ingredient)">Update Stock</button>
        <button @click="deleteItem(ingredient.ingredientid)">Delete</button>
      </div>
    </div>
    <button @click="addNewItem" class="add-button">Add New Item</button>
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
        const response = await axios.get('http://localhost:3000/inventory')
        this.ingredients = response.data
        console.log(this.ingredients)
      } catch (error) {
        console.error('Error fetching inventory:', error)
      }
    },
    updateStock(item) {
      const newStock = prompt(
        `Enter new stock level for ${item.name}:`,
        item.stock,
      )
      if (newStock !== null) {
        axios
          .patch('http://localhost:3000/inventory/updateStock', {
            ingredientid: item.ingredientid,
            stock: newStock,
          })
          .then(() => this.fetchInventory())
          .catch(error => console.error('Error updating stock:', error))
      }
    },
    deleteItem(ingredientid) {
      if (confirm('Are you sure you want to delete this item?')) {
        axios
          .delete('http://localhost:3000/inventory/delete/' + ingredientid)
          .then(() => this.fetchInventory())
          .catch(error => console.error('Error deleting item:', error))
      }
    },
    addNewItem() {
      const params = new URLSearchParams()
      params.append('ingredientid', prompt('Enter ID:'))
      params.append('name', prompt('Enter name:'))
      params.append('stock', prompt('Enter stock:'))
      params.append('maxstock', prompt('Enter max stock:'))
      params.append('units', prompt('Enter units:'))

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      axios
        .post('http://localhost:3000/inventory/add', params, config)
        .then(() => this.fetchInventory())
        .catch(error => console.error('Error adding new item:', error))
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
}

button {
  border: 1px solid black;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: black;
  padding: 10px;
  cursor: pointer;
  margin: 5px 0;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
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
