import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: () => import("../pages/LandingView.vue"),
      meta: { public: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../pages/DashboardView.vue"),
      meta: { public: true },
    },
    {
      path: "/problems/:id",
      name: "problemShow",
      component: () => import("../pages/ProblemView.vue"),
      meta: { public: true },
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../pages/LoginView.vue"),
      meta: { public: true },
    },
    {
      path: "/auth/register",
      name: "register",
      component: () => import("../pages/RegisterView.vue"),
      meta: { public: true },
    },
    {
      path: "/auth/forgot-password",
      name: "forgot-password",
      component: () => import("../pages/ForgotPasswordView.vue"),
      meta: { public: true },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../pages/HomeView.vue"),
      meta: { public: false },
    },
    {
      path: "/redirect",
      name: "redirect",
      component: () => import("../pages/RedirectView.vue"),
      meta: { public: false },
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.path === "/" || to.path === "/dashboard" || to.name === "problemShow") {
    return true;
  }
  const auth = useAuthStore();
  if (!auth.isReady) {
    await auth.init();
  }
  if (to.path.startsWith("/auth") && auth.isAuthenticated) {
    return "/redirect";
  }
  if (to.meta.public) {
    return true;
  }
  if (!to.meta.public && auth.isAuthenticated) {
    return true;
  }

  return "/auth/login";
});

export default router;
