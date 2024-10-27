import { createRouter, createWebHistory } from 'vue-router';
import LaunchPage from '../components/LaunchPage.vue';
import HomePage from '../components/HomePage.vue';
import Cart from '../components/Cart.vue';
import CheckoutPage from '../components/CheckoutPage.vue';
import OrderComplete from '../components/OrderComplete.vue';
import Appetizers from '../components/menu/Appetizers.vue';
import Bowl from '../components/menu/Bowl.vue';

const routes = [
  { path: '/', component: LaunchPage },
  { path: '/home', component: HomePage },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: CheckoutPage },
  { path: '/order-complete', component: OrderComplete },
  { path: '/appetizers', component: Appetizers },
  { path: '/bowl', component: Bowl },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
