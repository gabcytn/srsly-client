<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import type { MenuItem } from "primevue/menuitem";

const auth = useAuthStore();
const items: MenuItem[] = [
  {
    label: "Features",
    url: "#features",
  },
  {
    label: "How It Works",
    url: "#approach",
  },
  {
    label: "For You",
    url: "#audience",
  },
  {
    label: auth.isAuthenticated ? "Dashboard" : "Sign In",
    url: auth.isAuthenticated ? "/dashboard" : "/auth/login",
  },
];
</script>

<template>
  <header class="max-w-300 mx-auto w-full">
    <Menubar :model="items" class="mb-4">
      <template #start>
        <router-link to="/" class="font-jetbrains-mono font-bold text-xl py-5"
          ><span class="text-primary font-jetbrains-mono">srs</span>ly</router-link
        >
      </template>
      <template #item="{ item, props }">
        <a v-ripple class="flex items-center" v-bind="props.action" :href="item.url">
          <span class="text-sm">{{ item.label }}</span>
        </a>
      </template>
    </Menubar>
  </header>
</template>

<style lang="css">
.p-menubar-start {
  margin-right: auto;
}
</style>
