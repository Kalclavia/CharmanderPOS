<template>
    <div class="alacarte">
        <h2>Sides</h2>
        <div class="grid">
            <button v-for="side in sides" :key="side.name" @click="toggleSides(side)"
                :class="{ selected: isSelected(side, 'side') }">
                <img v-if="getSideImage(side)" :src="getSideImage(side)" :alt="getSideName(side)" class="side-image"
                    @error="handleImageError" />
                <span>{{ getSideName(side) }}</span>
                <span v-if="isSelected(side, 'side')" class="checkmark">✓</span>
            </button>
        </div>

        <h2>Entrees</h2>
        <div class="grid">
            <button v-for="entree in entrees" :key="entree.name" @click="toggleEntrees(entree)"
                :class="{ selected: isSelected(entree, 'entree') }">
                <img v-if="getEntreeImage(entree)" :src="getEntreeImage(entree)" :alt="getEntreeName(entree)"
                    class="entree-image" @error="handleImageError" />
                <span>{{ getEntreeName(entree) }}</span>
                <span v-if="isSelected(entree, 'entree')" class="checkmark">✓</span>
            </button>
        </div>

        <!-- Size Selection Modal -->
        <div v-if="showSizeModal" class="size-modal">
            <h3 class="modal-title">Select Size for {{ currentItemType === 'side' ? getSideName(currentItem) :
                getEntreeName(currentItem) }}</h3>
            <div v-if="currentItemType === 'side'">
                <button v-for="size in sizeOptions.side" :key="size.name" @click="selectSize(size, 'side')">
                    {{ size.name }} - ${{ size.price.toFixed(2) }}
                </button>
            </div>
            <div v-else>
                <button v-for="size in sizeOptions.entree" :key="size.name" @click="selectSize(size, 'entree')">
                    {{ size.name }} - ${{ size.price.toFixed(2) }}
                </button>
            </div>
            <button @click="cancelSizeSelection" class="close-button">✖</button>
        </div>

        <!-- Add to Cart Button -->
        <button class="add-to-cart" @click="addToCart" :disabled="!canAddToCart">
            Add to Cart
        </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ALaCarte',
    data() {
        return {
            sides: [],
            entrees: [],
            selectedSides: [],
            selectedEntrees: [],
            showSizeModal: false,
            currentItem: null,
            currentItemType: null,
            sizeOptions: {
                side: [
                    { name: 'Medium', price: 4.40 },
                    { name: 'Large', price: 5.40 }
                ],
                entree: [
                    { name: 'Small', price: 5.20 },
                    { name: 'Medium', price: 8.50 },
                    { name: 'Large', price: 11.20 }
                ]
            }
        };
    },
    computed: {
        canAddToCart() {
            return this.selectedSides.length > 0 || this.selectedEntrees.length > 0;
        }
    },
    methods: {
        async fetchMenuItems() {
            try {
                const sideResponse = await axios.get(import.meta.env.VITE_API_ENDPOINT + 'menu/Side');
                const entreeResponse = await axios.get(import.meta.env.VITE_API_ENDPOINT + 'menu/Entree');
                this.sides = sideResponse.data;
                this.entrees = entreeResponse.data;
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        },
        toggleSides(side) {
            this.currentItem = side;
            this.currentItemType = 'side';
            this.showSizeModal = true;
        },
        toggleEntrees(entree) {
            this.currentItem = entree;
            this.currentItemType = 'entree';
            this.showSizeModal = true;
        },
        isSelected(item, type) {
            const selectedList = type === 'side' ? this.selectedSides : this.selectedEntrees;
            return selectedList.some(selected => selected.name.includes(this.getSideName(item) || this.getEntreeName(item)));
        },
        selectSize(size, type) {
            const itemToAdd = {
                name: `${type === 'side' ? 'Side' : 'Entree'}: ${type === 'side' ? this.getSideName(this.currentItem) : this.getEntreeName(this.currentItem)} (${size.name})`,
                price: size.price
            };

            if (type === 'side') {
                this.selectedSides.push(itemToAdd); // Adds the selected item with size to selectedSides
            } else {
                this.selectedEntrees.push(itemToAdd); // Adds the selected item with size to selectedEntrees
            }

            this.showSizeModal = false;
            this.currentItem = null;
            this.currentItemType = null; // Reset currentItemType after selection
        },

        cancelSizeSelection() {
            this.showSizeModal = false;
            this.currentItem = null;
        },
        addToCart() {
            if (this.canAddToCart) {
                const itemsToAdd = [...this.selectedSides, ...this.selectedEntrees];

                // Emit the itemsToAdd array to the cart
                this.$emit('addToCart', itemsToAdd);

                // Clear selections after adding to cart
                this.selectedSides = [];
                this.selectedEntrees = [];
            }
        },
        getSideName(side) {
            return typeof side === 'string' ? side : (side && side.name ? side.name : 'Unknown Side');
        },
        getSideImage(side) {
            let name = this.getSideName(side);
            if (!name) return null;
            const fileName = `${name.toLowerCase().replace(/\s+/g, '')}.png`;
            return new URL(`/src/assets/${fileName}`, import.meta.url).href;
        },
        getEntreeName(entree) {
            return typeof entree === 'string' ? entree : (entree && entree.name ? entree.name : 'Unknown Entree');
        },
        getEntreeImage(entree) {
            let name = this.getEntreeName(entree);
            if (!name) return null;
            const fileName = `${name.toLowerCase().replace(/\s+/g, '')}.png`;
            return new URL(`/src/assets/${fileName}`, import.meta.url).href;
        },
        handleImageError(event) {
            console.error('Image failed to load:', event.target.src);
            event.target.style.display = 'none';
        }
    },
    mounted() {
        this.fetchMenuItems(); // Fetch menu items when the component mounts
    }
};
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

.size-modal {
    position: fixed;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    z-index: 1001;
    color: #080808;
}

.size-modal button {
    margin: 5px;
    padding: 10px;
}

.close-button {
    position: absolute;
    /* Positioning relative to the modal */
    bottom: 10px;
    /* Adjust as needed */
    right: 10px;
    /* Adjust as needed */
    background-color: transparent;
    /* No background */
    border: none;
    /* No border */
    color: red;
    /* Red color for the X */
    font-size: 24px;
    /* Adjust font size as needed */
    cursor: pointer;
    /* Change cursor to pointer */
}

.close-button:hover {
    color: darkred;
    /* Change color on hover for better UX */
    background-color: transparent !important;
    box-shadow: none !important;


}
</style>