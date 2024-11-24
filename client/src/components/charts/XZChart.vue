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
      titleLabel: 'Z-Report',
    },
    data() {
      return {
        fromDate: '',
        toDate: '',
        showChart: true,
        enployee_sales: [],
        hour_sales: [],
  
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
      setDate(){
        const today = new Date();
        this.fromDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate());
        this.toDate= today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
      },
      fetchData() {
      this.setDate()  
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
          import.meta.env.VITE_API_ENDPOINT + 'report/transactionBreakDown',
          config,
        )
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching sales transactions:', error)
        })
    },
      setEmployee(){
        //set labels to employeenames and data by sales of each employee today
        
      },
      setHour(){
        //set labels to each hour in data set ex. 10am - 12am
        //set data set to sales in each hour
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
  