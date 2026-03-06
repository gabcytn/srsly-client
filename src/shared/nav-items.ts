import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import type { MenuItem } from "primevue/menuitem";

const auth = useAuthStore();
const navItems: MenuItem[] = [
  {
    separator: true,
  },
  {
    label: "Dashboard",
    icon: "pi pi-objects-column",
    command: () => {
      router.push({ path: "/dashboard" });
    },
  },
  {
    label: "All Problems",
    icon: "pi pi-sliders-h",
    command: () => {
      router.push({ path: "/problems" });
    },
  },
  {
    label: "Insights",
    icon: "pi pi-wave-pulse",
  },
  {
    label: "Settings",
    icon: "pi pi-cog",
  },
  {
    label: "Toggle theme",
    icon: "pi pi-sun",
    command: () => {
      document.documentElement.classList.toggle("app-dark");
      const isDark = document.documentElement.classList.contains("app-dark");
      localStorage.setItem("srsly:dark-mode", isDark ? "true" : "false");
    },
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: () => {
      auth.logout();
      router.push({ path: "/auth/login", replace: true });
    },
  },
];

export default navItems;
