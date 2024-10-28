<template>
    <div class="a-la-carte">
        <h2>Sides</h2>
        <div class="grid">
            <button v-for="side in sides" :key="side" @click="selectItem(side)">
                {{ side }}
            </button>
        </div>

        <h2>Entrees</h2>
        <div class="grid">
            <button v-for="entree in entrees" :key="entree" @click="selectItem(entree)">
                {{ entree }}
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'; // Make sure to install axios if you haven't already

export default {
    name: 'ALaCarte',
    data() {
        return {
            sides: [],
            entrees: [],
        };
    },
    methods: {
        async fetchMenuItems() {
            try {
                const sideResponse = await axios.get('/menu/Sides');
                const entreeResponse = await axios.get('/menu/Entree');
                this.sides = sideResponse.data;
                this.entrees = entreeResponse.data;
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
.a-la-carte {
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
