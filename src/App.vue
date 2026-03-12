<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  const isDark = localStorage.getItem("srsly:dark-mode");
  if (isDark === "true") document.documentElement.classList.toggle("app-dark");
});
</script>
<template>
  <Toast />
  <router-view />
</template>
