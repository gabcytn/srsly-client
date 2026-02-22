<script setup lang="ts">
import { computed, ref } from "vue";

const options: Intl.DateTimeFormatOptions = {
  weekday: "long",
  month: "long",
  day: "numeric",
};
const formattedDate = new Date().toLocaleDateString("en-US", options);
const completed = ref(3);
const reviews = ref(7);

const percentage = computed(() => (completed.value / reviews.value) * 100);
</script>

<template>
  <div class="md:flex">
    <SidebarNav />
    <main class="max-w-275 w-full mx-auto p-5">
      <h1 class="font-bold text-xl">Dashboard</h1>
      <p class="text-light text-sm">{{ formattedDate }}</p>

      <div class="bg-mycard mt-5 p-3 rounded border border-surface">
        <span class="text-light text-xs inline-block mb-2">Today's progress</span>
        <div class="flex justify-between gap-3 items-center">
          <ProgressBar class="grow" :value="percentage">{{}}</ProgressBar>
          <p>
            <span class="font-bold me-2 text-xl">{{ completed }}</span
            ><span class="text-xs text-light">/ {{ reviews }} reviewed</span>
          </p>
        </div>
      </div>

      <div class="mt-5">
        <h1 class="font-bold text-xl">Review Today</h1>
        <SearchBar />
      </div>
    </main>
  </div>
</template>
