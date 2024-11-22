<template>
  <div class="appetizer">
    <h2>Pick 1 or more Appetizers</h2>
    <div class="grid">
      <button v-for="appetizer in appetizers" :key="appetizer" @click="toggleAppetizer(appetizer)"
        :class="{ selected: isSelected(appetizer) }">
        <img v-if="getAppetizerImage(appetizer)" :src="getAppetizerImage(appetizer)" :alt="getAppetizerName(appetizer)"
          class="appetizer-image" @error="handleImageError" />
        <span>{{ getAppetizerName(appetizer) }}</span>
        <span v-if="isSelected(appetizer)" class="checkmark">✓</span>
      </button>
    </div>
    <!-- Add to Cart Button -->
    <button class="add-to-cart" @click="addToCart" :disabled="!canAddToCart">
      Add to Cart
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Appetizer",
  data() {
    return {
      appetizers: [],
      selectedAppetizers: [], // List of selected appetizers
      price: null, // Single price for all appetizers
    };
  },
  computed: {
    canAddToCart() {
      return this.selectedAppetizers.length > 0;
    },
  },
  methods: {
    async fetchMenuItems() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + 'menu/Appetizer');
        this.appetizers = response.data;
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    },
    async fetchPrice() {
      try {
        const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + 'price/Appetizer');
        this.price = response.data.price; // Fetch and set the single price
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    },
    toggleAppetizer(appetizer) {
      const index = this.selectedAppetizers.indexOf(appetizer);
      if (index > -1) {
        // Remove if already selected
        this.selectedAppetizers.splice(index, 1);
      } else {
        // Add if not selected
        this.selectedAppetizers.push(appetizer);
      }
    },
    isSelected(appetizer) {
      return this.selectedAppetizers.includes(appetizer);
    },
    addToCart() {
      if (this.canAddToCart) {
        // Fetch the base item ID for "Appetizer" dynamically
        axios
          .get(import.meta.env.VITE_API_ENDPOINT + `itemid/Appetizer`)
          .then((response) => {
            const baseItemID = response.data.itemID; // Dynamically fetched base item ID

            // Process each selected appetizer
            Promise.all(
              this.selectedAppetizers.map((appetizer) =>
                axios.get(import.meta.env.VITE_API_ENDPOINT + `foodid/${encodeURIComponent(this.getAppetizerName(appetizer))}`)
              )
            )
              .then((appetizerResponses) => {
                // Construct the transactionEntries for each selected appetizer
                const transactionEntries = appetizerResponses.map((response) => {
                  const appetizerID = response.data.foodID;
                  return [baseItemID, appetizerID, 0, 0, 0];
                });

                // Prepare the item details for each selected appetizer
                const itemsToAdd = this.selectedAppetizers.map((appetizer, index) => ({
                  name: `Appetizer: ${this.getAppetizerName(appetizer)}`,
                  price: this.price,
                  transactionEntry: transactionEntries[index], // Attach transaction entry
                }));

                // Emit the selected items and their transaction entries to the parent
                this.$emit("addToCart", itemsToAdd); // Emit selected items with price and transaction entry
                this.$emit("addToTransactionCart", transactionEntries); // Emit transaction entries
                console.log('Transaction Added: ', transactionEntries);

                // Clear selections after adding to cart
                this.selectedAppetizers = [];
              })
              .catch((error) => {
                console.error("Error fetching food IDs:", error);
                alert("Cannot add to transaction cart.");
              });
          })
          .catch((error) => {
            console.error("Error fetching base item ID:", error);
            alert("Cannot fetch base item ID.");
          });
      }
    },
    getAppetizerName(appetizer) {
      return typeof appetizer === "string" ? appetizer : appetizer?.name || "Unknown Appetizer";
    },
    getAppetizerImage(appetizer) {
      const name = this.getAppetizerName(appetizer);
      if (!name) return null;
      const fileName = `${name.toLowerCase().replace(/\s+/g, "")}.png`;
      return new URL(`/src/assets/${fileName}`, import.meta.url).href;
    },
    handleImageError(event) {
      console.error("Image failed to load:", event.target.src);
      event.target.style.display = "none";
    },
  },
  mounted() {
    this.fetchMenuItems();
    this.fetchPrice();
  },
};
</script>

<style scoped>
.appetizer {
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

.appetizer-image {
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
  bottom: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: red;
  font-size: 24px;
  cursor: pointer;
}

.close-button:hover {
  color: darkred;
  background-color: transparent !important;
  box-shadow: none !important;
}

.size-tag {
  margin-left: 5px;
  padding: 2px 6px;
  background-color: #4CAF50;
  color: white;
  font-size: 12px;
  border-radius: 12px;
}
</style>