<script setup lang="ts">
import AuthLayout from "@/layouts/AuthLayout.vue";
import { Button } from "primevue";
import { RouterLink } from "vue-router";
</script>

<template>
  <AuthLayout>
    <div class="mx-auto">
      <span class="text-primary text-3xl block text-center">404</span>
      <h1 class="text-2xl">Page Not Found</h1>
      <div class="flex justify-center items-center mt-3">
        <Button severity="contrast">
          <RouterLink to="/">Go to Home</RouterLink>
        </Button>
      </div>
    </div>
  </AuthLayout>
</template>
