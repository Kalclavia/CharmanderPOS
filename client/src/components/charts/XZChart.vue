<template>
    <div v-if="showChart">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div class = "buttons">
      <button style="button" @click="setEmployee()">By Employee</button>
      <button style="button" @click="setHour()">By Hour</button>
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
    props: {
    datasetLabel: {
      type: String,
      default: 'X-Report',
    },
    },
    data() {
      return {
        fromDate: '',
        toDate: '',
        showChart: true,
        employee_sales: {},
        hour_sales: {},
  
        chartData: {
          labels: [],
          datasets: [
            {
              label: this.datasetLabel,
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
    watch: {
    datasetLabel(newLabel) {
      this.chartData.datasets[0].label = newLabel; 
      this.chartData = { ...this.chartData }; 
      },
    },
    methods: {
      fetchData() {
      this.showChart = true
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          params: {},
        },
      }
      axios
        .get(
          import.meta.env.VITE_API_ENDPOINT + 'report/transactionBreakDown',
          config,
        )
        .then(response => {
          if (Array.isArray(response.data) && response.data.length > 0) {
            // Extract order total by employee_name and order_hour
            for (let i = 0; i < response.data.length; i++) {
              const { employee_name, order_hour, order_total } = response.data[i];

              // Aggregate sales by employee
              if (!this.employee_sales[employee_name]) {
                this.employee_sales[employee_name] = 0;
              }
              this.employee_sales[employee_name] += parseFloat(order_total);

              // Aggregate sales by hour
              if (!this.hour_sales[order_hour]) {
                this.hour_sales[order_hour] = 0;
              }
              this.hour_sales[order_hour] += parseFloat(order_total);
            }
          } else {
            console.warn('No data available for the selected date range.')
            this.chartData.labels = []
            this.chartData.datasets[0].data = []
            this.chartData = { ...this.chartData }
          }
        })
        .catch(error => {
          console.error('Error fetching transactions:', error)
        })
    },
      setEmployee(){
        this.chartData = {
        ...this.chartData,
        labels: Object.keys(this.employee_sales),
        datasets: [
          {
            ...this.chartData.datasets[0],
            data: Object.values(this.employee_sales),
          },
        ],
      }
      this.showChart = true
      },
      setHour(){
        this.chartData = {
        ...this.chartData,
        labels: Object.keys(this.hour_sales),
        datasets: [
          {
            ...this.chartData.datasets[0],
            data: Object.values(this.hour_sales),
          },
        ],
      }
      this.showChart = true
      },
    },
    mounted() {
      this.fetchData()
    },
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
    padding-top: 15px;
    padding-right: 55px;
  }
  
  button:hover {
    background-color: #d2ceb8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  </style>
  