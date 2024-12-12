<!--
  App.vue
  Central Vue component that acts as a window pane to render all other parts of the app, using the Vue router
-->

<template>
  <div id="app">
    <router-view />
    <AccessibilityToolbar />
  </div>
</template>

<script>
// Import the Accessibility class from the accessibility package
import { Accessibility } from 'accessibility';

// Initialize accessibility features when the page loads
// This ensures all DOM elements are present before applying accessibility features
window.addEventListener('load', function() { 
  new Accessibility(); 
}, false);

</script>

<style scoped></style>