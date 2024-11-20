<template>
  <div class="inventory">
    <div v-if="loading" class="loading">Loading...</div>
    <table v-else class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Stock</th>
          <th>Max Stock</th>
          <th>Unit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.ingredientid }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.stock }}</td>
          <td>{{ item.maxstock }}</td>
          <td>{{ item.units }}</td>
          <td>
            <div class="buttons">
              <button @click="openModal('update', item)">Update</button>
              <button @click="deleteItem(item.ingredientid)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="buttons2">
      <button class="button2" @click="openModal('add')">Add Item</button>
    </div>

    <inventoryModal
      v-if="showModal"
      :mode="modalMode"
      :current-items="items"
      :item="selectedItem"
      @close="closeModal"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script>
import axios from 'axios'
import inventoryModal from '../forms/inventoryModal.vue'

export default {
  name: 'Inventory',
  components: {
    inventoryModal,
  },
  data() {
    return {
      items: [],
      total: -1,
      loading: true,
      showModal: false,
      modalMode: 'add',
      selectedItem: null,
    }
  },
  methods: {
    fetchLastItem() {
      axios
        .get(import.meta.env.VITE_API_ENDPOINT + 'inventory/id')
        .then(res => {
          this.total = ++res.data.count
          this.loading = false
        })
        .catch(error => console.error('Error fetching inventory total:', error))
    },
    fetchItems() {
      axios
        .get(import.meta.env.VITE_API_ENDPOINT + 'inventory')
        .then(res => {
          this.items = res.data
          this.loading = false
        })
        .catch(error => console.error('Error fetching inventory items:', error))
    },
    openModal(mode, item = null) {
      this.modalMode = mode
      this.selectedItem = item
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedItem = null
    },
    handleFormSubmit(form) {
      const params = new URLSearchParams()
      params.append('ingredientid', form.ingredientid)
      params.append('name', form.name)
      params.append('stock', form.stock)
      params.append('maxstock', form.maxstock)
      params.append('units', form.units)

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      console.log('lastid:', this.total)
      if (form.ingredientid === this.total) {
        //adding new item
        axios
          .post(
            import.meta.env.VITE_API_ENDPOINT + 'inventory/add',
            params,
            config,
          )
          .then(() => this.fetchItems())
          .catch(error => console.error('Error adding new item:', error))
        console.log('Added new item')
      } else {
        //updating item
        axios
          .patch(
            import.meta.env.VITE_API_ENDPOINT + 'inventory/updateStock',
            params,
            config,
          )
          //.then(() => this.fetchItems())
          .catch(error => console.error('Error updating stock:', error))
        axios
          .patch(
            import.meta.env.VITE_API_ENDPOINT + 'inventory/updateMaxStock',
            params,
            config,
          )
          //.then(() => this.fetchItems())
          .catch(error => console.error('Error updating max stock:', error))
        axios
          .patch(
            import.meta.env.VITE_API_ENDPOINT + 'inventory/updateName',
            params,
            config,
          )
          .then(() => this.fetchItems())
          .catch(error => console.error('Error updating name:', error))

        console.log('updated item:', form.ingredientid)
      }
      this.closeModal()
    },
    deleteItem(ingredientid) {
      if (confirm('Are you sure you want to delete this item?')) {
        axios
          .delete(
            import.meta.env.VITE_API_ENDPOINT +
              'inventory/delete/' +
              ingredientid,
          )
          .then(() => this.fetchItems())
          .catch(error => console.error('Error deleting item:', error))
      }
    },
  },
  mounted() {
    this.fetchItems()
    this.fetchLastItem()
  },
}
</script>

<style scoped>
.inventory {
  padding: 20px;
}

.buttons {
  display: flex;
  justify-content: space-evenly;
}

.buttons2 {
  display: flex;
  justify-content: space-around;
  padding-top: 15px;
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
button {
  /* margin: 5px;
  padding: 5px 10px;
  cursor: pointer; */
  border: 2px solid #080808;
  border-radius: 30px;
  background-color: #e7e4d7;
  color: #080808;
  font: Arial;
  padding: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 4px 3px #080808;
}

.button2 {
  /* margin: 5px;
  padding: 5px 10px;
  cursor: pointer; */
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
  background-color: #cfcbb7;
}

.flex-button {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 20px;
}
</style>
