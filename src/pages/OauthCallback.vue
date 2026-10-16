<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "primevue";
import { onMounted } from "vue";

onMounted(async () => {
  const toast = useToast();
  const authStore = useAuthStore();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const code = urlParams.get("code");

  if (!code) {
    toast.add({
      severity: "error",
      summary: "An error occured",
      detail: "Code not found.",
    });
    throw new Error("Code not found.");
  }

  await authStore.continueWithGithub(code);

  router.replace("/dashboard");
});
</script>

<template></template>
