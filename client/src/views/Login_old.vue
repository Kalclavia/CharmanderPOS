<!-- v-model: holds the variable, v-on: what to do when enter key is pressed -->
<script setup>
// import { decodeCredential } from 'vue3-google-login'

  const GoogleOAuth = (response) => {
    const userData = decodeCredential(response.credential)
    console.log("Handle the response", userData.email)
  }
</script>

<template>
  <div class="flex-container-login">
    <h1>ID:</h1>
    <input
      placeholder="Enter Your ID"
      v-model="inputID"
      v-on:keyup.enter="onEnter"
    />
  </div>
  <GoogleLogin :callback="GoogleOAuth"/>
</template>

<script>
import '../assets/login.css'
import axios from 'axios'
// import { decodeCredential } from 'vue3-google-login'

export default {
  name: 'App',
  data() {
    return {
      employeeData: [],
      inputID: '',
    }
  },
  methods: {
    fetchEmployees() {
      axios
        .get(import.meta.env.VITE_API_ENDPOINT + 'employees')
        .then(res => {
          this.employeeData = res.data
        })
        .catch(error => console.log(error))
    },
    onEnter() {
      for (var i = 0; i < this.employeeData.length; i++) {
        if (this.inputID == this.employeeData[i].employeeid) {
          if (this.employeeData[i].role == 'manager') {
            $cookies.set('role', 'manager', null, '/')
            $cookies.set('ID', this.employeeData[i].employeeid, null, '/')
            this.$router.push('/manager')
          } else {
            $cookies.set('role', 'cashier', null, '/')
            $cookies.set('ID', this.employeeData[i].employeeid, null, '/')
            this.$router.push('/cashier')
          }
        }
      }
    },
  },
  mounted() {
    this.fetchEmployees()
  },
}
</script>

<style scoped></style>

