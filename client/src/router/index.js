import { createRouter, createWebHistory } from 'vue-router'
import SelfCheckout from '../views/self-checkout.vue'

const routes = [{ path: '/', name: 'SCO', component: SelfCheckout }]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
