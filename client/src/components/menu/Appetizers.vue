<template>
  <div class="appetizer">
    <h2>Appetizers</h2>
    <div class="grid">
      <button
        v-for="(appetizer, index) in appetizers"
        :key="appetizer"
        @click="selectItem(appetizer)"
      >
        <img 
          v-if="getAppetizerImage(appetizer)"
          :src="getAppetizerImage(appetizer)"
          :alt="getAppetizerName(appetizer)"
          class="appetizer-image"
          @error="handleImageError"
        />
        <span>{{ getAppetizerName(appetizer) }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Appetizer',
  data() {
    return {
      appetizers: [],
    }
  },
  methods: {
    async fetchMenuItems() {
      try {
        const appetizerResponse = await axios.get(
          'http://localhost:3000/menu/Appetizer',
        )
        this.appetizers = appetizerResponse.data
        console.log('Fetched appetizers:', this.appetizers)
      } catch (error) {
        console.error('Error fetching menu items:', error)
      }
    },
    selectItem(item) {
      console.log('Selected item:', item)
      this.$emit('selectItem', item)
    },
    getAppetizerName(appetizer) {
      if (typeof appetizer === 'string') {
        return appetizer
      } else if (appetizer && appetizer.name) {
        return appetizer.name
      }
      return 'Unknown Appetizer'
    },
    getAppetizerImage(appetizer) {
      let name = this.getAppetizerName(appetizer)
      if (!name) return null
      const fileName = `${name.toLowerCase().replace(/\s+/g, '')}.png`
      const imagePath = `/src/assets/${fileName}`
      console.log('Image path:', imagePath)
      return imagePath
    },
    handleImageError(event) {
      console.error('Image failed to load:', event.target.src)
      event.target.style.display = 'none'
    }
  },
  mounted() {
    this.fetchMenuItems()
  },
}
</script>

<style scoped>
/* Your existing styles here */
</style>


<style scoped>
.appetizer {
  padding: 20px;
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
  background-color: #e7e4d7;
  color: black;
  padding: 10px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
    
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  min-height: 150px;
}

button:hover {
  background-color: #d2ceb8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.appetizer-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 5px;
}
</style>
