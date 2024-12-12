<!--
  UserInfoForm.vue
  This Vue component handles user information collection for order processing.
  It provides a form for name and phone number input with real-time phone number formatting
  and order confirmation functionality.

  Key Features:
  - Real-time phone number formatting with standardized pattern (XXX) XXX - XXXX
  - Input validation for required fields
  - Order confirmation with transaction ID generation
  - SMS notification capability (currently disabled)
  - Responsive form layout
  
  Props:
  - None
  
  Emits:
  - cancelUserInfo: When user cancels the form
  - completeOrder: When order is successfully processed
  
  Dependencies:
  - axios: For API calls to transaction service
  - VITE_API_ENDPOINT environment variable
  
  API Integration:
  - Fetches transaction IDs from backend
  - Optional SMS integration (commented out)
  
  Styling:
  - Fixed positioning with specific offsets
  - Responsive form controls
  - Color-coded action buttons
  - Hover state animations

  Authors: Jensyn Huynh, Abhi Bhattacharyya
-->

<template>
  <div class="user-info-page">
    <h2>Please Enter Your Details</h2>

    <label for="name">Name:</label>
    <input type="text" id="name" v-model="name" placeholder="Enter your name" />

    <label for="phone">Phone Number:</label>
    <input
      type="text"
      id="phone"
      v-model="phone"
      placeholder="(XXX) XXX - XXXX"
      @input="formatPhone"
    />

    <div class="bottom-buttons">
      <button @click="cancel" class="cancel-button">Cancel</button>
      <button @click="confirm" class="confirm-button">Confirm</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  // Component state
  data() {
    return {
      name: '',         // Stores user's name
      phone: '',        // Stores formatted phone number
    }
  },

  methods: {
    // Formats phone number as user types
    // Transforms raw input into (XXX) XXX - XXXX format
    formatPhone() {
      let cleaned = this.phone.replace(/\D/g, '')  // Remove non-digits
      if (cleaned.length <= 3) {
        this.phone = `(${cleaned}`
      } else if (cleaned.length <= 6) {
        this.phone = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
      } else if (cleaned.length <= 10) {
        this.phone = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} - ${cleaned.slice(6)}`
      } else {
        this.phone = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} - ${cleaned.slice(6, 10)}`
      }
    },

    // Emits cancel event to parent
    cancel() {
      this.$emit('cancelUserInfo')
    },

    // Validates input and processes order confirmation
    async confirm() {
      // Input validation
      if (!this.name || !this.phone) {
        alert('Please fill in both fields.')
        return
      }

      // Get latest transaction ID
      const transactionIDResponse = await axios.get(
        import.meta.env.VITE_API_ENDPOINT + 'transactions/latestID',
      )

      // SMS functionality commented out but preserved for future use
      // const textResponse = await axios.post('https://textbelt.com/text', {
      //   phone: this.phone,
      //   message: `Hello ${this.name}, your order has been successfully placed! Your order number is ${transactionIDResponse.data.transactionID}. Thank you for eating at Panda Express!`,
      //   key: 'f84938f5684e8a6ec708fbb407bbf59709290d89M8miZnjZlDrtq91BeYxoqU0Pb',
      // })
      // console.log('Text reponse:')
      // console.log(textResponse)

      // Emit completion event to parent
      this.$emit('completeOrder')
    },
  },
}
</script>

<style scoped>
.user-info-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  position: fixed;
  top: 240px;
  left: 450px;
  right: 0;
  bottom: 0;
  color: #e7e4d7;
  overflow-y: auto;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  margin-top: 10px;
}

input {
  padding: 8px;
  font-size: 1.5em;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.user-info-page label {
  font-size: 1.5em;
}

.bottom-buttons {
  display: flex;
  gap: 20px;
}

.cancel-button,
.confirm-button {
  padding: 10px 20px;
  font-size: 1.5em;
  font-weight: bold;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button {
  background-color: #d9534f;
}

.confirm-button {
  background-color: #5cb85c;
}

.cancel-button:hover {
  background-color: #c9302c;
}

.confirm-button:hover {
  background-color: #4cae4c;
}
</style>
