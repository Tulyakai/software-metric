import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import DashboardView from "@/views/DashboardView.vue";
import ROUTE_PATH from "@/constants/router.js";
import ROUTE_NAME from "@/constants/page-title.js";

const routes = [
  {
    path: ROUTE_PATH.HOME,
    name: ROUTE_NAME.HOME,
    component: HomeView,
  },
  {
    path: ROUTE_PATH.DASHBOARD,
    name: ROUTE_NAME.DASHBOARD,
    component: DashboardView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
