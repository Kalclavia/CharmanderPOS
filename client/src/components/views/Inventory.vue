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
            <button @click="openModal('update', item)">Update</button>
            <button @click="deleteItem(item.ingredientid)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="openModal('add')">Add Item</button>

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
import axios from 'axios';
import inventoryModal from '../forms/inventoryModal.vue';

export default {
  name: 'Inventory',
  components: {
    inventoryModal,
  },
  data() {
    return {
      items: [],
      total : -1,
      loading: true,
      showModal: false,
      modalMode: 'add',
      selectedItem: null,
    };
  },
  methods: {
    fetchLastItem() {
      axios.get('http://localhost:3000/inventory/id')
        .then(res => {
          this.total = ++res.data.count;
          this.loading = false;
        })
        .catch(error => console.error('Error fetching inventory total:', error));
    },
    fetchItems() {
      axios.get('http://localhost:3000/inventory')
        .then(res => {
          this.items = res.data;
          this.loading = false;
        })
        .catch(error => console.error('Error fetching inventory items:', error));
    },
    openModal(mode, item = null) {
      this.modalMode = mode;
      this.selectedItem = item;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedItem = null;
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
      if(form.ingredientid === this.total){
        //adding new item
        axios
        .post('http://localhost:3000/inventory/add', params, config)
        .then(() => this.fetchItems())
        .catch(error => console.error('Error adding new item:', error))
        console.log('Added new item')
      }
      else{
        //updating item
        axios
        .patch('http://localhost:3000/inventory/updateStock', params, config)
        //.then(() => this.fetchItems())
        .catch(error => console.error('Error updating stock:', error))
        axios
        .patch('http://localhost:3000/inventory/updateMaxStock', params, config)
        //.then(() => this.fetchItems())
        .catch(error => console.error('Error updating max stock:', error))
        axios
        .patch('http://localhost:3000/inventory/updateName', params, config)
        .then(() => this.fetchItems())
        .catch(error => console.error('Error updating name:', error))

        console.log('updated item:',form.ingredientid)
      }
      this.closeModal();
    },
    deleteItem(ingredientid){
      axios
          .delete('http://localhost:3000/inventory/delete/' + ingredientid)
          .then(() => this.fetchItems())
          .catch(error => console.error('Error deleting item:', error))
    }
  },
  mounted() {
    this.fetchItems();
    this.fetchLastItem();
  },
};
</script>

<style scoped>
.inventory {
  padding: 20px;
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
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
