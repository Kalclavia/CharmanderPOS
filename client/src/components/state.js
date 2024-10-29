import { ref, computed, watchEffect } from 'vue';

export const collapsed = ref(false);
export const toggleSideBar = () => (collapsed.value = !collapsed.value);

export const SIDEBAR_WIDTH = 250;
export const SIDEBAR_WIDTH_COLLAPSED = 65;
export const sideBarWidth = computed(() => 
  `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
);

// Dynamically update CSS variable
watchEffect(() => {
  document.documentElement.style.setProperty('--sidebar-width', sideBarWidth.value);
});
