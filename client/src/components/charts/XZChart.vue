<template>
    <div v-if="showChart">
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
    <div class="buttons">
    <div><label for="from">From:</label>
      <input type="date" v-model="fromDate" /></div>
      <div><label for="to">To:</label>
        <input type="date" v-model="toDate" /></div>
      <button style="button" @click="fetchData()">Load Data</button>
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
              label: 'X-Report',
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
        this.showChart = false
      },
      setEmployee(){
        this.chartData.labels = Object.keys(this.food_entree);
        this.chartData.datasets[0].data = Object.values(this.food_entree);
        console.log("Food Names:", this.chartData.labels);
        console.log("Food Counts:", this.chartData.datasets[0].data);
      },
      setHour(){
        this.chartData.labels = Object.keys(this.food_drink);
        this.chartData.datasets[0].data = Object.values(this.food_drink);
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
    padding-top: 15px;
    padding-right: 55px;
  }
  
  button:hover {
    background-color: #d2ceb8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  </style>
  