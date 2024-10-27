<template>
  <div class="appetizer">
      <h2>Appetizers</h2>
      <div class="grid">
          <button v-for="appetizer in appetizers" :key="appetizer" @click="selectItem(appetizer)">
              {{ appetizer }}
          </button>
      </div>  
  </div>
</template>

<script>
import axios from 'axios'; // Make sure to install axios if you haven't already

export default {
  name: 'Appetizer',
  data() {
      return {
          appetizers: []
      };
  },
  methods: {
      async fetchMenuItems() {
          try {
              const appetizerResponse = await axios.get('/menu/Appetizers');
              this.appetizers = appetizerResponse.data;
          } catch (error) {
              console.error('Error fetching menu items:', error);
          }
      },
      selectItem(item) {
          this.$emit('selectItem', item); // Emit selected item to the parent
      }
  },
  mounted() {
      this.fetchMenuItems(); // Fetch menu items when the component mounts
  },
};
</script>

<style scoped>
.appetizer {
  padding: 20px;
  /* Padding around the content */
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-bottom: 20px;
}

button {
  border: 2px solid black;
  border-radius: 10px;
  background-color: #007bff;
  color: white;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

button:hover {
  background-color: #0056b3;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>
