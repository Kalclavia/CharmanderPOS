<template>
    <div class="user-info-page">
        <h2>Please Enter Your Details</h2>

        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" placeholder="Enter your name" />

        <label for="phone">Phone Number:</label>
        <input type="text" id="phone" v-model="phone" placeholder="(XXX) XXX - XXXX" @input="formatPhone" />

        <div class="bottom-buttons">
            <button @click="cancel" class="cancel-button">Cancel</button>
            <button @click="confirm" class="confirm-button">Confirm</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() { 
        return {
            name: '',
            phone: '',
        };
    },
    methods: {
        formatPhone() {
            let cleaned = this.phone.replace(/\D/g, '');
            if (cleaned.length <= 3) {
                this.phone = `(${cleaned}`;
            } else if (cleaned.length <= 6) {
                this.phone = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
            } else if (cleaned.length <= 10) {
                this.phone = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} - ${cleaned.slice(6)}`;
            } else {
                this.phone = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} - ${cleaned.slice(6, 10)}`;
            }
        },
        cancel() {
            this.$emit('cancelUserInfo');
        },
        async confirm() {
            if (!this.name || !this.phone) {
                alert('Please fill in both fields.');
                return;
            }
            const transactionIDResponse = await axios.get(
                import.meta.env.VITE_API_ENDPOINT + 'transactions/latestID',
            )

            // Send orcer confirmation text message
            const textResponse = await axios.post(
              "https://textbelt.com/text",
              {
                phone: this.phone,
                message: `Hello ${this.name}, your order has been successfully placed! Your order number is ${transactionIDResponse.data.transactionID}. Thank you for eating at Panda Express!`,
                key: "f84938f5684e8a6ec708fbb407bbf59709290d89M8miZnjZlDrtq91BeYxoqU0Pb",
              }
            );
            console.log("Text reponse:")
            console.log(textResponse)
            // Emit order details to parent, including transactionId from props
            this.$emit('completeOrder');

        },
    },
};
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
    font-size: 24px;
    margin-bottom: 20px;
}

label {
    font-size: 16px;
    margin-top: 10px;
}

input {
    padding: 8px;
    font-size: 16px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.bottom-buttons {
    display: flex;
    gap: 20px;
}

.cancel-button,
.confirm-button {
    padding: 10px 20px;
    font-size: 16px;
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