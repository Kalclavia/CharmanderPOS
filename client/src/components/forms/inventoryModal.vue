<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal">
        <h2 v-if="mode === 'add'">Add Item</h2>
        <h2 v-else-if="mode === 'update'">Update Item</h2>
        <h2 v-else-if="mode === 'delete'">Delete Item</h2>
  
        <form @submit.prevent="handleSubmit">
          <div v-if="mode !== 'delete'">
            <label>
              Name:
              <input v-model="form.name" required />
            </label>
            <label>
              Stock:
              <input v-model.number="form.stock" type="number" required />
            </label>
            <label>
              Max Stock:
              <input v-model.number="form.maxstock" type="number" required />
            </label>
            <label>
              Unit:
              <input v-model="form.unit" required />
            </label>
          </div>
  
          <div v-if="mode === 'delete'">
            <p>Are you sure you want to delete this item?</p>
          </div>
  
          <button type="submit">{{ mode === 'delete' ? 'Confirm' : 'Submit' }}</button>
          <button type="button" @click="close">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InventoryModal',
    props: {
      mode: {
        type: String,
        required: true,
      },
      item: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        form: {
          id: this.item ? this.item.id : '',
          name: this.item ? this.item.name : '',
          stock: this.item ? this.item.stock : 0,
          maxstock: this.item ? this.item.maxstock : 0,
          unit: this.item ? this.item.unit : '',
        },
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      handleSubmit() {
        const action = this.mode === 'add' ? 'add' : this.mode === 'update' ? 'update' : 'delete';
        this.$emit('submit', { action, item: this.form });
        this.close();
      },
    },
    watch: {
      item(newItem) {
        if (newItem) {
          this.form = { ...newItem };
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 10px;
  }
  
  button {
    margin-top: 10px;
  }
  </style>
  