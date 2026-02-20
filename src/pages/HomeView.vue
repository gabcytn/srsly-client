<script setup lang="ts">
import api from "@/api";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

function navigateTo(route: string, replace: boolean = false) {
  console.warn("navigating...");
  router.push({ path: route, replace });
}

function logout() {
  auth.logout();
  router.push({ path: "/auth/login", replace: true });
}

async function requestProctedResource() {
  const data = await api.get("/problems/2");
  console.warn(data);
}
</script>

<template>
  <h1>Home View</h1>
  <Button label="Go to login" @click="navigateTo('/auth/login')" />
  <Button label="Logout" severity="danger" @click="logout" />
  <Button label="Request protected resource" severity="info" @click="requestProctedResource()" />
</template>
