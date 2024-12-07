<!-- salesBarChart.vue
 This Vue component renders a bar chart displaying sales data for different food categories (Entree, Side, Appetizer, Drinks) within a specified date range. 
  It uses the vue-chartjs library to create the chart and axios to fetch data from an API endpoint.
 -->

<template>
  <div v-if="showChart">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
  <div class="buttons">
    <div>
      <label for="from">From:</label> <input type="date" v-model="fromDate" />
    </div>
    <div>
      <label for="to">To:</label> <input type="date" v-model="toDate" />
    </div>
    <button style="button" @click="fetchData()">Load Data</button>
  </div>
  <div class="buttons">
    <button style="button" @click="setEntree()">Entree</button>
    <button style="button" @click="setSide()">Side</button>
    <button style="button" @click="setApp()">Appetizer</button>
    <button style="button" @click="setDrinks()">Drinks</button>
  </div>
</template>

<script>
import axios from 'axios'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      fromDate: '',
      toDate: '',
      showChart: true,
      food_side: [],
      food_entree: [],
      food_drink: [],
      food_appetizer: [],
      food_desert: [],

      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Sales',
            data: [],
            backgroundColor: '#6b140e',
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'black',
            },
          },
          tooltip: {
            bodyColor: 'white',
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'black',
            },
            grid: {
              color: '#e7e4d7',
            },
          },
          y: {
            ticks: {
              color: 'black',
            },
            grid: {
              color: '#e7e4d7',
            },
          },
        },
      },
    }
  },
  methods: {
    fetchData() {
      this.showChart = true
      console.log('From', this.fromDate, 'End:', this.toDate)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: { startDate: this.fromDate, endDate: this.toDate },
      }
      axios
        .get(
          import.meta.env.VITE_API_ENDPOINT + 'report/itemsByDateRange',
          config,
        )
        .then(response => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            // Extract ingredient names and total_used for chart data
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].food_type === 'Entree') {
                if (!this.food_entree[response.data[i].food_name]) {
                  this.food_entree[response.data[i].food_name] = 0
                }
                this.food_entree[response.data[i].food_name] += 1
              }
              if (response.data[i].food_type === 'Appetizer') {
                if (!this.food_appetizer[response.data[i].food_name]) {
                  this.food_appetizer[response.data[i].food_name] = 0
                }
                this.food_appetizer[response.data[i].food_name] += 1
              }
              if (response.data[i].food_type === 'Side') {
                if (!this.food_side[response.data[i].food_name]) {
                  this.food_side[response.data[i].food_name] = 0
                }
                this.food_side[response.data[i].food_name] += 1
              }
              if (response.data[i].food_type === 'Drink') {
                if (!this.food_drink[response.data[i].food_name]) {
                  this.food_drink[response.data[i].food_name] = 0
                }
                this.food_drink[response.data[i].food_name] += 1
              }
            }
            // const foodNames = Object.keys(this.food_entree);
            // const foodCounts = Object.values(this.food_entree);

            // console.log("Food Names:", foodNames);
            // console.log("Food Counts:", foodCounts);
          } else {
            console.warn('No data available for the selected date range.')
            this.chartData.labels = []
            this.chartData.datasets[0].data = []
            this.chartData = { ...this.chartData }
          }

          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching sales transactions:', error)
        })
    },
    setEntree() {
      this.chartData = {
        ...this.chartData,
        labels: Object.keys(this.food_entree),
        datasets: [
          {
            ...this.chartData.datasets[0],
            data: Object.values(this.food_entree),
          },
        ],
      }
      this.showChart = true
    },
    setDrinks() {
      this.chartData = {
        ...this.chartData,
        labels: Object.keys(this.food_drink),
        datasets: [
          {
            ...this.chartData.datasets[0],
            data: Object.values(this.food_drink),
          },
        ],
      }
      this.showChart = true
    },
    setApp() {
      this.chartData = {
        ...this.chartData,
        labels: Object.keys(this.food_appetizer),
        datasets: [
          {
            ...this.chartData.datasets[0],
            data: Object.values(this.food_appetizer),
          },
        ],
      }
      this.showChart = true
    },
    setSide() {
      this.chartData = {
        ...this.chartData,
        labels: Object.keys(this.food_side),
        datasets: [
          {
            ...this.chartData.datasets[0],
            data: Object.values(this.food_side),
          },
        ],
      }
      this.showChart = true
    },
  },
  mounted() {},
}
</script>

<style scoped>
/* Chart container style */
#my-chart-id {
  background-color: #e7e4d7; /* Background color of the chart */
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
  min-width: 100px;
}

.buttons {
  display: flex;
  justify-content: space-around;
  padding-top: 0.9375em;
  padding-right: 55px;
}

button:hover {
  background-color: #d2ceb8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
