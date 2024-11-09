<template>
    <div class="alacarte">
        <h2>Sides</h2>
        <div class="grid">
            <button v-for="side in sides" :key="side" @click="toggleSides(side)"
                :class="{ selected: selectedSides.includes(side) }">
                <img v-if="getSideImage(side)" :src="getSideImage(side)" :alt="getSideName(side)" class="side-image"
                    @error="handleImageError" />
                <span>{{ getSideName(side) }}</span>
                <span v-if="selectedSides.includes(side)" class="checkmark">✓</span>
            </button>
        </div>
        <h2>Entrees</h2>
        <div class="grid">
            <button v-for="entree in entrees" :key="entree" @click="toggleEntrees(entree)"
                :class="{ selected: selectedEntrees.includes(entree) }">
                <img v-if="getEntreeImage(entree)" :src="getEntreeImage(entree)" :alt="getEntreeName(entree)"
                    class="entree-image" @error="handleImageError" />
                <span>{{ getEntreeName(entree) }}</span>
                <span v-if="selectedEntrees.includes(entree)" class="checkmark">✓</span>
            </button>
        </div>

        <!-- Add to Cart Button -->
        <button class="add-to-cart" @click="addToCart" :disabled="!canAddToCart">
            Add to Cart
        </button>
    </div>
</template>

<script>
import axios from 'axios' // Make sure to install axios if you haven't already

export default {
    name: 'ALaCarte',
    data() {
        return {
            sides: [],
            entrees: [],
            selectedSides: [],
            selectedEntrees: []
        }
    },
    computed: {
        canAddToCart() {
            return this.selectedSides.length > 0 || this.selectedEntrees.length > 0;
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
        toggleSides(side) {
            if (this.selectedSides.includes(side)) {
                this.selectedSides = this.selectedSides.filter(selected => selected !== side);
            } else {
                this.selectedSides.push(side);
            }
        },
        toggleEntrees(entree) {
            if (this.selectedEntrees.includes(entree)) {
                this.selectedEntrees = this.selectedEntrees.filter(selected => selected !== entree);
            } else {
                this.selectedEntrees.push(entree);
            }
        },
        addToCart() {
            if (this.canAddToCart) {
                // Flatten itemsToAdd array with selected sides and entrees
                const itemsToAdd = [];

                // Add each selected side
                this.selectedSides.forEach(side => {
                    itemsToAdd.push({
                        name: `Side: ${this.getSideName(side)}`,
                        price: 4.50
                    });
                });

                // Add each selected entree
                this.selectedEntrees.forEach(entree => {
                    itemsToAdd.push({
                        name: `Entree: ${this.getEntreeName(entree)}`,
                        price: 5.50
                    });
                });

                // Emit the itemsToAdd array to the cart
                this.$emit('addToCart', itemsToAdd);

                // Clear selections after adding to cart
                this.selectedSides = [];
                this.selectedEntrees = [];
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
    transition: background-color 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    /* min-height: 150px; */
    position: relative;
}

button:hover {
    background-color: #d2ceb8;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.selected {
    background-color: #d2ceb8;
    box-shadow: 0 0 0 2px #080808;
}

.checkmark {
    position: absolute;
    top: 5px;
    right: 5px;
    color: green;
    font-size: 20px;
    font-weight: bold;
}

.side-image,
.entree-image {
    width: 150px;
    height: 150px;
    object-fit: contain;
    margin-bottom: 5px;
}

.add-to-cart-container {
    max-height: min-content;
    position: fixed;
    box-shadow: 0 4px 3px #080808;
}


.add-to-cart {
    padding: 15px 15px;
    font-size: 15px;
    background-color: #4CAF50;
    color: rgb(0, 0, 0);
    border: none;
    border-radius: 10px;
    position: fixed;
    top: 45px;
    right: 145px;
    z-index: 1000;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s, box-shadow 0.3s;
    height: 30px;
    box-shadow: 0 4px 3px #080808;
}

.add-to-cart:disabled {
    background-color: #e7e4d7;
    box-shadow: 0 4px 3px #080808;
    cursor: not-allowed;
}
</style>