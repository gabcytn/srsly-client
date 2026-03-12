<script setup lang="ts">
import SidebarNav from "@/components/SidebarNav.vue";
</script>

<template>
  <div class="md:flex">
    <SidebarNav />
    <main class="max-w-275 w-full mx-auto p-5">
      <slot></slot>
    </main>
  </div>
</template>
