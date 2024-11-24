<template>
  <div v-if="showChart">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
  <div class="buttons">
  <div><label for="from">From:</label>
    <input type="date" v-model="fromDate" /></div>
    <div><label for="to">To:</label>
      <input type="date" v-model="toDate" /></div>
    <button style="button" @click="fetchIngredientsByDateRange()">Load Data</button>
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
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Product Usage',
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
    fetchIngredientsByDateRange() {
      this.showChart = false
      // console.log(this.chartData.labels,this.chartData.datasets[0].data)
      console.log('From', this.fromDate, 'End:', this.toDate)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: { startDate: this.fromDate, endDate: this.toDate },
      }
      axios
        .get(
          import.meta.env.VITE_API_ENDPOINT + 'report/ingredientsByDateRange',
          config,
        )
        .then(response => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            // Extract ingredient names and total_used for chart data
            this.chartData.labels = response.data.map(
              item => item.ingredient_name,
            )
            this.chartData.datasets[0].data = response.data.map(
              item => item.total_used,
            )
            console.log(this.chartData.labels, this.chartData.datasets[0].data)
            this.chartData = { ...this.chartData }
          } else {
            console.warn('No data available for the selected date range.')
            this.chartData.labels = []
            this.chartData.datasets[0].data = []
            this.chartData = { ...this.chartData }
          }
          this.showChart = true
        })
        .catch(error => {
          console.error('Error fetching employee transaction:', error)
        })
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
}

.buttons {
  display: flex;
  justify-content: space-around;
  padding-top: 15px;
  padding-right: 55px;
}

button:hover {
  background-color: #d2ceb8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
