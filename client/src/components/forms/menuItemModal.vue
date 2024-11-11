<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <h2>{{ isNewItem ? 'Edit Food' : 'Add New Food' }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Food Name:</label>
          <input type="text" v-model="form.name" />
        </div>
        <div class="form-group">
          <label for="type">Food Type:</label>
          <select v-model="form.type" class="custom-select">
            <option>Side</option>
            <option>Dessert</option>
            <option>Entree</option>
            <option>Appetizer</option>
            <option>Drink</option>
          </select>
        </div>
        <div class="form-group">
          <label for="type">Ingredients:</label>
          <div class="scrollable-table">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Max Stock</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(ingredient, index) in ingredients"
                  :key="ingredient.id"
                >
                  <td>
                    {{ ingredient.name }}
                  </td>
                  <td>{{ ingredient.maxstock }}</td>
                  <td>
                    <input
                      type="number"
                      v-model="form.quantity[index]"
                      @input="
                        updateIngredient(
                          index,
                          ingredient.name,
                          $event.target.value,
                        )
                      "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal-actions">
          <button type="submit">
            {{ isNewItem ? 'Update' : 'Add' }}
          </button>
          <button type="button" @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MenuItemModal',
  methods: {
    fetchIngredients() {
      axios
        .get('http://localhost:3000/menu/item/total')
        .then(res => {
          ;(this.lastid = res.data.count), (this.form.foodid = this.lastid)
        })
        .catch(error => console.error('Error fetching inventory total:', error))
      axios
        .get('http://localhost:3000/inventory')
        .then(res => (this.ingredients = res.data))
        .catch(error => console.error('Error adding new item:', error))
    },
    addNewFoodItem() {
      const params = new URLSearchParams()
      params.append('foodid', this.lastid)
      params.append('name', this.form.name)
      params.append('type', this.form.type)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      axios
        .post('http://localhost:3000/menu/item/add', params, config)
        .then(this.addNewFoodRecipe)
        .catch(error => console.error('Error adding new item:', error))
    },
    addNewFoodRecipe() {
      for (let i = 0; i < this.form.quantity.length; i++) {
        if (this.form.quantity[i] != undefined) {
          console.log(this.form.quantity[i])
          const params = new URLSearchParams()
          params.append('foodid', this.lastid)
          params.append('ingredientID', i + 1)
          params.append('quantity', this.form.quantity[i])
          params.append('foodname', this.form.name)
          params.append('ingredientname', this.form.ingredientName[i])
          console.log(params)
          const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
          axios
            .post(
              'http://localhost:3000/menu/item/add/ingredient',
              params,
              config,
            )
            .then()
            .catch(error => console.error('Error adding new item:', error))
        }
      }
    },
    submitForm() {
      this.addNewFoodItem()
    },
    deleteItem() {
      this.$emit('delete', this.form)
      this.closeModal()
    },
    closeModal() {
      this.$emit('close')
    },
    updateIngredient(index, value) {
      this.form.ingredientName[index] = value
    },
  },
  props: {
    food: { type: Object, default: null },
  },
  data() {
    return {
      form: {
        foodid: -1,
        name: '',
        type: '',
        quantity: [],
        ingredientName: [],
      },
      ingredients: [],
      lastid: -1,
    }
  },

  computed: {
    isNewItem() {
      return this.item && !this.item.id
    },
  },
  mounted() {
    this.fetchIngredients()
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding-top: 40px;
  padding-bottom: 40px;
}

.modal {
  background-color: #d2ceb8;
  color: #000;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
}

h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type='submit'] {
  background-color: #ffffff;
  color: #000;
  border-color: #000;
}

button[type='button'] {
  background-color: #ffffff;
  color: #000;
  border-color: #000;
}

button[type='button']:nth-child(3) {
  background-color: #ffffff;
  border-color: #000;
}

.custom-select {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  font-size: 14px;
  color: #333;
  width: 100%;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.scrollable-table {
  max-height: 400px; /* Set a fixed height for the scrollable area */
  overflow-y: auto; /* Enable vertical scrolling */
}

.table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  background-color: #e7e4d7;
  border: 1.5px solid black;
  border-spacing: 0px;
  box-shadow: 0 8px 8px #080808;
}

td {
  border: 1.5px solid black;
  text-align: center;
  /* font-size: 1.7vh; */
  color: #000000;
  height: 50px;
  padding: 0;
}
th {
  border: 1.5px solid black;
  text-align: center;
  /* font-size: 2.2vh; */
  color: #000000;
  font-weight: 900;
  height: 50px;
  padding: 0;
}
</style>
