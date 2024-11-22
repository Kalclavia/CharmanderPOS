import { createRouter, createWebHistory } from 'vue-router'
import SelfCheckout from '../views/self-checkout.vue'
import Menu1 from '../views/menu1.vue'
import Menu2 from '../views/menu2.vue'
import Menu3 from '../views/menu3.vue'
import LoginPage from '../views/Login.vue'
import manager from '../views/manager.vue'
import cashier from '../views/manager.vue'

const routes = [
  { path: '/', name: 'SCO', component: SelfCheckout },
  { path: '/menu1', name: 'Menu Board 1', component: Menu1 },
  { path: '/menu2', name: 'Menu Board 2', component: Menu2 },
  { path: '/menu3', name: 'Menu Board 3', component: Menu3 },
  { path: '/login', name: 'Login', component: LoginPage },
  {
    path: '/manager',
    name: 'manager',
    component: manager,
    meta: {requiresManager: true}
  },
  {
    path: '/cashier',
    name: 'cashier',
    component: cashier,
    meta: {requiresCashier: true}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isManager = $cookies.get('role') == 'manager'; // Check if user is logged in
  const isCashier = $cookies.get('role') == 'cashier'; // Check if user is logged in

  if (to.meta.requiresManager && !isManager) {
    next({ name: 'Login' }); // Redirect to login if not authenticated
  } else if (to.meta.requiresCashier && !(isCashier || isManager)) {
    next({ name: 'Login'   }); // Redirect to login if not authenticated
  } else {
    next(); // Allow navigation
  }
});


export default router
