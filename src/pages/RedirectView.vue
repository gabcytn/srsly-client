<script setup lang="ts">
import router from "@/router";
</script>

<template>
  <h1>Redirect page</h1>
  <Button label="Go to home" @click="router.push({ path: '/home' })" />
</template>
