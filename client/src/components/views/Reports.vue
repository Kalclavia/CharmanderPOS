<template>
  <div class="buttons">
    <button  @click="this.productBool = false, this.salesBool =true, this.XZBool = false" >Sales Report</button>
    <button @click="this.productBool = true, this.salesBool =false,  this.XZBool = false" >Product Usage Report</button>
    <button @click="this.productBool = false, this.salesBool =false,  this.setLabelX()" >X-Report</button>
    <button @click="this.productBool = false, this.salesBool =false,  this.setLabelZ()" >Z-Report</button>
  </div>
  <div v-if="productBool" style="padding-top: 20px">
    <productBarChartbarchart />
  </div>
  <div v-if="salesBool" style="padding-top: 20px">
    <salesBarChart />
  </div>
  <div v-if="XZBool" style="padding-top: 20px">
    <XZChart  :datasetLabel="chartLabel" :key="chartLabel"/>
  </div>
  <!-- <div class="buttons"><button>Toggle Chart Style</button></div> -->
</template>

<script>
import axios from 'axios'
import productBarChartbarchart from '../charts/productBarChart.vue'
import salesBarChart from '../charts/salesBarChart.vue';
import XZChart from '../charts/XZChart.vue';
export default {
  name: 'Reports',
  components: {
    productBarChartbarchart,
    salesBarChart,
    XZChart
  },
  data() {
    return {
      productBool : false,
      salesBool : false,
      XZBool : false,
      employeeTransaction: [], 
      ingredientsByDateRange: [],
      salesByDateRange: [],
      chartLabel: 'X-Report',
    }
  },
  methods: {
    fetchEmployeeTransaction() {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: { startDate: '2023-01-01', endDate: '2023-01-02' },
      }
      axios
        .get(
          import.meta.env.VITE_API_ENDPOINT + 'report/transactionBreakDown',
          config,
        )
        .then(response => {
          this.employeeTransaction = response.data
        })
        .then(() => console.log(this.employeeTransaction))
        .catch(error => {
          console.error('Error fetching employee transaction:', error)
        })
    },
    fetchIngredientsByDateRange() {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: { startDate: '2023-01-01', endDate: '2023-01-02' },
      }
      axios
        .get(
          import.meta.env.VITE_API_ENDPOINT + 'report/ingredientsByDateRange',
          config,
        )
        .then(response => {
          this.ingredientsByDateRange = response.data
        })
        .then(() => console.log(this.ingredientsByDateRange))
        .catch(error => {
          console.error('Error fetching employee transaction:', error)
        })
    },
    fetchSalesByDateRange() {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: { startDate: '2023-01-01', endDate: '2023-01-02' },
      }
      axios
        .get(
          import.meta.env.VITE_API_ENDPOINT + 'report/itemsByDateRange',
          config,
        )
        .then(response => {
          this.salesByDateRange = response.data
        })
        .then(() => console.log(this.salesByDateRange))
        .catch(error => {
          console.error('Error fetching sales:', error)
        })
    },
    setLabelX(){
      this.chartLabel = 'X-Report';
      this.XZBool = true;
    },
    setLabelZ(){
      const hour =new Date().getHours();
      if(hour>=22){
        this.chartLabel = 'Z-Report';
        this.XZBool = true;
        alert("The Z-Report has been successfully generated.");
      }
      else{
        alert("The store hasn't closed yet. Please wait until after 10 PM.");
      }
      
    }
  },
  mounted() {},
}
</script>

<style scoped>
.buttons {
  padding-top: 25px;
  display: flex;
  justify-content: space-around;
}

button {
  font-size: medium;
  border: 2px solid #080808;
  border-radius: 30px;
  background-color: #e7e4d7;
  color: #080808;
  font: Arial;
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 4px 3px #080808;
}

button:hover {
  background-color: #d2ceb8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
