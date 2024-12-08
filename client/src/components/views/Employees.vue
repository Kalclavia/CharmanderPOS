<!--
  Employees.vue
  This Vue component displays a list of employees and allows for adding, updating, and viewing details of employees. It also separates and displays a list of fired employees.
-->

<template>
  <div class="employees">
    <div v-if="loading" class="loading">Loading...</div>
    <table v-else class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
          <!-- <th>Fired</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td v-if="employee.isfired == false">
            <button class="td-button" @click="updateEmployee(employee)">
              {{ employee.employeeid }}
            </button>
          </td>
          <td v-if="employee.isfired == false">
            <button class="td-button" @click="updateEmployee(employee)">
              {{ employee.name }}
            </button>
          </td>
          <td v-if="employee.isfired == false">
            <button class="td-button" @click="updateEmployee(employee)">
              {{ employee.role }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex-button">
      <button class="add-employee" @click="addEmployee()">Add Employee</button>
    </div>
    <h2 v-if="firedEmployees.length != 0" class="text">Fired Employees</h2>
    <table class="table" v-if="firedEmployees.length != 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Role</th>
          <!-- <th>Fired</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in firedEmployees" :key="employee.id">
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
      firedEmployees: [],
      loading: true,
      showEmployeeForm: false,
      selectedEmployee: null,
    }
  },
  methods: {
    fetchEmployees() {
      axios
        .get(import.meta.env.VITE_API_ENDPOINT + 'employees')
        .then(res => (this.employees = res.data))
        .catch(error => console.error('Error adding new item:', error))
      axios
        .get(import.meta.env.VITE_API_ENDPOINT + 'employees/getFired')
        .then(res => ((this.firedEmployees = res.data), (this.loading = false)))
        .catch(error => console.error('Error adding new item:', error))
    },
    updateEmployee(employee) {
      this.selectedEmployee = employee
      this.showEmployeeForm = !this.showEmployeeForm
    },
    addEmployee() {
      this.selectedEmployee = null
      this.showEmployeeForm = !this.showEmployeeForm
    },
    toggleEmployeeForm() {
      this.showEmployeeForm = !this.showEmployeeForm
    },
    // addNewEmployee(form) {
    //   console.log('hello')
    //   const params = new URLSearchParams()
    //   params.append('name', form.name)
    //   params.append('role', form.role)
    //   params.append('isfired', form.isfired)
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   }
    //   if (
    //     params.get('name') != 'undefined' &&
    //     params.get('employeeid') != 'undefined'
    //   ) {
    //     axios
    //       .post(import.meta.env.VITE_API_ENDPOINT + 'employees/add', params, config)
    //       .then(res => {
    //         this.fetchEmployees()
    //         this.toggleEmployeeForm()
    //       })
    //       .catch(error => {
    //         console.error('Error adding new employee:', error)
    //       })
    //   }
    // },
    handleUpdateEmployee(form) {
      const params = new URLSearchParams()
      params.append('employeeid', form.employeeid)
      params.append('name', form.name)
      params.append('role', form.role)
      params.append('isfired', form.isfired)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
      if (
        params.get('name') != 'undefined' &&
        params.get('employeeid') != 'undefined'
      ) {
        console.log(form.newemployee)
        if (form.newemployee == true) {
          axios
            .post(
              import.meta.env.VITE_API_ENDPOINT + 'employees/add',
              params,
              config,
            )
            .then(res => this.fetchEmployees(), this.toggleEmployeeForm())
            .catch(error => console.error('Error adding employee', error))
        } else {
          axios
            .patch(
              import.meta.env.VITE_API_ENDPOINT + 'employees/updateName',
              params,
              config,
            )
            .catch(error =>
              console.error('Error updating employee name:', error),
            )
          axios
            .patch(
              import.meta.env.VITE_API_ENDPOINT + 'employees/updateRole',
              params,
              config,
            )
            .catch(error =>
              console.error('Error updating employee role:', error),
            )
          axios
            .patch(
              import.meta.env.VITE_API_ENDPOINT + 'employees/updateFired',
              params,
              config,
            )
            .then(res => this.fetchEmployees(), this.toggleEmployeeForm())
            .catch(error =>
              console.error('Error updating employee fired status:', error),
            )
        }
      }
    },
  },
  mounted() {
    this.fetchEmployees()
  },
}
</script>
<style scoped>
.flex-button {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 20px;
}
.add-employee {
  margin-top: 20px;
  padding: 10px 20px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: black;
  padding: 10px;
  cursor: pointer;
  margin: 5px 0;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
}
.add-employee:hover {
  background-color: #d2ceb8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
.text {
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background-color: #d2ceb8;
  color: #000;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
/* .modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
} */
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
  box-shadow: 0 8px 8px #080808;
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
  width: 100%;
  height: 100%;
  transition: background-color 0.3s;
}

.td-button:hover {
  background-color: #d2ceb8;
}
</style>
