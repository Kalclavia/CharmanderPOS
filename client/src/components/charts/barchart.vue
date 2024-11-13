<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    data() {
      return {
        chartData: {
          // Placeholder data
          labels: ['January', 'February', 'March'],
          datasets: [
            {
              label: 'Sales',
              data: [40, 20, 12],
              backgroundColor: '#6b140e', 
              borderColor: 'black', 
              borderWidth: 1
            }
          ]
        },
        chartOptions: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: 'black' // Legend text color
              }
            },
            tooltip: {
              bodyColor: 'black' // Tooltip text color
            }
          },
          scales: {
            x: {
              ticks: {
                color: 'black' // X-axis label color
              },
              grid: {
                color: '#e7e4d7' // Grid line color
              }
            },
            y: {
              ticks: {
                color: 'black' // Y-axis label color
              },
              grid: {
                color: '#e7e4d7' // Grid line color
              }
            }
          }
        }
      }
    }
  }
  </script>
  
  <style>
  /* Chart container style */
  #my-chart-id {
    background-color: #e7e4d7; /* Background color of the chart */
  }
  </style>
  