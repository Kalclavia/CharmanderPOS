<template>
    <div class="plate">
        <h2>Pick 1 Side</h2>
        <div class="grid">
            <button v-for="side in sides" :key="side" @click="selectItem(side)">
                {{ side }}
            </button>
        </div>
        <h2>Pick 2 Entrees</h2>
        <div class="grid">
            <button v-for="entree in entrees" :key="entree" @click="selectItem(entree)">
                {{ entree }}
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios' // Make sure to install axios if you haven't already

export default {
    name: 'Plate',
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
    },
    mounted() {
        this.fetchMenuItems() // Fetch menu items when the component mounts
    },
}
</script>

<style scoped>
.plate {
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
}

button:hover {
    background-color: #d2ceb8;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>