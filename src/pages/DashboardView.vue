<script setup lang="ts">
import DashboardToday from "@/components/dashboard/DashboardToday.vue";
import SkeletonLoader from "@/components/problem-show/SkeletonLoader.vue";
import { paginatedSrsProblem } from "@/shared/sample-api-response";
import { type PaginatedSrsProblem } from "@/shared/types";
import { useToast } from "primevue";
import { onMounted, ref } from "vue";

const toast = useToast();
const isLoading = ref(false);
const problems = ref<PaginatedSrsProblem>();

async function fetchDashboardData(page: number = 0) {
  console.log(`page number: ${page}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(paginatedSrsProblem);
    }, 1000);
  });
}

onMounted(async () => {
  try {
    isLoading.value = true;
    const data = (await fetchDashboardData()) as PaginatedSrsProblem;
    problems.value = data;
  } catch (e: unknown) {
    if (!(e instanceof Error)) throw new Error("Unknown error thrown.");
    toast.add({
      severity: "error",
      summary: "Something went wrong",
      detail: `${e.message}. Please try again later.`,
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
<template>
  <div class="md:flex">
    <Toast />
    <SidebarNav />
    <main class="max-w-275 w-full mx-auto p-5">
      <SkeletonLoader v-if="isLoading" />
      <DashboardHeader v-if="!isLoading && problems" />
      <DashboardToday
        v-if="!isLoading && problems"
        :problems
        @update:problems-page="fetchDashboardData"
      />
      <SuggestedProblems v-if="!isLoading && problems" />
    </main>
  </div>
</template>
