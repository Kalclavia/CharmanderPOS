/*
  state.js
  This module manages the state and functionality for a collapsible sidebar
  using Vue's Composition API. It provides reactive variables and utilities
  for controlling sidebar width, collapse state, and button visibility.

  Exports:
  - collapsed: Ref<boolean> - Current collapse state of sidebar
  - showButtons: Ref<boolean> - Visibility state of sidebar buttons
  - toggleSideBar: () => void - Function to toggle sidebar state
  - SIDEBAR_WIDTH: number - Full width of expanded sidebar (250px)
  - SIDEBAR_WIDTH_COLLAPSED: number - Width of collapsed sidebar (65px)
  - sideBarWidth: ComputedRef<string> - Computed current width with px unit
  
  Features:
  - Reactive state management
  - Animated transitions via setTimeout
  - Dynamic CSS variable updates
  - Computed width values
  
  Dependencies:
  - Vue 3 Composition API (ref, computed, watchEffect)
  
  Usage:
  import { collapsed, toggleSideBar, sideBarWidth } from './state.js'
*/

import { ref, computed, watchEffect } from 'vue'

export const collapsed = ref(false)
export const showButtons = ref(false)
export const toggleSideBar = () => (
  (collapsed.value = !collapsed.value),
  setTimeout(() => {
    showButtons.value = !showButtons.value
  }, 160)
)

export const SIDEBAR_WIDTH = 250
export const SIDEBAR_WIDTH_COLLAPSED = 65
export const sideBarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`,
)

// Dynamically update CSS variable
watchEffect(() => {
  document.documentElement.style.setProperty(
    '--sidebar-width',
    sideBarWidth.value,
  )
})
