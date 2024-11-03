<template>
  <div class="employees">
    <div class="loading" v-if="loading">Loading...</div>
    <table v-else class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.employeeid }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Employees',
  data() {
    // for data properties
    return {
      employees: [],
      loading: true,
    }
  },
  methods: {
    fetchEmployees() {
      axios
        .get('http://localhost:3000/employees')
        .then(res => ((this.employees = res.data), (this.loading = false)))
        .catch(error => console.error('Error adding new item:', error))
    },
  },
  mounted() {
    this.fetchEmployees()
  },
}
</script>
<style scoped>
.employee {
  padding: 20px;
}

.table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  background-color: #e7e4d7;
  border: 2px solid black;
  /* border-radius: 10px; */
  overflow: hidden;
  /* border-spacing: 0px; */
  box-shadow: 0 12px 12px #080808;
}

td {
  border: 2px solid black;
  text-align: center;
  font-size: 1.7vh;
  color: #000000;
  height: 50px;
}
th {
  border: 2px solid black;
  text-align: center;
  font-size: 2.2vh;
  color: #000000;
  font-weight: 900;
  height: 50px;
}

.loading {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
