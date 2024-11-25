<template>
  <div id="app">
    <router-view />
    <AccessibilityToolbar />
  </div>
</template>

<script>
import AccessibilityToolbar from '../src/AccessibilityToolbar.vue'

export default {
  name: 'app',
  components: {
    AccessibilityToolbar
  }
}
</script>

<style scoped></style>
