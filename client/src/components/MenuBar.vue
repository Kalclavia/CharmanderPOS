<template>
  <div class="menu-bar">
    <h2 v-if="$cookies.get('role') == 'manager' || $cookies.get('role') == 'cashier'" class="menu-title">Signed in as: EmployeeID #{{$cookies.get('ID')}} </h2>
    <h2 v-if="$cookies.get('role') == 'manager' || $cookies.get('role') == 'cashier'" class="menu-title">{{$cookies.get('role')}} Mode</h2>
    <h2 class="menu-title">MENU</h2>
    <button @click="$emit('selectItem', 'Appetizers')">APPETIZERS</button>
    <button @click="$emit('selectItem', 'Bowl')">BOWL</button>
    <button @click="$emit('selectItem', 'Plate')">PLATE</button>
    <button @click="$emit('selectItem', 'Bigger Plate')">BIGGER PLATE</button>
    <button @click="$emit('selectItem', 'Drinks')">DRINKS</button>
    <button @click="$emit('selectItem', 'A La Carte')">A LA CARTE</button>
    <button v-if="showButton" @click="RouteToManager">Switch to Manager View</button>

    <!-- Conditional Div for Weather -->
    <div class="weather-message" v-if="weather && weather.temperature >= 75 && !($cookies.get('role') == 'manager' || $cookies.get('role') == 'cashier')">
      <h2> It's hot out! Beat the heat with an ice-cold beverage: </h2>
      <component
      :is="'RecomendedItem'"
      :itemName="'Lipton Brisk Raspberry Iced Tea'"
      />
    </div>
    <div class="weather-message" v-else-if="weather && weather.temperature < 60 && !($cookies.get('role') == 'manager' || $cookies.get('role') == 'cashier')">
      <h2> Feeling the fall chill? Warm up with this tasty entree:</h2>
      <component
      :is="'RecomendedItem'"
      :itemName="'Bourbon Chicken'"
      />
    </div>
    <div class="weather-message" v-else-if="weather && weather.shortForecast != 'Sunny' && !($cookies.get('role') == 'manager' || $cookies.get('role') == 'cashier')">
      <h2> Gloomy outside? Cheer up with a fall classic: </h2>
      <component
      :is="'RecomendedItem'"
      :itemName="'Apple Pie Roll'"
      />
    </div>

    <Translate />
    <!-- Weather Display -->
    <div class="weather">
      <p v-if="weather">
        {{ weather.city }}, {{ weather.state }}: {{ weather.temperature }}°F,
        {{ weather.shortForecast }}
      </p>
      <p v-else>Loading weather...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Translate from '../components/translate/translateModel.vue'
import { useRouter } from 'vue-router' 
import VueCookies from 'vue-cookies'
import RecomendedItem from './menu/RecommendItem.vue'

export default {
  setup() {
    const router = useRouter() 

    const RouteToManager = () => {
      router.push('/manager') 
    }

    return {
      RouteToManager
    }
  },

  name: 'MenuBar',
  components: {
    Translate,
    RecomendedItem
  },
  data() {
    return {
      weather: null,
      showButton: $cookies.get('role') == 'manager',
      hotItem: "Bourbon Chicken"
    }
  },
  methods: {
    
    async fetchWeather() {
      try {
        // Coordinates of College Station
        const lat = '30.6014'
        const lon = '-96.3144'

        // Get the forecast URL
        const pointResponse = await axios.get(
          `https://api.weather.gov/points/${lat},${lon}`,
          {
            // User Agent required by weather.gov
            headers: {
              'User-Agent': 'Project3TeamCharmander (jensyn@tamu.edu)',
            },
          },
        )
        console.log('Point response:', pointResponse.data) // Check if data is returned

        const forecastUrl = pointResponse.data.properties.forecast
        const city =
          pointResponse.data.properties.relativeLocation.properties.city
        const state =
          pointResponse.data.properties.relativeLocation.properties.state

        // Fetch the forecast data
        const forecastResponse = await axios.get(forecastUrl, {
          headers: {
            'User-Agent': 'Project3TeamCharmander (jensyn@tamu.edu)',
          },
        })
        console.log('Forecast response:', forecastResponse.data) // Check if data is returned
        const forecast = forecastResponse.data.properties.periods[0] // Get current forecast

        // Update weather data
        this.weather = {
          city: city,
          state: state,
          temperature: forecast.temperature,
          shortForecast: forecast.shortForecast,
        }
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    },
  },
  mounted() {
    this.fetchWeather()
  },
  unmounted() {
    delete window.googleTranslateElementInit
  },
}
</script>

<style scoped>
.menu-bar {
  background-color: #e7e4d7;
  width: 450px;
  height: 100vh;
  padding: 20px;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 8px #080808;
  top: 0;
  left: 0;
  z-index: 1000;
}

.menu-title {
  margin-bottom: 15px;
  font-size: 24px;
  text-align: center;
  color: #080808;
}

.weather-message {
  margin-top: 50px;
  font-size: 24px;
  text-align: center;
  color: #080808;
}

.weather-message h2 {
  margin-bottom: 15px;
  font-size: 24px;
  text-align: center;
  color: #080808;
}

button {
  border: 2px solid #080808;
  border-radius: 30px;
  background-color: #e7e4d7;
  color: #080808;
  font: Arial;
  padding: 15px;
  margin-bottom: 10px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 4px 3px #080808;
}

button:hover {
  background-color: #d2ceb8;
}

.weather {
  margin-top: auto;
  padding: 10px;
  font-size: 14px;
  color: #333;
  text-align: center;
  background-color: #e7e4d7;
  border-top: 2px solid #080808;
}
</style>
