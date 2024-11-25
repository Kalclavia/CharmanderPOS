<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <h2>{{ isNewItem ? 'Add New Food' : 'Edit Food' }}</h2>
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
          <label for="name">Allergens:</label>
          <input type="text" v-model="form.allergens" />
        </div>
        <div class="form-group-radio" v-if="IsDeletedItem">
          <label for="isDeleted">Deleted Food:</label>
          <input
            type="checkbox"
            value="true"
            v-model="form.isDeleted"
            class="radio-group"
          />
        </div>
        <div class="form-group-radio">
          <label for="isPremium">Premium Item:</label>
          <input
            type="checkbox"
            value="true"
            v-model="form.isPremium"
            class="radio-group"
          />
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
            <div class="modal-actions">
              <button type="submit">
                {{ isNewItem ? 'Add' : 'Update' }}
              </button>
              <button type="button" @click="closeModal">Cancel</button>
            </div>
          </div>
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
        .get(import.meta.env.VITE_API_ENDPOINT + 'menu/item/total')
        .then(res => {
          this.lastid = res.data.count
        })
        .catch(error => console.error('Error fetching inventory total:', error))
      axios
        .get(import.meta.env.VITE_API_ENDPOINT + 'inventory')
        .then(res => (this.ingredients = res.data))
        .then(this.updateFoodForm())
        .catch(error => console.error('Error adding new item:', error))
    },
    addNewFoodItem() {
      if (this.form.name != '' && this.form.type != '') {
        const params = new URLSearchParams()
        params.append('foodid', this.lastid)
        params.append('name', this.form.name)
        params.append('type', this.form.type)
        params.append('isRemoved', this.form.isDeleted)
        params.append('premium', this.form.isPremium)
        params.append('allergens', this.form.allergens)
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
        axios
          .post(
            import.meta.env.VITE_API_ENDPOINT + 'menu/item/add',
            params,
            config,
          )
          .then(this.addNewFoodRecipe)
          .catch(error => console.error('Error adding new item:', error))
      }
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
              import.meta.env.VITE_API_ENDPOINT + 'menu/item/add/recipe',
              params,
              config,
            )
            .then(this.closeModal())
            .catch(error => console.error('Error adding new item:', error))
        }
      }
    },
    updateFoodItem() {
      if (this.form.name != '' && this.form.type != '') {
        const params = new URLSearchParams()
        params.append('name', this.form.name)
        params.append('type', this.form.type)
        params.append('foodid', this.form.foodid)
        params.append('isRemoved', this.form.isDeleted)
        params.append('premium', this.form.isPremium)
        params.append('allergens', this.form.allergens)

        console.log(params)
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
        axios
          .patch(
            import.meta.env.VITE_API_ENDPOINT + 'menu/item/update/type',
            params,
            config,
          )
          .then()
          .catch(error => console.error('Error adding new item:', error))
      }
    },
    updateFoodItemRecipe() {
      console.log(this.form)
      for (let i = 0; i < this.form.quantity.length; i++) {
        if (this.form.quantity[i] != undefined) {
          const params = new URLSearchParams()
          params.append('quantity', this.form.quantity[i])
          params.append('ingredientID', i + 1)
          params.append('foodid', this.form.foodid)
          params.append('foodname', this.form.name)
          params.append('ingredientname', this.form.ingredientName[i])

          const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            params,
          }

          let size = 0
          axios
            .get(
              import.meta.env.VITE_API_ENDPOINT + 'menu/item/view/recipe',
              config,
            )
            .then(res => (size = res.data.length))
            .then(res => {
              if (size == 1) {
                axios
                  .patch(
                    import.meta.env.VITE_API_ENDPOINT +
                      'menu/item/update/recipe',
                    params,
                    config,
                  )
                  .then(res => console.log(res.data))
                  .catch(error =>
                    console.error('Error adding new item:', error),
                  )
              } else {
                axios
                  .post(
                    import.meta.env.VITE_API_ENDPOINT + 'menu/item/add/recipe',
                    params,
                    config,
                  )
                  .then(console.log(params))
                  .catch(error =>
                    console.error('Error adding new item:', error),
                  )
              }
            })
            .catch(error => console.error('Error adding new item:', error))
        }
        this.updateFoodItem()
      }

      // const params = new URLSearchParams()
      // params.append('name', this.form.name)
      // params.append('type', this.form.type)
      // params.append('foodid', this.form.foodid)
      // console.log(params)
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      // }
      // axios
      //   .patch(import.meta.env.VITE_API_ENDPOINT + 'menu/item/update/type', params, config)
      //   .then()
      //   .catch(error => console.error('Error adding new item:', error))
    },
    submitForm() {
      if (this.isNewItem) {
        this.addNewFoodItem()
      } else {
        this.updateFoodItemRecipe()
      }
      this.closeModal()
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
    updateFoodForm() {
      if (this.food != null) {
        this.form.foodid = this.food.foodid
        this.form.name = this.food.name
        this.form.type = this.food.type
        this.form.isDeleted = this.IsDeletedItem
        this.form.isPremium = this.food.premium
        this.form.allergens = this.food.allergens
        for (let i = 0; i < this.IngredientList.length; i++) {
          this.form.quantity[this.IngredientList[i].ingredientid - 1] =
            this.IngredientList[i].quantity
          this.form.ingredientName[this.IngredientList[i].ingredientid - 1] =
            this.IngredientList[i].ingredient_name
        }
      } else {
        this.form.foodid = this.lastid
      }
    },
  },
  // watch: {
  //   IngredientList: {
  //     immediate: true,
  //     handler(newVal) {
  //       if (newVal && newVal.length) {
  //         // this.form.quantity = newVal.map(
  //         //   ingredient => ingredient.quantity || 0,
  //         // )
  //         // this.form.ingredientName = newVal.map(
  //         //   ingredient => ingredient.name || '',
  //         // )
  //         // for (let i = 0; i < this.IngredientList.length; i++) {
  //         //   this.form.quantity[this.IngredientList[i].ingredientid - 1] =
  //         //     this.IngredientList[i].quantity
  //         // }
  //       }
  //     },
  //   },
  // },
  props: {
    food: { type: Object, default: null },
    isNewItem: { type: Boolean, required: true },
    IngredientList: { type: Array, required: false, default: null },
    IsDeletedItem: { type: Boolean, required: true },
    // isPremiumItem: { type: Boolean, required: true },
    // allergens: { type: String, required: true },
  },
  data() {
    return {
      form: {
        foodid: -1,
        name: '',
        type: '',
        quantity: [],
        ingredientName: [],
        isDeleted: false,
        isPremium: false,
      },
      ingredients: [],
      lastid: -1,
    }
  },

  mounted() {
    // this.updateFoodForm()
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
}
.radio-group {
  margin-left: auto;
}
.modal {
  background-color: #d2ceb8;
  color: #000;
  border-radius: 8px;
  padding: 20px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
}

h2 {
  margin-top: 0;
}

.form-group-radio {
}

.form-group-radio label {
  display: block;
  font-weight: bold;
}

.form-group-radio input {
  padding: 8px;
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 0.9375em;
}

.form-group label {
  display: block;
  font-weight: bold;
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
  padding: 10px 0.9375em;
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
  font-size: 0.875em;
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
