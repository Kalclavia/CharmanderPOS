import { createRouter, createWebHistory } from 'vue-router'
import SelfCheckout from '../views/self-checkout.vue'
import Menu1 from '../views/menu1.vue'
import Menu2 from '../views/menu2.vue'

const routes = [
  { path: '/', name: 'SCO', component: SelfCheckout },
  { path: '/menu1', name: 'Menu Board 1', component: Menu1 },
  { path: '/menu2', name: 'Menu Board 2', component: Menu2 },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
