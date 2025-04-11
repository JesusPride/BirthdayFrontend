import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Dashboard from "@/components/Dashboard.vue";
import BirthdayCountdown from "@/components/BirthdayCountdown.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/birthday",
    name: "birthday",
    component: BirthdayCountdown,
  },
  {
    path: "/birthday/:uniqueRoute",
    name: "birthdayWithRoute",
    component: BirthdayCountdown,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      next({ name: "home" });
      return;
    }
  }
  next();
});

export default router;
