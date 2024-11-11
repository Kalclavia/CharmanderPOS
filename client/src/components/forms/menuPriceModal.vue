<template>
    <div class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h2>{{ 'Edit Item' }}</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="Name">Name:</label>
            <input type="text" v-model="form.type" disabled />
          </div>
          <div class="form-group">
            <label for="Price">Price:</label>
            <input type="decimal" v-model="form.price" required />
          </div>
          <div class="modal-actions">
            <button type="submit">{{ 'Update'}}</button>
            <button type="button" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'menuPriceModal',
    methods: {
      submitForm() {
        this.$emit('submit', this.form);
        this.closeModal();
      },
      deleteItem() {
        this.$emit('delete', this.form);
        this.closeModal();
      },
      closeModal() {
        this.$emit('close');
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
        form: { ...this.item  },
      };
    },
    mounted(){
        this.form = { ...this.item };
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
  
  button[type="submit"] {
    background-color: #ffffff;
    color: #000;
    border-color: #000;
  }
  
  button[type="button"] {
    background-color: #ffffff;
    color: #000;
    border-color: #000;
  }
  
  button[type="button"]:nth-child(3) {
    background-color: #ffffff;
    border-color: #000;
  }
  </style>
  