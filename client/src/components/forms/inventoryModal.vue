<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal" @click.stop>
      <h2>{{ isNewItem ? 'Edit Item' : 'Add New Item' }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="id">ID:</label>
          <input type="number" v-model="form.ingredientid" disabled />
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" v-model="form.name" required />
        </div>
        <div class="form-group">
          <label for="stock">Stock:</label>
          <input type="number" v-model="form.stock" required />
        </div>
        <div class="form-group">
          <label for="maxstock">Max Stock:</label>
          <input type="number" v-model="form.maxstock" required />
        </div>
        <div class="form-group">
          <label for="unit">Unit:</label>
          <input type="text" v-model="form.units" disabled />
        </div>
        <div class="modal-actions">
          <button type="submit">{{ isNewItem ? 'Update' : 'Add' }}</button>
          <!-- <button type="button" @click="deleteItem" v-if="!isNewItem">Delete</button> -->
          <button type="button" @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'InventoryModal',
  methods: {
    async fetchLastItem() {
      await axios
        .get(import.meta.env.VITE_API_ENDPOINT + 'inventory/id')
        .then(res => {
          this.form.ingredientid = ++res.data.count
          this.loading = false
        })
        .catch(error => console.error('Error fetching inventory total:', error))
    },
    submitForm() {
      this.$emit('submit', this.form)
      this.closeModal()
    },
    deleteItem() {
      this.$emit('delete', this.form)
      this.closeModal()
    },
    closeModal() {
      this.$emit('close')
    },
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    currentItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: { ingredientid: -1, name: '', stock: 0, maxstock: 0, unit: '' },
    }
  },
  computed: {
    isNewItem() {
      return this.item && !this.item.id
    },
  },
  async mounted() {
    await this.fetchLastItem()
    if (this.item) {
      this.form = { ...this.item }
    }
  },
  // mounted() {
  //   if (this.item) {
  //     this.form = { ...this.item };
  //   }
  // },
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
</style>
