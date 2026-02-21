import type { MenuItem } from "primevue/menuitem";

const navItems: MenuItem[] = [
  {
    separator: true,
  },
  {
    label: "Dashboard",
    icon: "pi pi-objects-column",
  },
  {
    label: "All Problems",
    icon: "pi pi-sliders-h",
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
    },
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: async () => {
      console.warn("logout");
    },
  },
];

export default navItems;
