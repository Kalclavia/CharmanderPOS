<template>
    <div class="alacarte">
        <h2>Sides</h2>
        <div class="grid">
            <button v-for="side in sides" :key="side" @click="selectItem(side)">
                <img 
                    v-if="getSideImage(side)"
                    :src="getSideImage(side)"
                    :alt="getSideName(side)"
                    class="side-image"
                    @error="handleImageError"
                />
                <span>{{ getSideName(side) }}</span>
            </button>
        </div>
        <h2>Entrees</h2>
        <div class="grid">
            <button v-for="entree in entrees" :key="entree" @click="selectItem(entree)">
                <img 
                    v-if="getEntreeImage(entree)"
                    :src="getEntreeImage(entree)"
                    :alt="getEntreeName(entree)"
                    class="entree-image"
                    @error="handleImageError"
                />
                <span>{{ getEntreeName(entree) }}</span>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios' // Make sure to install axios if you haven't already

export default {
    name: 'ALaCarte',
    data() {
        return {
            sides: [],
            entrees: []
        }
    },
    methods: {
        async fetchMenuItems() {
            try {
                const sideResponse = await axios.get(
                    'http://localhost:3000/menu/Side',
                )
                const entreeResponse = await axios.get(
                    'http://localhost:3000/menu/Entree',
                )
                this.sides = sideResponse.data
                this.entrees = entreeResponse.data
                console.log(this.sides)
                console.log(this.entrees)
            } catch (error) {
                console.error('Error fetching menu items:', error)
            }
        },
        selectItem(item) {
            console.log(item)
            this.$emit('selectItem', item) // Emit selected item to the parent
        },
        getSideName(side) {
            if (typeof side === 'string') {
                return side
            } 
            else if (side && side.name) {
                return side.name
            }
            
            return 'Unknown Side'
        },
        getSideImage(side) {
            let name = this.getSideName(side)
            if (!name) return null
            const fileName = `${name.toLowerCase().replace(/\s+/g, '')}.png`
            const imagePath = `/src/assets/${fileName}`
            console.log('Image path:', imagePath)
            return imagePath
        },
        getEntreeName(entree) {
            if (typeof entree === 'string') {
                return entree
            } 
            else if (entree && entree.name) {
                return entree.name
            }
            
            return 'Unknown Entree'
        },
        getEntreeImage(entree) {
            let name = this.getEntreeName(entree)
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
        this.fetchMenuItems() // Fetch menu items when the component mounts
    },
}
</script>

<style scoped>
.alacarte {
    padding: 20px;

}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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

.side-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 5px;
}

.entree-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 5px;
}

</style>