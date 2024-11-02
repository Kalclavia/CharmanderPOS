<template>
  <div class="employees">
    <!-- <div class="grid">
      <div v-if="loading">Loading...</div>
      <div v-for="employee in employees">{{ employee }}</div>
    </div> -->
    <table class="table">
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
  width: 100%;
  margin-top: 20px;
  padding: 20px;
}

td {
  border: 2px solid #dddddd;
  padding: 4px;
  text-align: center;
  font-size: 1.7vh;
}
th {
  border: 2px solid #dddddd;
  padding: 4px;
  text-align: center;
  font-size: 2vh;
}
</style>
