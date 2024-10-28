import { createRouter, createWebHistory } from 'vue-router';
import Home from "../components/Home.vue";
import Employees from "../components/Employees.vue";
import Inventory from "../components/Inventory.vue";
import Reports from "../components/Reports.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/employees", name: "Employees", component: Employees },
  { path: "/inventory", name: "Inventory", component: Inventory },
  { path: "/reports", name: "Reports", component: Reports },
  { path: "*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
