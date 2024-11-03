<template>
  <div class="employee-form">
    <h2>{{ employee ? 'Edit Employee' : 'Add Employee' }}</h2>
    <form @submit.prevent="submitForm" class="form">
      <div class="form-items">
        <div class="name">
          <label for="name">Name:</label>
          <input type="text" v-model="form.name" />
        </div>
        <div class="role">
          <label for="role">Role:</label>
          <select v-model="form.role">
            <option value="cashier">cashier</option>
            <option value="manager">manager</option>
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
  data() {
    return {
      form: {
        name: this.employee.name,
        role: this.employee.role,
        employeeid: this.employee.employeeid,
      },
    }
  },
  methods: {
    submitForm() {
      console.log('Form data:', this.form)
      this.$emit('submit', this.form)
    },
  },
  watch: {
    employee: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form.name = newVal.name
          this.form.role = newVal.role
        }
      },
    },
  },
}
</script>

<style scoped>
.name {
  width: 100%;
  margin-top: 20px;
}
.role {
  width: 100%;
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
</style>
