<!--
  Manager.vue
  This Vue component serves as the main layout for the manager interface,
  coordinating navigation and content display for restaurant management functions.

  Key Features:
  - Sidebar navigation management
  - Dynamic content rendering
  - Initial state management for launch page
  - Collapsible sidebar integration
  
  Components:
  - LaunchPage (ManagerHome.vue): Initial landing screen
  - MenuBar (NavBar.vue): Navigation sidebar
  - MainContent (ManagerContent.vue): Primary content area
  
  State Management:
  - Tracks current selected menu item
  - Manages launch page visibility
  - Controls sidebar collapse state
  
  Navigation:
  - Handles menu item selection
  - Updates content based on selection
  - Manages transition from launch page
  
  Dependencies:
  - state.js: Sidebar collapse state management
  
  Layout Structure:
  - Fixed sidebar navigation
  - Dynamic main content area
  - Responsive design support
-->

<template>
  <div id="app">
    <MenuBar @selectItem="selectItem" />
    <MainContent :item="selectedItem" />
  </div>
</template>

<script>
import LaunchPage from '../components/ManagerHome.vue'
import MenuBar from '../components/NavBar.vue'
import MainContent from '../components/ManagerContent.vue'
import { collapsed } from '../components/state.js'

export default {
  name: 'App',
  components: {
    LaunchPage,
    MenuBar,
    MainContent,
  },
  data() {
    return {
      isOnLaunchPage: true,
      selectedItem: 'Home',
    }
  },
  created() {
    // Set initial states
    this.isOnLaunchPage = true
    collapsed.value = true
  },
  methods: {
    selectItem(item) {
      this.selectedItem = item
      this.isOnLaunchPage = false
    },
  },
}
</script>

<style scoped></style>
