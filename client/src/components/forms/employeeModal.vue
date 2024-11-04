<template>
  <div class="employee-form">
    <h2>{{ employee ? 'Edit Employee' : 'Add Employee' }}</h2>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-items">
        <div class="field">
          <label for="name">Name:</label>
          <input class="custom-input" type="text" v-model="form.name" />
        </div>
        <div class="field" v-if="employee == null">
          <label for="name">ID:</label>
          <input class="custom-input" type="text" v-model="form.employeeid" />
        </div>
        <div class="field">
          <label for="role">Role:</label>
          <select v-model="form.role" class="custom-select">
            <option value="cashier">cashier</option>
            <option value="manager">manager</option>
          </select>
        </div>
        <div class="field">
          <label for="isfired">Fired:</label>
          <select v-model="form.isfired" class="custom-select">
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
      </div>
      <div class="flex-button">
        <button class="button" type="submit">
          {{ employee ? 'Update' : 'Add' }}
        </button>
        <button class="button" type="button" @click="$emit('close')">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EmployeeForm',
  props: {
    employee: {
      type: Object,
      default: null,
    },
  },
  computed: {
    newemployee() {
      if (this.employee == null) {
        return true
      }
      return false
    },
  },
  data() {
    return {
      form: {
        name: this.employee ? this.employee.name : '',
        role: this.employee ? this.employee.role : '',
        employeeid: this.employee ? this.employee.employeeid : '',
        isfired: this.employee ? this.employee.isfired : 'false',
      },
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', { ...this.form, newemployee: this.newemployee })
    },
  },
}
</script>

<style scoped>
input {
  border: 0;
  outline: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  font-size: 14px;
  color: #333;
}
input:focus {
  outline: none !important;
  background-color: #d2ceb8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
input:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background-color: #d2ceb8;
}
.custom-input {
  flex: 1 1 auto;
}
.field {
  width: 100%;
  display: flex;
  margin-top: 20px;
}

.form-items {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-direction: column;
}
.form {
  height: 100%;
}
.flex-button {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.button {
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
  margin-top: 20px;
  padding: 10px 20px;
  font-weight: bold;
}
.button:hover {
  background-color: #d2ceb8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.custom-select {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  font-size: 14px;
  color: #333;
  flex: 1 1 auto;
}

/* .custom-select:focus {
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
} */
.custom-select:hover {
  background-color: #d2ceb8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
