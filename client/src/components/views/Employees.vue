<template>
  <div class="employees">
    <div v-if="loading" class="loading">Loading...</div>
    <table v-else class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
          <th>Fired</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <!-- <td>{{ employee.employeeid }}</td> -->
          <td>
            <button class="td-button" @click="updateEmployee(employee)">
              {{ employee.employeeid }}
            </button>
          </td>
          <td>
            <button class="td-button" @click="updateEmployee(employee)">
              {{ employee.name }}
            </button>
          </td>
          <td>
            <button class="td-button" @click="updateEmployee(employee)">
              {{ employee.role }}
            </button>
          </td>
          <td>
            <button class="td-button" @click="updateEmployee(employee)">
              {{ employee.isfired }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <transition name="modal">
    <div
      v-if="showEmployeeForm"
      class="modal-overlay"
      @click="toggleEmployeeForm"
    >
      <div class="modal" @click.stop>
        <EmployeeForm
          :employee="selectedEmployee"
          @close="toggleEmployeeForm"
          @submit="handleUpdateEmployee"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import EmployeeForm from '../forms/employeeModal.vue'
export default {
  name: 'Employees',
  components: {
    EmployeeForm,
  },
  data() {
    return {
      employees: [],
      loading: true,
      showEmployeeForm: false,
      selectedEmployee: null,
    }
  },
  methods: {
    fetchEmployees() {
      axios
        .get('http://localhost:3000/employees')
        .then(res => ((this.employees = res.data), (this.loading = false)))
        .catch(error => console.error('Error adding new item:', error))
    },
    updateEmployee(employee) {
      this.selectedEmployee = employee
      this.showEmployeeForm = !this.showEmployeeForm
    },
    addEmployee() {
      console.log('helo')
    },
    toggleEmployeeForm() {
      this.showEmployeeForm = !this.showEmployeeForm
    },
    handleUpdateEmployee(form) {
      const params = new URLSearchParams()
      params.append('employeeid', form.employeeid)
      params.append('name', form.name)
      params.append('role', form.role)
      params.append('isfired', form.isfired)
      console.log(params.get('isfired'))
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      if (
        params.get('name') != 'undefined' &&
        params.get('employeeid') != 'undefined'
      ) {
        axios
          .patch('http://localhost:3000/employees/updateName', params, config)
          .catch(error => console.error('Error updating employee name:', error))
        axios
          .patch('http://localhost:3000/employees/updateRole', params, config)
          .catch(error => console.error('Error updating employee role:', error))
        axios
          .patch('http://localhost:3000/employees/updateFired', params, config)
          .then(res => this.fetchEmployees(), this.toggleEmployeeForm())
          .catch(error =>
            console.error('Error updating employee fired status:', error),
          )
      }
    },
  },
  mounted() {
    this.fetchEmployees()
  },
}
</script>
<style scoped>
.modal-overlay {
  border: 1.5px solid black;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  border: 1.5px solid black;

  background: #e7e4d7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  z-index: 1001;
  height: 40vh;
  color: black;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.employee {
  padding: 20px;
}

.table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  background-color: #e7e4d7;
  border: 1.5px solid black;
  border-spacing: 0px;
  box-shadow: 0 12px 12px #080808;
}

td {
  border: 1.5px solid black;
  text-align: center;
  /* font-size: 1.7vh; */
  color: #000000;
  height: 50px;
  padding: 0;
}
th {
  border: 1.5px solid black;
  text-align: center;
  /* font-size: 2.2vh; */
  color: #000000;
  font-weight: 900;
  height: 50px;
  padding: 0;
}

.loading {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.td-button {
  border: #000000;
  background-color: #e7e4d7;
  color: black;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  width: 100%;
  height: 100%;
}

.td-button:hover {
  background-color: #d2ceb8;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}
</style>
