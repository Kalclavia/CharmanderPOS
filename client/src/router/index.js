// Import Vue Router functionality
import { createRouter, createWebHistory } from 'vue-router'

// Import view components
import SelfCheckout from '../views/self-checkout.vue'
import Menu1 from '../views/menu1.vue'
import Menu2 from '../views/menu2.vue'
import Menu3 from '../views/menu3.vue'
import LoginPage from '../views/Login.vue'
import manager from '../views/manager.vue'
import cashier from '../views/cashier.vue'

// Define routes configuration array
const routes = [
  // Public routes
  { path: '/', name: 'SCO', component: SelfCheckout },  // Default route - Self checkout
  { path: '/menu1', name: 'Menu Board 1', component: Menu1 },  // Menu display 1
  { path: '/menu2', name: 'Menu Board 2', component: Menu2 },  // Menu display 2
  { path: '/menu3', name: 'Menu Board 3', component: Menu3 },  // Menu display 3
  { path: '/login', name: 'Login', component: LoginPage },     // Login page

  // Protected routes
  {
    path: '/manager',
    name: 'manager',
    component: manager,
    meta: {requiresManager: true}  // Requires manager role
  },
  {
    path: '/cashier',
    name: 'cashier',
    component: cashier,
    meta: {requiresCashier: true}  // Requires cashier role
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),  // Use HTML5 history mode for cleaner URLs
  routes,
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Check user roles from cookies
  const isManager = $cookies.get('role') == 'manager';
  const isCashier = $cookies.get('role') == 'cashier';

  // Route protection logic
  if (to.meta.requiresManager && !isManager) {
    // Redirect to login if manager route is accessed without manager role
    next({ name: 'Login' });
  } else if (to.meta.requiresCashier && !(isCashier || isManager)) {
    // Redirect to login if cashier route is accessed without appropriate role
    // Note: Managers can access cashier routes
    next({ name: 'Login' });
  } else {
    // Allow navigation for public routes or if user has appropriate role
    next();
  }
});

export default router