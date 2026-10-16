<script setup lang="ts">
import { onMounted } from "vue";

onMounted(async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  console.log(urlParams.get("foo"));
});
</script>

<template></template>
