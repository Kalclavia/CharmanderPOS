<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <h2>Delete Food</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="type">Food:</label>
          <select v-model="form.food" class="custom-select">
            <option v-for="food in foods" :key="food.foodid" :value="food">
              {{ food.name }}
            </option>
          </select>
        </div>

        <div class="modal-actions">
          <button type="submit">Delete</button>
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
    deleteFood() {
      const params = new URLSearchParams()
      params.append('foodname', this.form.food.name)
      params.append('foodid', this.form.food.foodid)

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      console.log(params)
      axios
        .post(
          import.meta.env.VITE_API_ENDPOINT + 'menu/item/delete',
          params,
          config,
        )
        .then(res => {})
        .catch(error => console.error('Error fetching inventory total:', error))
    },
    submitForm() {
      this.deleteFood()
    },
    closeModal() {
      this.$emit('close')
    },
  },
  props: {
    foods: { type: Array },
  },
  data() {
    return {
      form: {
        food: null,
      },
    }
  },

  mounted() {},
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
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background-color: #d2ceb8;
  color: #000;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 30%;
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
  /* margin-top: 200px; */
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
