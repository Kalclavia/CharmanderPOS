<!--
  LaunchPage.vue
  This Vue component implements the initial landing/splash screen for the ordering system.
  It provides a simple, clickable interface to start the ordering process with language
  translation support.

  Key Features:
  - Full-screen splash layout
  - Click-anywhere-to-start functionality
  - Dedicated "Tap to Order" button
  - Language translation integration
  - Responsive design for all screen sizes
  
  Props:
  - None
  
  Emits:
  - startOrder: When user clicks anywhere on page or the order button
  
  Components:
  - Translate: Language translation widget
  
  Dependencies:
  - @/assets/panda-logo.png: Panda Express logo
  - translateModel.vue: Translation component
  - vue-router: For navigation
  
  Styling:
  - Fixed full-screen positioning
  - Centered flex layout
  - Responsive logo sizing
  - Interactive button styling
  - Custom translation widget positioning
  
  Usage:
  <LaunchPage @startOrder="handleOrderStart" />
-->

<template>
  <div class="launch-page" @click="$emit('startOrder')">
    <img src="@/assets/panda-logo.png" alt="Panda Express Logo" class="logo" />
    <button @click="$emit('startOrder')" class="tap-to-order">
      TAP TO ORDER
    </button>
    <Translate class="translate" />
  </div>
</template>

<script>
import Translate from '../components/translate/translateModel.vue'

export default {
  components: {
    Translate,
  },
  methods: {
    startOrder() {
      this.$router.push('/home')
    },
  },
}
</script>

<style scoped>
.skiptranslate {
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #18e4f3;
  color: rgb(0, 0, 0);
}

.skiptranslate span a {
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #18e4f3;
  color: rgb(0, 0, 0);
}

.launch-page {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: #9b150b; */
  color: white;
  cursor: pointer;
}

.logo {
  width: 80vw;
  height: auto;
  max-width: 300px;
  margin-bottom: 20px;
}

.tap-to-order {
  margin-top: 20px;
  padding: 0.9375em;
  width: 320px;
  height: 60px;
  font-size: 1.125em;
  background-color: #e7e4d7;
  color: #080808;
  border: 2px solid #080808;
  border-radius: 30px;
  box-shadow: 0 4px 8px #080808;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
}

button:hover {
  background-color: #d2ceb8; /* Darker background on hover */
}
</style>
