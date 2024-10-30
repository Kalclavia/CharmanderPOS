import { createRouter, createWebHistory } from 'vue-router'
import manager from '../views/manager.vue'

const routes = [{ path: '/manager', name: 'manager', component: manager }]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
