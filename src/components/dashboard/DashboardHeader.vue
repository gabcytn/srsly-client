<script setup lang="ts">
const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
};
const formattedDate = new Date().toLocaleDateString("en-US", options);
</script>

<template>
  <h1 class="font-bold text-xl">Dashboard</h1>
  <p class="text-light text-sm">{{ formattedDate }}</p>
</template>
