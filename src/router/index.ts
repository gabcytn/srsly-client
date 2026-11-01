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
      path: "/auth/oauth/github/callback",
      name: "githubCallback",
      component: () => import("../pages/OauthCallback.vue"),
      meta: { public: true },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../pages/DashboardView.vue"),
      meta: { public: false },
    },
    {
      path: "/problems/:id",
      name: "problemShow",
      component: () => import("../pages/ProblemView.vue"),
      meta: { public: false },
    },
    {
      path: "/problems/solved",
      name: "solvedProblems",
      component: () => import("../pages/SolvedProblemsView.vue"),
      meta: { public: true },
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../pages/Settings.vue"),
      meta: { public: false },
    },
    {
      path: "/:catchAll(.*)*",
      name: "notFound",
      component: () => import("../pages/NotFoundView.vue"),
      meta: { public: true },
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.path === "/") {
    return true;
  }

  const auth = useAuthStore();
  await auth.init();

  const isAuthenticated = auth.isAuthenticated();

  if (to.path.startsWith("/auth") && isAuthenticated) {
    return "/dashboard";
  }

  if (to.meta.public) {
    return true;
  }

  if (!isAuthenticated) {
    auth.openSignInModal()
    return "/";
  }

  return true;
});

export default router;
