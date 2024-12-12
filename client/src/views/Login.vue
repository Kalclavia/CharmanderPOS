<!--
  Login.vue
  This Vue component handles employee authentication through both employee ID input
  and Google OAuth. It validates credentials against employee records and routes
  users to appropriate interfaces based on their role.

  Key Features:
  - Dual authentication methods:
    * Employee ID input with enter key submission
    * Google OAuth integration
  - Role-based routing (manager/cashier)
  - Employee data verification
  - Session management with cookies
  
  Authentication Flow:
  1. Employee Data Loading:
     - Fetches employee records from backend
     - Maintains data in reactive state
  
  2. ID-based Authentication:
     - Validates employee ID input
     - Matches against employee database
     - Sets appropriate cookies for session
     - Routes to role-specific interface
  
  3. Google OAuth Authentication:
     - Decodes Google credentials
     - Matches email against employee records
     - Sets session cookies
     - Routes based on employee role
  
  Dependencies:
  - vue3-google-login: For Google OAuth
  - axios: API calls for employee data
  - vue-cookies: Session management
  - vue-router: Navigation control
  
  Environment Requirements:
  - VITE_API_ENDPOINT: API base URL
  
  Security Notes:
  - Uses server-side validation
  - Implements cookie-based session management
  - Separates manager/cashier access rights

  Authors: Adeeb Ismail, Abhi Bhattacharyya
  
-->

<!-- v-model: holds the variable, v-on: what to do when enter key is pressed -->
<script setup>
import { decodeCredential } from 'vue3-google-login'
import { ref } from 'vue'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import router from '../router'

const employeeData = ref([])
const inputID = ref('') // Define inputID as a reactive variable

const fetchEmployees = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + 'employees')
    employeeData.value = response.data
  } catch (error) {
    console.error('Error fetching employees:', error)
  }
}

const GoogleOAuth = async (response) => {
  try {
    const userData = decodeCredential(response.credential)
    console.log('Handle the response:', userData.email)

    // Ensure employee data is loaded
    await fetchEmployees()
    console.log(employeeData)

    // Find matching employee
    const matchingEmployee = employeeData.value.find(
      employee => employee.email === userData.email
    )

    if (matchingEmployee) {
      $cookies.set('ID', matchingEmployee.employeeid, null, '/')
      if (matchingEmployee.role === 'manager') {
        $cookies.set('role', 'manager', null, '/')
        router.push('/manager')
      } else {
        $cookies.set('role', 'cashier', null, '/')
        router.push('/cashier')
      }
    } else {
      console.error('Employee not found for this email:', userData.email)
    }
  } catch (error) {
    console.error('Error handling Google OAuth response:', error)
  }
}

// Handle ID input and route based on role
const onEnter = async () => {
  await fetchEmployees()
  const enteredID = inputID.value // Access reactive variable properly
  console.log(inputID.value)
  console.log(inputID.value == employeeData.value[1].employeeid)
  console.log("Arr length",employeeData.value.length)
  for (let i = 0; i < employeeData.value.length; i++) {
    console.log(inputID.value, employeeData.value[i].employeeid)
    if (inputID.value == employeeData.value[i].employeeid) {
      $cookies.set('ID', employeeData.value[i].employeeid, null, '/')
      if (employeeData.value[i].role === 'manager') {
        $cookies.set('role', 'manager', null, '/')
        router.push('/manager')
      } else {
        $cookies.set('role', 'cashier', null, '/')
        router.push('/cashier')
      }
      //return // Stop further iteration after matching
    }
  }
  console.error('Employee not found for this ID:', inputID.value)
}

</script>

<template>
  <div class="flex-container-login">
    <h1>ID:</h1>
    <input
      placeholder="Enter Your ID"
      v-model="inputID"
      @keyup.enter="onEnter"
    />
  </div>
  <GoogleLogin :callback="GoogleOAuth" />
</template>

<style scoped></style>
